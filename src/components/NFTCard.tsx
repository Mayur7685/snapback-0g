import React from "react";

interface NFTCardProps {
  image?: string | null;
  description: string;
  aiAnalysis: any;
  company: string;
  complaintNumber?: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ image, description, aiAnalysis, company, complaintNumber }) => {
  const displayNumber = complaintNumber || "#001SNP complaint";
  return (
    <div className="w-80 max-w-xs bg-gradient-to-b from-[#FFF7ED] to-[#E5DEFF] border-4 border-[#F97316] rounded-3xl shadow-xl p-5 flex flex-col items-center relative overflow-hidden">
      <div className="text-lg font-black tracking-wide text-[#F97316] mb-3 drop-shadow">{displayNumber}</div>
      {image && (
        <img
          src={image}
          alt="Complaint Proof"
          className="w-32 h-32 rounded-xl border-4 border-[#F97316] mb-4 object-cover shadow-md bg-white"
        />
      )}
      <div className="w-full mb-2 flex flex-col items-center">
        <div className="font-semibold text-[#F97316] text-xs uppercase">Company</div>
        <div className="text-gray-700 text-base font-bold">{company}</div>
      </div>
      <div className="w-full mb-2 flex flex-col items-center">
        <div className="font-semibold text-[#F97316] text-xs uppercase">Description</div>
        <div className="text-gray-700 text-sm text-center whitespace-pre-line">{description}</div>
      </div>
      {aiAnalysis && typeof aiAnalysis === 'object' && (
        <div className="w-full mt-3">
          <div className="font-bold text-[#F97316] text-xs mb-2 uppercase tracking-wider">Complaint Scores</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#FED7AA] rounded-xl p-2 flex flex-col items-center border-2 border-[#F97316]">
              <span className="font-bold text-[#F97316]">Product</span>
              <span className="text-gray-800">{aiAnalysis.product_condition?.score ?? '-'}/10</span>
            </div>
            <div className="bg-[#FED7AA] rounded-xl p-2 flex flex-col items-center border-2 border-[#F97316]">
              <span className="font-bold text-[#F97316]">Packaging</span>
              <span className="text-gray-800">{aiAnalysis.packaging_integrity?.score ?? '-'}/10</span>
            </div>
            <div className="bg-[#FED7AA] rounded-xl p-2 flex flex-col items-center border-2 border-[#F97316]">
              <span className="font-bold text-[#F97316]">Food Safety</span>
              <span className="text-gray-800">{aiAnalysis.food_safety_concerns?.score ?? '-'}/10</span>
            </div>
            <div className="bg-[#FED7AA] rounded-xl p-2 flex flex-col items-center border-2 border-[#F97316]">
              <span className="font-bold text-[#F97316]">Severity</span>
              <span className="text-gray-800">{aiAnalysis.severity?.score ?? '-'}/10</span>
            </div>
          </div>
          <div className="mt-3 bg-[#FEF7CD] border-2 border-[#F97316] rounded-xl p-2 flex flex-col items-center">
            <span className="font-bold text-[#F97316]">Refund/Cashback</span>
            <span className="text-gray-800 text-sm">{aiAnalysis.refund_percent ? `${aiAnalysis.refund_percent}%` : '-'} {aiAnalysis.refund_token ? aiAnalysis.refund_token + ' $SNP' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
