import Image, { ImageProps } from "next/image";
import { useCallback, useState } from "react";

const fallbackSrc = "/icons/nft-placeholder.svg";

export default function NftFallbackImage({ src, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const onErr = useCallback((e: any) => {
    setImgSrc(fallbackSrc);
    console.log(e);
  }, []);

  return <Image src={imgSrc} {...props} alt="nft" onError={onErr} />;
}
