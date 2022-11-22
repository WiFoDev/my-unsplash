import type {NextPage} from "next";

import {ImageCard} from "@/components";
import {useImageQuery} from "@/Hooks";

const Home: NextPage = () => {
  const {data, isError, isLoading} = useImageQuery();

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
