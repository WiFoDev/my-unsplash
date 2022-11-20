import type {NextPage} from "next";

import image1 from "@/assets/image-1.jpg";
import image2 from "@/assets/image-2.jpg";
import image3 from "@/assets/image-3.jpg";
import image4 from "@/assets/image-4.jpg";
import image5 from "@/assets/image-5.jpg";
import image6 from "@/assets/image-6.jpg";
import {ImageCard} from "@/components";

const Home: NextPage = () => {
  return (
    <section className="mx-auto columns-3xs gap-6 max-w-screen-standar pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      <ImageCard src={image1} />
      <ImageCard src={image2} />
      <ImageCard src={image3} />
      <ImageCard src={image4} />
      <ImageCard src={image5} />
      <ImageCard src={image6} />
    </section>
  );
};

export default Home;
