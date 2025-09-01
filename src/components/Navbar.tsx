import Link from "next/link";
import { Twitter } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b-4 border-[#8B5CF6] shadow-[0_4px_0_0_#8B5CF6] py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[#8B5CF6] hover:underline">
          <img src="/logo.png" alt="Snapback Logo" className="h-8 w-8 object-contain" />
          SnapBack
        </Link>
        <span className="hidden sm:inline-block text-xs text-[#8B5CF6] bg-[#E5DEFF] rounded-full px-3 py-1 ml-2">AI-powered Complaint Resolution</span>
      </div>
      <div className="flex items-center gap-6 text-[#8B5CF6] font-semibold">
        <Link href="/submit" className="hover:text-[#F97316] transition-colors">Submit</Link>
        <Link href="/status" className="hover:text-[#0EA5E9] transition-colors">Status</Link>
        <Link href="/rewards" className="hover:text-[#D946EF] transition-colors">Rewards</Link>
        <Link href="/tweets" className="hover:text-[#1DA1F2] transition-colors flex items-center gap-1">
          <Twitter className="h-4 w-4" /> Tweets
        </Link>
      </div>
    </nav>
  );
}
