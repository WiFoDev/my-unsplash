import {useMutation, useQueryClient} from "@tanstack/react-query";
import React, {FC, FormEventHandler, useState} from "react";
import {Ring} from "@uiball/loaders";

import {Portal} from "@/HOC/Portal";
import {deleteImage} from "@/querys";

import {ModalProps} from "./AddModal";

interface DeleteModalProps extends ModalProps {
  public_id: string;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  setModalOpenState,
  public_id,
}) => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const queryClient = useQueryClient();

  const {mutate, isLoading, isSuccess} = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["images"]});
    },
  });

  const handleSubmition: FormEventHandler = (e) => {
    e.preventDefault();
    if (password !== "myunsplashpass") {
      setIsPasswordValid(false);

      return;
    }
    mutate({public_id});
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
            <p className="text-xl">Photo Deleted Succesfully!</p>
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
        <div className="min-h-[16rem] flex flex-col w-[39rem] gap-5 bg-white py-6 px-8 rounded-lg">
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
              <h2 className="text-xl">Are you sure?</h2>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmition}
              >
                <label className="flex flex-col gap-2 text-sm">
                  Password
                  <input
                    className={`w-full outline-none p-3 border-[1px] ${
                      isPasswordValid
                        ? "border-secondary"
                        : "border-tertiary"
                    } rounded-lg`}
                    placeholder="My Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsPasswordValid(true);
                    }}
                  />
                  {!isPasswordValid && (
                    <span className="text-xs text-tertiary">
                      The password is incorrect
                    </span>
                  )}
                </label>
                <div className="flex gap-4 mt-4 place-self-end">
                  <button
                    className="text-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalOpenState(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="px-5 py-3 font-semibold text-white rounded-md shadow-md bg-tertiary shadow-tertiary/50">
                    Delete
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
