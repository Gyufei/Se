"use client";
import Logo from "@/app/_common/logo";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function MbMenuList({ paths, onEnd }: { paths: { name: string; link: string }[]; onEnd: () => void }) {
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
            boxShadow: "inset 0px -1px 0px 0px #FFFFFF60",
          }}
          onClick={() => handleClick(path.link)}
        >
          <div className="text-[18px] leading-5 text-white">{path.name}</div>
        </div>
      ))}
    </div>
  );
}
