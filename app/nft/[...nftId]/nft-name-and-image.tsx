"use client";
import Image from "next/image";

export function NFTNameAndImage({ name, img }: { name: string; img: string; }) {
  return (
    <>
      <div className="text-white text-xl font-medium mt-12">{name}</div>
      <div className="mt-5">
        <Image src={img} width={580} height={580} alt="nft" />
      </div>
    </>
  );
}
