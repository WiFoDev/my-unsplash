import type {NextPage} from "next";

import {useQuery} from "@tanstack/react-query";

import {ImageCard} from "@/components";
import {getImages} from "@/querys";

const Home: NextPage = () => {
  const {data, isError, isLoading} = useQuery(["images"], getImages);

  return (
    <section className="mx-auto columns-3xs gap-6 max-w-screen-standar pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-tertiary">Something went wrong!!</p>
      )}
      {data &&
        data.map(({secure_url, asset_id, tags}) => {
          return (
            <ImageCard key={asset_id} src={secure_url} tags={tags} />
          );
        })}
    </section>
  );
};

export default Home;
