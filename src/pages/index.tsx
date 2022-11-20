import type {NextPage} from "next";

import Image from "next/image";

import image1 from "@/assets/image-1.jpg";
import image2 from "@/assets/image-2.jpg";
import image3 from "@/assets/image-3.jpg";
import image4 from "@/assets/image-4.jpg";
import image5 from "@/assets/image-5.jpg";
import image6 from "@/assets/image-6.jpg";

const Home: NextPage = () => {
  return (
    <section>
      <Image alt="A random image" src={image1} />
      <Image alt="A random image" src={image2} />
      <Image alt="A random image" src={image3} />
      <Image alt="A random image" src={image4} />
      <Image alt="A random image" src={image5} />
      <Image alt="A random image" src={image6} />
    </section>
  );
};

export default Home;
