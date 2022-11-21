import React, {FC, useState} from "react";

import {Portal} from "@/HOC/Portal";

interface ModalProps {
  setModalOpenState: (state: boolean) => void;
}

export const Modal: FC<ModalProps> = ({setModalOpenState}) => {
  const handleCancel: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setModalOpenState(false);
  };

  const handleSubmition: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log("Sending...");
  };

  return (
    <Portal>
      <div className="fixed z-40 grid w-full h-full bg-background/50 backdrop-blur-sm place-items-center">
        <div className="flex flex-col w-[39rem] gap-5 bg-white py-6 px-8 rounded-lg">
          <h2 className="text-xl">Add a new photo</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmition}
          >
            <label className="flex flex-col gap-2 text-sm">
              Label
              <input
                className="w-full outline-none p-3 border-[1px] border-secondary rounded-lg"
                placeholder="Food"
                type="text"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Photo URL
              <input
                className="w-full outline-none p-3 border-[1px] border-secondary rounded-lg"
                placeholder="https://images.unsplash.com/photo-1668889495..."
                type="text"
              />
            </label>
            <div className="flex gap-4 mt-4 place-self-end">
              <button
                className="text-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="px-5 py-3 font-semibold text-white rounded-md shadow-md bg-primary shadow-primary/50">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};
