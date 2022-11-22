import type {NextPage} from "next";

import {useAtom} from "jotai";

import {ImageCard} from "@/components";
import {useImageQuery} from "@/Hooks";

import {tagAtom} from "./_app";

const Home: NextPage = () => {
  const [tag] = useAtom(tagAtom);
  const {data, isError, isLoading} = useImageQuery((images) => {
    if (tag === "") return images;

    return images.filter((image) => image.tags.includes(tag));
  });

  return (
    <section className="mx-auto columns-3xs gap-6 max-w-screen-standar pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      {isLoading && <p>Loading...</p>}
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
