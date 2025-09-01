import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

const dummyComplaints = [
  {
    id: "C001",
    company: "Zomato",
    description: "Order delivered with missing items",
    status: "Pending",
    severity: "Medium",
  },
  {
    id: "C002",
    company: "Swiggy",
    description: "Wrong order delivered",
    status: "Resolved",
    severity: "Low",
  },
  {
    id: "C003",
    company: "Blinkit",
    description: "Delayed delivery by 3 hours",
    status: "Pending",
    severity: "High",
  },
];

export default function Status() {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-[#F97316] text-white border-2 border-[#C2410C] shadow-[2px_2px_0px_0px_#C2410C]";
      case "medium":
        return "bg-[#0EA5E9] text-white border-2 border-[#0369A1] shadow-[2px_2px_0px_0px_#0369A1]";
      case "low":
        return "bg-[#8B5CF6] text-white border-2 border-[#6D28D9] shadow-[2px_2px_0px_0px_#6D28D9]";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    return status.toLowerCase() === "resolved" ? (
      <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
    ) : (
      <Clock className="h-5 w-5 text-[#F97316]" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BAE6FD] to-[#E5DEFF] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-4 border-[#0EA5E9] rounded-xl p-8 shadow-[8px_8px_0px_0px_#0EA5E9]">
            <div className="flex items-center space-x-3 mb-8">
              <AlertCircle className="h-8 w-8 text-[#0EA5E9]" />
              <h1 className="text-3xl font-bold text-[#0EA5E9]">Complaint Status</h1>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#0EA5E9]">
                    <th className="px-6 py-3 text-left text-[#0EA5E9] font-bold">ID</th>
                    <th className="px-6 py-3 text-left text-[#0EA5E9] font-bold">Company</th>
                    <th className="px-6 py-3 text-left text-[#0EA5E9] font-bold">Description</th>
                    <th className="px-6 py-3 text-left text-[#0EA5E9] font-bold">Status</th>
                    <th className="px-6 py-3 text-left text-[#0EA5E9] font-bold">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyComplaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b border-gray-100">
                      <td className="px-6 py-4 font-medium text-[#0EA5E9]">{complaint.id}</td>
                      <td className="px-6 py-4 text-gray-600">{complaint.company}</td>
                      <td className="px-6 py-4 text-gray-600">{complaint.description}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(complaint.status)}
                          <span className={complaint.status === "Resolved" ? "text-[#10B981]" : "text-[#F97316]"}>
                            {complaint.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getSeverityColor(complaint.severity)}>
                          {complaint.severity}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
