// Gemini API route for SnapBack
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
  }

  // Check if request is multipart/form-data for image upload
  const contentType = req.headers.get("content-type") || "";
  let prompt = "";
  let file: File | null = null;

  if (contentType.startsWith("multipart/form-data")) {
    const formData = await req.formData();
    prompt = formData.get("prompt") as string;
    file = formData.get("file") as File;
  } else {
    const body = await req.json();
    prompt = body.prompt;
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  let response;

  let result: any = { error: null };
  let imageAnalysis = null;
  let textAnalysis = null;
  let tweetSuggestion = '';
  if (file) {
    // Read file as base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");
    // Compose a structured prompt for severity and refund extraction
    const structuredPrompt = `Analyze this food-related complaint: "${prompt}". Based on the uploaded image, perform the following checks:\n\n1. **Product Condition**: Assess the physical state of the food item.\n2. **Expiry Date**: Verify if the product is expired or close to expiration.\n3. **Packaging Integrity**: Check for signs of tampering, leaks, or damage.\n4. **Food Safety Concerns**: Identify potential health hazards.\n\nRespond in JSON format:\n{\n  \"product_condition\": \"...\",\n  \"expiry_status\": \"...\",\n  \"packaging_integrity\": \"...\",\n  \"food_safety_concerns\": \"...\",\n  \"severity\": \"...\",\n  \"verification_status\": \"...\",\n  \"refund\": ...\n}`;

    // Use the correct GoogleGenAI client for image+prompt
    const aiContents = [
      {
        inlineData: {
          mimeType: file.type || "image/jpeg",
          data: base64Image,
        },
      },
      { text: structuredPrompt },
    ];
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: aiContents,
    });
    const text = aiResponse.text?.trim() || "No analysis result.";

    // Generate tweet suggestion under 200 chars
    const tweetPrompt = `Generate a tweet (under 200 characters) summarizing this food complaint for social media, including product condition, severity, refund/cashback, and company tag if possible. Be concise, clear, and impactful.`;
    const tweetAiContents = [
      {
        inlineData: {
          mimeType: file.type || "image/jpeg",
          data: base64Image,
        },
      },
      { text: `${structuredPrompt}\n\n${tweetPrompt}` },
    ];
    const tweetResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: tweetAiContents,
    });
    tweetSuggestion = tweetResponse.text?.trim() || '';
    if (tweetSuggestion.length > 200) tweetSuggestion = tweetSuggestion.slice(0, 197) + '...';
    let product_condition = null, expiry_status = null, packaging_integrity = null, food_safety_concerns = null, severity = null, verification_status = null, refund = null;
    try {
      // Remove markdown code block if present
      let jsonText = text.replace(/```json|```/g, '').trim();
      const json = JSON.parse(jsonText.match(/\{[\s\S]*\}/)?.[0] || '{}');
      product_condition = json.product_condition;
      expiry_status = json.expiry_status;
      packaging_integrity = json.packaging_integrity;
      food_safety_concerns = json.food_safety_concerns;
      severity = json.severity;
      verification_status = json.verification_status;
      refund = json.refund;
      // Score mapping (example: high=10, medium=5, low=2)
      let severityScore = 0;
      if (typeof severity === 'string') {
        if (severity.toLowerCase().includes('high')) severityScore = 10;
        else if (severity.toLowerCase().includes('medium')) severityScore = 5;
        else if (severity.toLowerCase().includes('low')) severityScore = 2;
      }
      // Calculate refund percent (high=100%, medium=50%, low=20%)
      let refundPercent = 0;
      if (severityScore === 10) refundPercent = 100;
      else if (severityScore === 5) refundPercent = 50;
      else if (severityScore === 2) refundPercent = 20;
      // Numeric scoring for fields (simple heuristic: present=8, missing=2)
      const scoreField = (v: any) => (v && typeof v === 'string' && v.length > 5 ? 8 : 2);
      imageAnalysis = {
        product_condition: { value: product_condition, score: scoreField(product_condition) },
        expiry_status: { value: expiry_status, score: scoreField(expiry_status) },
        packaging_integrity: { value: packaging_integrity, score: scoreField(packaging_integrity) },
        food_safety_concerns: { value: food_safety_concerns, score: scoreField(food_safety_concerns) },
        severity: { value: severity, score: severityScore },
        verification_status,
      };
      result = {
        analysis: imageAnalysis,
        refund_percent: refundPercent,
        refund_token: refundPercent,
        refund_details: refund,
        error: null,
        text,
        tweet: tweetSuggestion,
      };
    } catch (e) {
      result = { error: 'Failed to parse Gemini analysis', text };
    }
    // Now also analyze the description alone (text-only)
    const descStructuredPrompt = `Analyze this food-related complaint: "${prompt}". Perform the following checks:\n\n1. **Product Condition**: Assess the physical state of the food item.\n2. **Expiry Date**: Verify if the product is expired or close to expiration.\n3. **Packaging Integrity**: Check for signs of tampering, leaks, or damage.\n4. **Food Safety Concerns**: Identify potential health hazards.\n\nRespond in JSON format:\n{\n  \"product_condition\": \"...\",\n  \"expiry_status\": \"...\",\n  \"packaging_integrity\": \"...\",\n  \"food_safety_concerns\": \"...\",\n  \"severity\": \"...\",\n  \"verification_status\": \"...\",\n  \"refund\": ...\n}`;
    const descResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: descStructuredPrompt }] }],
    });
    let descText = descResponse.text || '';
    try {
      let descJsonText = descText.replace(/```json|```/g, '').trim();
      const descJson = JSON.parse(descJsonText.match(/\{[\s\S]*\}/)?.[0] || '{}');
      textAnalysis = {
        product_condition: descJson.product_condition,
        expiry_status: descJson.expiry_status,
        packaging_integrity: descJson.packaging_integrity,
        food_safety_concerns: descJson.food_safety_concerns,
        severity: descJson.severity,
        verification_status: descJson.verification_status,
        refund: descJson.refund,
      };
      // Compare severity and main fields
      if (
        imageAnalysis && textAnalysis &&
        (imageAnalysis.severity.value !== textAnalysis.severity)
      ) {
        result.error = `Mismatch between image and text analysis: Image severity is '${imageAnalysis.severity.value}', Text severity is '${textAnalysis.severity}'.`;
      }
    } catch (e) {
      // ignore text-only parse error
    }
  } else {
    // Text-only analysis
    const textOnlyPrompt = `Analyze this food-related complaint: "${prompt}". Perform the following checks:\n\n1. **Product Condition**: Assess the physical state of the food item.\n2. **Expiry Date**: Verify if the product is expired or close to expiration.\n3. **Packaging Integrity**: Check for signs of tampering, leaks, or damage.\n4. **Food Safety Concerns**: Identify potential health hazards.\n\nRespond in JSON format:\n{\n  \"product_condition\": \"...\",\n  \"expiry_status\": \"...\",\n  \"packaging_integrity\": \"...\",\n  \"food_safety_concerns\": \"...\",\n  \"severity\": \"...\",\n  \"verification_status\": \"...\",\n  \"refund\": ...\n}`;
    const textOnlyResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: textOnlyPrompt }] }],
    });
    let text = textOnlyResponse.text || '';

    // Generate tweet suggestion under 200 chars (text only)
    const tweetPrompt = `Generate a tweet (under 200 characters) summarizing this food complaint for social media, including product condition, severity, refund/cashback, and company tag if possible. Be concise, clear, and impactful.`;
    const tweetResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: `${textOnlyPrompt}\n\n${tweetPrompt}` }] }],
    });
    tweetSuggestion = tweetResponse.text?.trim() || '';
    if (tweetSuggestion.length > 200) tweetSuggestion = tweetSuggestion.slice(0, 197) + '...';
    try {
      let jsonText = text.replace(/```json|```/g, '').trim();
      const json = JSON.parse(jsonText.match(/\{[\s\S]*\}/)?.[0] || '{}');
      let severityScore = 0;
      if (typeof json.severity === 'string') {
        if (json.severity.toLowerCase().includes('high')) severityScore = 10;
        else if (json.severity.toLowerCase().includes('medium')) severityScore = 5;
        else if (json.severity.toLowerCase().includes('low')) severityScore = 2;
      }
      let refundPercent = 0;
      if (severityScore === 10) refundPercent = 100;
      else if (severityScore === 5) refundPercent = 50;
      else if (severityScore === 2) refundPercent = 20;
      const scoreField = (v: any) => (v && typeof v === 'string' && v.length > 5 ? 8 : 2);
      result = {
        analysis: {
          product_condition: { value: json.product_condition, score: scoreField(json.product_condition) },
          expiry_status: { value: json.expiry_status, score: scoreField(json.expiry_status) },
          packaging_integrity: { value: json.packaging_integrity, score: scoreField(json.packaging_integrity) },
          food_safety_concerns: { value: json.food_safety_concerns, score: scoreField(json.food_safety_concerns) },
          severity: { value: json.severity, score: severityScore },
          verification_status: json.verification_status,
        },
        refund_percent: refundPercent,
        refund_token: refundPercent,
        refund_details: json.refund,
        error: null,
        text,
        tweet: tweetSuggestion,
      };
    } catch (e) {
      result = { error: 'Failed to parse Gemini analysis', text };
    }
  }

  return NextResponse.json(result);
}
