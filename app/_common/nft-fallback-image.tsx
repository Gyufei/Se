import Image, { ImageProps } from "next/image";

// const fallbackSrc = "/icons/nft-placeholder.svg";

export default function NftFallbackImage({ src, ...props }: ImageProps) {
  // const [imgSrc, setImgSrc] = useState(src);

  return <Image src={src} {...props} alt="nft" />;
}
