import type {NextPage} from "next";

import {useQuery} from "@tanstack/react-query";

import {ImageCard} from "@/components";

const getImages = async () => {
  const results = await fetch(
    "http://localhost:3000/api/images",
  ).then((res) => res.json());

  return results;
};

interface ImageTypes {
  secure_url: string;
  asset_id: string;
}

const Home: NextPage = () => {
  const {data, isError, isLoading} = useQuery<ImageTypes[]>(
    ["images"],
    getImages,
  );

  return (
    <section className="mx-auto columns-3xs gap-6 max-w-screen-standar pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      {isLoading && <p>Loading...</p>}
      {data &&
        data.map(({secure_url, asset_id}) => {
          return <ImageCard key={asset_id} src={secure_url} />;
        })}
    </section>
  );
};

export default Home;
