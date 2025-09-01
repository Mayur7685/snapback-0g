"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload, Send, Building2, Twitter } from "lucide-react";
import NFTCard from "@/components/NFTCard";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GeminiAnalysis {
  product_condition?: { score?: number; value?: string };
  expiry_status?: { score?: number; value?: string };
  packaging_integrity?: { score?: number; value?: string };
  food_safety_concerns?: { score?: number; value?: string };
  severity?: { score?: number; value?: string };
  verification_status?: string;
}

interface GeminiResult {
  analysis?: GeminiAnalysis;
  refund_percent?: number;
  refund_token?: string;
  refund_details?: string | object;
  text?: string;
  error?: string;
}

function isGeminiResultWithAnalysis(result: any): result is GeminiResult {
  return typeof result === 'object' && result !== null && 'analysis' in result && !!result.analysis;
}
function isGeminiResultWithError(result: any): result is GeminiResult {
  return typeof result === 'object' && result !== null && 'error' in result && !!result.error;
}

export default function Submit() {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [lastSubmittedDescription, setLastSubmittedDescription] = useState("");
  const [lastSubmittedCompany, setLastSubmittedCompany] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showTweetSuggestion, setShowTweetSuggestion] = useState(false);

  const companies = [
    "Zomato",
    "Swiggy",
    "Blinkit",
    "BigBasket",
    "Dunzo",
  ];

  const [geminiResult, setGeminiResult] = useState<GeminiResult | string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeminiResult(null);
    if (!image && !description.trim()) {
      toast({ title: "Error", description: "Please provide either an image or a description for your complaint." });
      setLoading(false);
      return;
    }
    try {
      let res;
      if (image) {
        const formData = new FormData();
        formData.append("prompt", `You are an expert consumer complaint analyst. Read the following complaint and provide a detailed analysis, including severity, possible resolution, and refund estimate.\n\nComplaint: ${description}\nCompany: ${company}`);
        formData.append("file", image);
        res = await fetch("/api/gemini", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: `You are an expert consumer complaint analyst. Read the following complaint and provide a detailed analysis, including severity, possible resolution, and refund estimate.\n\nComplaint: ${description}\nCompany: ${company}` }),
        });
      }
      const data = await res.json();
      setGeminiResult(data);
      setLastSubmittedDescription(description);
      setLastSubmittedCompany(company);
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted and analyzed.",
      });
      setShowTweetSuggestion(true);
      setDescription("");
      setCompany("");
      setImage(null);
    } catch (err) {
      toast({ title: "Error", description: "Failed to analyze complaint." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FED7AA] to-[#FEF7CD] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-4 border-[#F97316] rounded-xl p-8 shadow-[8px_8px_0px_0px_#F97316]">
            <div className="flex items-center space-x-3 mb-8">
              <Send className="h-8 w-8 text-[#F97316]" />
              <h1 className="text-3xl font-bold text-[#F97316]">Submit a Complaint</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#F97316] font-bold mb-2">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-[#F97316] rounded-lg p-8 text-center hover:bg-[#FED7AA] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-[#F97316] mb-2" />
                    <span className="text-[#F97316] font-medium">
                      {image ? image.name : "Click to upload an image"}
                    </span>
                  </label>
                  {imagePreview && (
                    <div className="mt-4 flex flex-col items-center">
                      <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border-2 border-[#F97316] mb-2" />
                      <button
                        type="button"
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                        onClick={() => { setImage(null); setImagePreview(null); }}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[#F97316] font-bold mb-2">
                  Select Company
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#F97316]" />
                  <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#F97316] rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent bg-white text-gray-600"
                    required
                  >
                    <option value="">Select a company</option>
                    {companies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#F97316] font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#F97316] rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-[#F97316]"
                  rows={4}
                  required
                  placeholder="Describe your issue..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#F97316]/90 transition-colors transform hover:-translate-y-0.5 shadow-[4px_4px_0px_0px_#C2410C]"
              >
                Submit Complaint
              </button>
            </form>

            {loading && (
              <div className="mt-8 p-4 text-center text-[#F97316] font-semibold">Agent is working on your complaint on 0G Compute</div>
            )}
            {geminiResult && !loading && (
              <div className="mt-8 p-6 bg-[#E5DEFF] border-4 border-[#8B5CF6] rounded-xl">
                <h2 className="text-xl font-bold text-[#8B5CF6] mb-2">Gemini AI Analysis</h2>
                {isGeminiResultWithError(geminiResult) && (
  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
    <b>Error:</b> {geminiResult.error}
  </div>
)}
                {isGeminiResultWithAnalysis(geminiResult) ? (
  <>
    <div className="mb-4">
      <div className="font-semibold text-gray-700 mb-2">Scores:</div>
      <ul className="mb-2">
        <li>Product Condition: <b>{geminiResult.analysis?.product_condition?.score ?? 'N/A'}</b> / 10</li>
        <li>Expiry Status: <b>{geminiResult.analysis?.expiry_status?.score ?? 'N/A'}</b> / 10</li>
        <li>Packaging Integrity: <b>{geminiResult.analysis?.packaging_integrity?.score ?? 'N/A'}</b> / 10</li>
        <li>Food Safety Concerns: <b>{geminiResult.analysis?.food_safety_concerns?.score ?? 'N/A'}</b> / 10</li>
        <li>Severity: <b>{geminiResult.analysis?.severity?.score ?? 'N/A'}</b> / 10</li>
      </ul>
      <div className="text-gray-700 mb-2">Verification Status: <b>{geminiResult.analysis?.verification_status ?? 'N/A'}</b></div>
    </div>
    <div className="mb-4 text-lg">
      Refund/Cashback: <span className="font-bold text-[#F97316]">{geminiResult.refund_percent !== undefined ? geminiResult.refund_percent : 'N/A'}%</span> (<span className="font-bold text-[#F97316]">{geminiResult.refund_token ? geminiResult.refund_token : 'N/A'} $SNP</span>)
    </div>
    {geminiResult.refund_details && (
      <div className="mb-2 text-gray-700"><b>Refund Details:</b> {typeof geminiResult.refund_details === 'string' ? geminiResult.refund_details : JSON.stringify(geminiResult.refund_details)}</div>
    )}
    <div className="text-gray-600 text-sm mt-2">Raw Analysis: <span className="font-mono">{geminiResult.text ? geminiResult.text : ''}</span></div>
  </>
) : (
  <p className="whitespace-pre-line text-gray-800">{typeof geminiResult === 'string' ? geminiResult : (typeof geminiResult === 'object' && 'text' in geminiResult ? geminiResult.text : '')}</p>
)}
              </div>
            )}
            {showTweetSuggestion && (
  <>
    <div className="flex justify-end mt-8">
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#F97316]/90 shadow-[4px_4px_0px_0px_#C2410C]">View NFT Card</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>NFT Card Preview</DialogTitle>
          <NFTCard
            image={imagePreview}
            description={lastSubmittedDescription}
            aiAnalysis={isGeminiResultWithAnalysis(geminiResult) ? geminiResult.analysis : null}
            company={lastSubmittedCompany}
          />
        </DialogContent>
      </Dialog>
    </div>
    <div className="mt-8 p-6 bg-[#E8F5FE] border-4 border-[#1DA1F2] rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Twitter className="h-6 w-6 text-[#1DA1F2]" />
        <h2 className="text-xl font-bold text-[#1DA1F2]">Suggested Tweet</h2>
      </div>
      <p className="whitespace-pre-line text-gray-800 mb-4">
        {(() => {
          if (isGeminiResultWithAnalysis(geminiResult)) {
            const companyName = company || "the company";
            const sev = geminiResult.analysis?.severity?.value || "";
            const refund = geminiResult.refund_percent !== undefined ? `${geminiResult.refund_percent}%` : "some";
            const prod = geminiResult.analysis?.product_condition?.value || "an issue";
            let tweet = `⚠️ Complaint: ${prod} via ${companyName}! Severity: ${sev}. Refund: ${refund} $SNP. @${companyName.replace(/\s+/g, '')} #${companyName.toLowerCase()} #food-complaint`;
            if (tweet.length > 280) tweet = tweet.slice(0, 277) + '...';
            return tweet;
          }
          return "Complaint submitted. AI is analyzing your issue.";
        })()}
      </p>
      <button
        onClick={() => {
          const tweetText = (() => {
            if (isGeminiResultWithAnalysis(geminiResult)) {
              const companyName = company || "the company";
              const sev = geminiResult.analysis?.severity?.value || "";
              const refund = geminiResult.refund_percent !== undefined ? `${geminiResult.refund_percent}%` : "some";
              const prod = geminiResult.analysis?.product_condition?.value || "an issue";
              let tweet = `⚠️ Complaint: ${prod} via ${companyName}! Severity: ${sev}. Refund: ${refund} $SNP. @${companyName.replace(/\s+/g, '')} #${companyName.toLowerCase()} #food-complaint`;
              if (tweet.length > 280) tweet = tweet.slice(0, 277) + '...';
              return tweet;
            }
            return "Complaint submitted. AI is analyzing your issue.";
          })();
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "_blank");
        }}
        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white font-bold rounded-lg hover:bg-[#1DA1F2]/90 transition-colors transform hover:-translate-y-0.5 shadow-[4px_4px_0px_0px_#0C85D0]"
      >
        <Twitter className="h-4 w-4" />
        Tweet Now
      </button>
    </div>
  </>
)}

          </div>
        </div>
      </div>
    </div>
  );
}
