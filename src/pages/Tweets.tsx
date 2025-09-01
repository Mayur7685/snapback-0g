import { Twitter } from "lucide-react";

const Tweets = () => {
  const tweets = [
    {
      id: 1,
      text: "⚠️ Complaint Raised: Stale bread delivered via Zomato!\nAI-verified expired product. Severity: High. Approx Refund: ₹50.\nZomato, kindly address this ASAP. @Zomato #zomato #food-complaint",
      date: "2024-03-15",
      status: "Pending"
    },
    {
      id: 2,
      text: "🚨 Order #45678 from Swiggy arrived 2 hours late and cold!\nAI Analysis: Temperature below food safety standards.\nImmediate attention needed @Swiggy #swiggy #delivery-delay",
      date: "2024-03-14",
      status: "Resolved"
    },
    {
      id: 3,
      text: "⚡ Blinkit delivery missing items worth ₹200!\nAI Verification: Order slip shows discrepancy.\nRequesting immediate resolution @letsblinkit #blinkit #missing-items",
      date: "2024-03-13",
      status: "Pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5DEFF] to-[#FEF7CD] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#8B5CF6] mb-8 flex items-center gap-2">
            <Twitter className="h-8 w-8" />
            Previous Tweets
          </h1>
          <div className="space-y-6">
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="bg-white border-4 border-[#8B5CF6] rounded-xl p-6 shadow-[8px_8px_0px_0px_#6D28D9]"
              >
                <p className="whitespace-pre-line text-gray-800 mb-4">{tweet.text}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{tweet.date}</span>
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      tweet.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {tweet.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweets;