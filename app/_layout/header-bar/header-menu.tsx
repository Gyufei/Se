"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MbMenuList } from "./mb-menu-list";

const menuItemClx =
  "text-white text-[14px] font-semibold cursor-pointer hover:opacity-100 opacity-60 data-[active=true]:opacity-100";

export default function HeaderMenu() {
  const pathname = usePathname();
  const [showMbMenu, setShowMbMenu] = useState(false);

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
      {/* desktop */}
      <div className="hidden items-center justify-between space-x-10 md:flex">
        {MenuObj.map((item, index) => (
          <Link key={index} href={item.link} className={menuItemClx} data-active={pathname === item.link}>
            {item.name}
          </Link>
        ))}
      </div>

      {/* mobile */}
      <Image
        src="/icons/menu.svg"
        width={24}
        height={24}
        alt="menu"
        className="flex opacity-60 hover:opacity-100 md:hidden"
        onClick={() => setShowMbMenu(true)}
      />
      {showMbMenu && <MbMenuList paths={MenuObj} onEnd={() => setShowMbMenu(false)} />}
    </>
  );
}
