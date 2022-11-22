import Head from "next/head";
import Image from "next/image";
import React, {useState} from "react";
import {useAtom} from "jotai";

import unsplashLogo from "@/assets/my_unsplash_logo.svg";
import searchIcon from "@/assets/search-icon.svg";
import {Modal} from "@/components";
import {tagAtom} from "@/pages/_app";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [_, setTag] = useAtom(tagAtom);

  const handleSubmition: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (label.trim().length !== label.length) return;
    setTag(label);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Head>
        <title>My Unsplash</title>
        <meta content="The next unsplash app" name="My Unsplash" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-sm">
        <nav className="flex h-16 mx-auto max-w-screen-standar items-center justify-end gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          <div className="flex items-center gap-4 mr-auto">
            <Image alt="My unsplash logo" src={unsplashLogo} />
            <form onSubmit={handleSubmition}>
              <label className="flex items-center gap-2 border-[1px] border-background p-3 text-xs rounded-md">
                <div className="w-4 h-4">
                  <Image alt="Search Icon" src={searchIcon} />
                </div>
                <input
                  className="bg-transparent outline-none"
                  placeholder="Search by label"
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </label>
            </form>
          </div>
          <button
            className="px-4 py-3 text-sm font-semibold text-white rounded-lg shadow-md shadow-primary/50 bg-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add a photo
          </button>
          {isModalOpen && (
            <Modal setModalOpenState={setIsModalOpen} />
          )}
        </nav>
      </header>
      <main className="relative flex-1 w-full h-full pt-6">
        {children}
      </main>
      <footer className="relative pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-screen-standar py-6 flex justify-center pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          Made with ❤️ by WiFo
        </div>
      </footer>
    </div>
  );
};
