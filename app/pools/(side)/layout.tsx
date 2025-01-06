import Link from "next/link";
import CloseIcon from "@/app/_common/close-icon";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -top-14 h-auto w-full bg-[#12021d] pb-0 pt-0 md:top-0 md:min-h-[calc(100vh-64px)] md:w-[478px] md:bg-[#1D0E27] md:pb-10 md:pt-12">
      <Link className="absolute right-6 top-4 md:right-6 md:top-12" href="/pools">
        <CloseIcon />
      </Link>
      {children}
    </div>
  );
}
