/* eslint-disable @next/next/no-img-element */
import React, {FC, useState} from "react";
import Image from "next/image";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import trashIcon from "@/assets/trash-solid.svg";
import {deleteImage} from "@/querys";

import {DeleteModal} from "./DeleteModal";

interface ImageCardProps {
  src: string;
  tags: string[];
  public_id: string;
}

export const ImageCard: FC<ImageCardProps> = ({
  src,
  tags,
  public_id,
}) => {
  const [labelOpen, setLabelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          public_id={public_id}
          setModalOpenState={setIsModalOpen}
        />
      )}
      <div
        className="relative max-w-xs mb-6 overflow-hidden transition-all duration-500 rounded-2xl hover:scale-110"
        onMouseEnter={() => setLabelOpen(true)}
        onMouseLeave={() => setLabelOpen(false)}
      >
        <img alt="" src={src} />
        {labelOpen && (
          <>
            <div
              className="absolute p-1 border-2 rounded-md cursor-pointer top-4 right-4 border-tertiary"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative w-4 h-4">
                <Image
                  alt="Delete Image Icon"
                  layout="fill"
                  src={trashIcon}
                />
              </div>
            </div>
            <ul className="absolute bottom-0 w-full p-3 pointer-events-none bg-black/30 backdrop-blur-md">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="inline-block py-0.5 px-1 text-xs lowercase bg-white rounded-full text-background"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
