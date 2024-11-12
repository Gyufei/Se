import ConnectBtn from "./connect-btn";
import HeaderMenu from "./header-menu";
import SocialIcons from "./social-icons";

export default function HeaderBar() {
  return (
    <header className="flex justify-between h-16 px-6 py-3">
      <div className="text-white text-[28px] font-semibold">TESSERA</div>
      <div className="flex items-center">
        <HeaderMenu />
        <SocialIcons />
        <ConnectBtn />
      </div>
    </header>
  );
}
