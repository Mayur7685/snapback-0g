import { Coins, Gift, Trophy } from "lucide-react";

export default function Rewards() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5D0FE] to-[#E5DEFF] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white border-4 border-[#D946EF] rounded-xl p-8 shadow-[8px_8px_0px_0px_#D946EF]">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Trophy className="h-12 w-12 text-[#D946EF]" />
              <h1 className="text-3xl font-bold text-[#D946EF]">Your Rewards</h1>
            </div>
            <div className="space-y-8">
              <div className="bg-[#F5D0FE] rounded-lg p-6 border-2 border-[#D946EF] shadow-[4px_4px_0px_0px_#D946EF]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Coins className="h-8 w-8 text-[#D946EF]" />
                    <span className="text-xl font-bold text-[#D946EF]">Total Tokens</span>
                  </div>
                  <span className="text-3xl font-bold text-[#D946EF]">150 $SNP</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#D946EF]">
                  <span>Current Value</span>
                  <span className="font-bold">₹75</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-2 border-[#D946EF] shadow-[4px_4px_0px_0px_#D946EF]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-5 w-5 text-[#D946EF]" />
                      <span className="text-[#D946EF]">Last Reward</span>
                    </div>
                    <span className="font-bold text-[#D946EF]">20 $SNP on Apr 15</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-[#D946EF] shadow-[4px_4px_0px_0px_#D946EF]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-[#D946EF]" />
                      <span className="text-[#D946EF]">Total Complaints</span>
                    </div>
                    <span className="font-bold text-[#D946EF]">3 Submitted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
