"use client";
import { HoverIcon } from "@/app/_common/hover-icon";

export default function SocialIcons() {
  function handleGoToTwitter() {
    return;
  }

  return (
    <div className="mx-5 hidden items-center space-x-5 md:flex">
      <HoverIcon className="flex" src="/icons/x.svg" onClick={handleGoToTwitter} />
    </div>
  );
}
