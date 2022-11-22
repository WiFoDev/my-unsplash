import React, {FC, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Ring} from "@uiball/loaders";

import {Portal} from "@/HOC/Portal";
import {postImage} from "@/querys";

export interface ModalProps {
  setModalOpenState: (state: boolean) => void;
}

export const AddModal: FC<ModalProps> = ({setModalOpenState}) => {
  const [label, setLabel] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const queryClient = useQueryClient();

  const {mutate, isSuccess, isLoading} = useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["images"]});
    },
  });

  const handleCancel: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setModalOpenState(false);
  };

  const handleSubmition: React.FormEventHandler = async (e) => {
    e.preventDefault();
    mutate({label, photoURL});
  };

  if (isSuccess)
    return (
      <Portal>
        <div className="fixed z-40 grid w-full h-full bg-background/50 backdrop-blur-sm place-items-center">
          <div className="min-h-[18rem] flex flex-col items-center justify-center w-[39rem] gap-5 bg-white py-6 px-8 rounded-lg">
            <div className="flex items-center justify-center mx-auto bg-green-100 rounded-full w-14 h-14 dark:bg-primary">
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-xl">Photo Added Succesfully!</p>
            <button
              className="text-blue-400 underline"
              onClick={() => setModalOpenState(false)}
            >
              Go Home
            </button>
          </div>
        </div>
      </Portal>
    );

  return (
    <Portal>
      <div className="fixed z-40 grid w-full h-full bg-background/50 backdrop-blur-sm place-items-center">
        <div className="min-h-[18rem] flex flex-col w-[39rem] gap-5 bg-white py-6 px-8 rounded-lg">
          {isLoading ? (
            <div className="grid w-full h-[18rem] place-items-center">
              <Ring
                color="black"
                lineWeight={5}
                size={40}
                speed={2}
              />
            </div>
          ) : (
            <>
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
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  Photo URL
                  <input
                    className="w-full outline-none p-3 border-[1px] border-secondary rounded-lg"
                    placeholder="https://images.unsplash.com/photo-1668889495..."
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
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
            </>
          )}
        </div>
      </div>
    </Portal>
  );
};
