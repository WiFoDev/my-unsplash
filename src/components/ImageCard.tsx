/* eslint-disable @next/next/no-img-element */
import React, {FC} from "react";

interface ImageCardProps {
  src: string;
}

export const ImageCard: FC<ImageCardProps> = ({src}) => {
  return (
    <div className="relative max-w-xs mb-5 overflow-hidden rounded-2xl">
      <img alt="" src={src} />
    </div>
  );
};
