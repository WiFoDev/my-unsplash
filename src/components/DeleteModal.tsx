import {useMutation, useQueryClient} from "@tanstack/react-query";
import React, {FC, FormEventHandler, useState} from "react";

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

  const {mutate, isLoading} = useMutation({
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

  return (
    <Portal>
      <div className="fixed z-40 grid w-full h-full bg-background/50 backdrop-blur-sm place-items-center">
        <div className="flex flex-col w-[39rem] gap-5 bg-white py-6 px-8 rounded-lg">
          {isLoading ? (
            <p>Deleting Image...</p>
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
