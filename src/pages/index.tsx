import type {NextPage} from "next";

import {useEffect, useState} from "react";

import {ImageCard} from "@/components";

const Home: NextPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <section className="mx-auto columns-3xs gap-6 max-w-screen-standar pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      {images &&
        images.map(({secure_url, asset_id}) => {
          return <ImageCard key={asset_id} src={secure_url} />;
        })}
    </section>
  );
};

export default Home;
