"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="m-auto max-w-full h-[80%]  flex flex-row justify-between items-center gap-3 ">
        <div className="flex-1 max-w-fit h-fit">
           <p>
            HackathonMates
           </p>
        </div>
        <Image
          src="/hero-img.png" // Path relative to the 'public' folder
          alt="Description of the image"
          width={550}
          height={785}
        />
      </div>

      <Footer />
    </>
  );
}
