"use client";
import { cn } from '@/lib/utils/common';
import Image from 'next/image'
import { useState } from 'react';

export default function SocialIcons() {
  function handleGoToTwitter() {
    return;
  }
  
  return (
    <div className="mx-5 flex items-center space-x-5">
      <HoverIcon src="/icons/x.svg" onClick={handleGoToTwitter} />
      <HoverIcon src="/icons/menu.svg" onClick={handleGoToTwitter} />
    </div>
  )
}

function HoverIcon({
  src,
  onClick

}: {
  src: string,
  onClick: () => void
}) {
  const [hover, setHover] = useState(false);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="h-10 w-10 flex items-center justify-center cursor-pointer bg-black-bg hover:bg-black">
      <Image
        src={src}
        width={24}
        height={24}
        alt="Twitter" 
        className={cn(hover ? "opacity-100" : "opacity-60")}
      />
    </div>
  )
}