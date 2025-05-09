import Image from "next/image";

interface BouncingImageProps {
  image: string;
  alt: string;
  width: number;
  height: number;
}

export default function BouncingImage({
  image,
  alt,
  width,
  height,
}: BouncingImageProps) {
  return (
    <Image
      src={image}
      alt={alt}
      width={width}
      height={height}
      className="bouncing-fade-in"
    />
  );
}
