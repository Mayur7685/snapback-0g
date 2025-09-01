import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Gift } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5DEFF] to-[#FEC6A1]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white border-4 border-[#8B5CF6] rounded-xl p-8 mb-12 shadow-[8px_8px_0px_0px_#8B5CF6]">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B5CF6] mb-6 leading-tight">
              Quick Commerce Complaint Resolution
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Get your Quick-commerce issues resolved quickly and earn rewards for your feedback
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center px-8 py-4 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#F97316]/90 transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_#7C2D12]"
            >
              Submit a Complaint
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border-4 border-[#D946EF] shadow-[6px_6px_0px_0px_#D946EF]">
              <div className="bg-[#FEF7CD] p-3 rounded-lg w-fit mb-4">
                <Sparkles className="h-6 w-6 text-[#D946EF]" />
              </div>
              <h3 className="text-lg font-bold text-[#D946EF] mb-2">Easy Submission</h3>
              <p className="text-gray-600">Submit your complaints in minutes with our simple form</p>
            </div>

            <div className="bg-white p-6 rounded-xl border-4 border-[#0EA5E9] shadow-[6px_6px_0px_0px_#0EA5E9]">
              <div className="bg-[#E5DEFF] p-3 rounded-lg w-fit mb-4">
                <Clock className="h-6 w-6 text-[#0EA5E9]" />
              </div>
              <h3 className="text-lg font-bold text-[#0EA5E9] mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor the status of your complaints in real-time</p>
            </div>

            <div className="bg-white p-6 rounded-xl border-4 border-[#F97316] shadow-[6px_6px_0px_0px_#F97316]">
              <div className="bg-[#FEC6A1] p-3 rounded-lg w-fit mb-4">
                <Gift className="h-6 w-6 text-[#F97316]" />
              </div>
              <h3 className="text-lg font-bold text-[#F97316] mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Get #SNP tokens for your valuable feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
