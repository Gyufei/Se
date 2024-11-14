"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItemClx =
  "text-white text-[14px] font-semibold cursor-pointer hover:opacity-100 opacity-60 data-[active=true]:opacity-100";

export default function HeaderMenu() {
  const pathname = usePathname();

  const MenuObj = [
    {
      name: "Marketplace",
      link: "/marketplace",
    },
    {
      name: "Buy RAE",
      link: "/buy",
    },
    {
      name: "My NFT Collections",
      link: "/my",
    },
  ];

  return (
    <div className="flex items-center justify-between space-x-10">
      {MenuObj.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={menuItemClx}
          data-active={pathname === item.link}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
