"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/_common/logo";

const menuItemClx =
  "text-white text-[14px] font-semibold cursor-pointer hover:opacity-100 opacity-60 data-[active=true]:opacity-100";

export default function HeaderMenu() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const MenuObj = [
    {
      name: "Marketplace",
      link: "/marketplace",
    },
    {
      name: "Buy RAE",
      link: "/buy-rae",
    },
    {
      name: "My NFT Collections",
      link: "/my-nft-collections",
    },
    {
      name: "Pool",
      link: "/pools",
    },
  ];

  return (
    <>
      <div className="hidden items-center justify-between space-x-10 md:flex">
        {MenuObj.map((item, index) => (
          <Link key={index} href={item.link} className={menuItemClx} data-active={pathname === item.link}>
            {item.name}
          </Link>
        ))}
      </div>
      <Image
        src="/icons/menu.svg"
        width={24}
        height={24}
        alt="menu"
        className="flex opacity-60 hover:opacity-100 md:hidden"
        onClick={() => setShowMenu(true)}
      />
      {showMenu && <MenuList paths={MenuObj} onEnd={() => setShowMenu(false)} />}
    </>
  );
}

function MenuList({ paths, onEnd }: { paths: { name: string; link: string }[]; onEnd: () => void }) {
  const router = useRouter();
  const currentRoute = usePathname();

  const checkIsActive = useCallback(
    (path: string) => {
      return currentRoute.includes(path);
    },
    [currentRoute],
  );

  const handleClick = (r: string) => {
    if (currentRoute === r) {
      onEnd();
      return;
    }

    router.push(r);
    onEnd();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-[#12021D] md:hidden">
      <div className="mb-5 flex h-14 w-screen items-center justify-between px-4">
        <Logo />
        <Image src="/icons/close-fill.svg" width={28} height={28} alt="close" onClick={onEnd} />
      </div>
      {paths.map((path) => (
        <div
          key={path.link}
          data-active={checkIsActive(path.link)}
          className="flex items-center px-5 py-[17px] text-white opacity-60 data-[active=true]:opacity-100"
          style={{
            boxShadow: "inset 0px -1px 0px 0px #FFFFFF",
          }}
          onClick={() => handleClick(path.link)}
        >
          <div className="text-[18px] leading-5 text-white">{path.name}</div>
        </div>
      ))}
    </div>
  );
}
