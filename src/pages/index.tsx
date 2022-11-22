import type {NextPage} from "next";

import {useAtom} from "jotai";
import {Waveform} from "@uiball/loaders";

import {ImageCard} from "@/components";
import {useImageQuery} from "@/Hooks";

import {tagAtom} from "./_app";

const Home: NextPage = () => {
  const [tag] = useAtom(tagAtom);
  const {data, isError, isLoading} = useImageQuery((images) => {
    if (tag === "") return images;

    return images.filter((image) => image.tags.includes(tag));
  });

  if (isLoading)
    return (
      <section className="grid h-full place-items-center">
        <Waveform
          color="black"
          lineWeight={3.5}
          size={40}
          speed={1}
        />
      </section>
    );

  return (
    <section className="mx-auto columns-3xs gap-6 max-w-screen-standar pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      {isError && (
        <p className="text-tertiary">Something went wrong!!</p>
      )}
      {data &&
        data.map(({secure_url, asset_id, public_id, tags}) => {
          return (
            <ImageCard
              key={asset_id}
              public_id={public_id}
              src={secure_url}
              tags={tags}
            />
          );
        })}
    </section>
  );
};

export default Home;
