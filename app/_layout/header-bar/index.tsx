"use client";
import Logo from "@/app/_common/logo";
import ConnectBtn from "./connect-btn";
import HeaderMenu from "./header-menu";
import SocialIcons from "./social-icons";
import { useDeviceSize } from "@/lib/common/use-device-size";

export default function HeaderBar() {
  const { isMobileSize } = useDeviceSize();

  return (
    <header className="flex h-16 w-full justify-between bg-[#12021d] px-4 py-4 md:min-w-[1440px] md:px-6 md:py-3">
      <Logo />
      <div className="flex items-center">
        {isMobileSize ? <ConnectBtn /> : <HeaderMenu />}
        <SocialIcons />
        {isMobileSize ? <HeaderMenu /> : <ConnectBtn />}
      </div>
    </header>
  );
}
