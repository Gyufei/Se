import Link from "next/link";
import CloseIcon from "@/app/_common/close-icon";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[478px] relative bg-[#1D0E27] pt-12 pb-10 min-h-[calc(100vh-64px)]">
      <Link className="absolute top-12 right-6" href="/pools">
        <CloseIcon />
      </Link>
      {children}
    </div>
  );
}
