import Image from "next/image";
import React from "react";
import CloudImage from "../../../public/cloud-hosting.png";

const AboutPage = () => {
  return (
    <section className="fix-height container m-auto">
      <h1 className="text-3xl font-bold text-gray-800 p-5">About Page</h1>
      <div>
        <Image src={CloudImage} alt="cloudimage" height={500} width={500} />
      </div>
    </section>
  );
};

export default AboutPage;
