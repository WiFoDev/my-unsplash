import Image, {StaticImageData} from "next/image";
import React, {FC} from "react";

interface ImageCardProps {
  src: StaticImageData;
}

export const ImageCard: FC<ImageCardProps> = ({src}) => {
  return (
    <div className="relative max-w-xs mb-5 overflow-hidden rounded-2xl">
      <Image alt="A random image" sizes="100vw" src={src} />
    </div>
  );
};
