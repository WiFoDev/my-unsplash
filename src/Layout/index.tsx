import Head from "next/head";
import Image from "next/image";
import React from "react";

import unsplashLogo from "@/assets/my_unsplash_logo.svg";
import searchIcon from "@/assets/search-icon.svg";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>My Unsplash</title>
        <meta content="The next unsplash app" name="My Unsplash" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <header className="sticky top-0 z-20 w-full">
        <nav className="flex h-16 mx-auto max-w-screen-standar items-center justify-end gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          <div className="flex items-center gap-4 mr-auto">
            <Image alt="My unsplash logo" src={unsplashLogo} />
            <label className="flex items-center gap-2 border-[1px] border-secondary p-3 text-xs rounded-md">
              <div className="w-4 h-4">
                <Image alt="Search Icon" src={searchIcon} />
              </div>
              <input
                className="outline-none"
                placeholder="Search by name"
                type="text"
              />
            </label>
          </div>
          <button className="px-4 py-3 text-sm font-semibold text-white rounded-lg shadow-md shadow-primary/50 bg-primary">
            Add a photo
          </button>
        </nav>
      </header>
      <main className="relative flex flex-col items-center justify-center w-full h-full">
        {children}
      </main>
      <footer className="relative pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-screen-standar py-12 flex justify-center pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          Here is the footer section
        </div>
      </footer>
    </>
  );
};
