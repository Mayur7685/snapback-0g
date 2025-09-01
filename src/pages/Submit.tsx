import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload, Send, Building2, Twitter } from "lucide-react";

const Submit = () => {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showTweetSuggestion, setShowTweetSuggestion] = useState(false);

  const companies = [
    "Zomato",
    "Swiggy",
    "Blinkit",
    "BigBasket",
    "Dunzo",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been successfully submitted.",
    });
    setShowTweetSuggestion(true);
    setDescription("");
    setCompany("");
    setImage(null);
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
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
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
                  className="w-full px-4 py-3 border-2 border-[#F97316] rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
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

            {showTweetSuggestion && (
              <div className="mt-8 p-6 bg-[#E8F5FE] border-4 border-[#1DA1F2] rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Twitter className="h-6 w-6 text-[#1DA1F2]" />
                  <h2 className="text-xl font-bold text-[#1DA1F2]">Suggested Tweet</h2>
                </div>
                <p className="whitespace-pre-line text-gray-800 mb-4">
                  ⚠️ Complaint Raised: Stale bread delivered via Zomato!
                  AI-verified expired product. Severity: High. Approx Refund: ₹50.
                  Zomato, kindly address this ASAP. @Zomato #zomato #food-complaint
                </p>
                <button 
                  onClick={() => window.open("https://twitter.com/intent/tweet", "_blank")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white font-bold rounded-lg hover:bg-[#1DA1F2]/90 transition-colors transform hover:-translate-y-0.5 shadow-[4px_4px_0px_0px_#0C85D0]"
                >
                  <Twitter className="h-4 w-4" />
                  Tweet Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;