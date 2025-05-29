"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import ENT1 from "../../../public/ENT1.jpeg";

const ProfileCardAnimated: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-[500px] pb-[50px] my-[100px]">
      <motion.div
        className="overflow-hidden flex justify-center items-center relative pt-2 -mb-[120px]"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.8 }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            // BAGIAN ATAS (top part) – Ubah koordinat di sini untuk mengubah tepi atas yang datar dan rounded
            // "M 0 303.5 C 0 292.454 8.995 285.101 20 283.5"
            clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 40 283.0 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
            background: splashBackground,
          }}
        />
        <motion.div
          className="w-[300px] h-[430px] flex flex-col justify-center items-center rounded-[40px] bg-[#f5f5f5] shadow-xl origin-[10%_60%] p-5 text-center"
          variants={cardVariants}
        >
            <h1 className="font-semibold mb-2 -mt-7">My Profile</h1>
          <Image src={ENT1} width={90} height={50} alt="lambang" className="rounded-lg border-4 shadow-xl"/>
          <h1 className="font-semibold uppercase text-3xl mt-2 text-emerald-500">Herlambang W</h1>
          <h2 className="text-lg mt-1">TS Zimmer</h2>
          <p className="text-lg mt-1">lambangws8@gmail.com</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const cardVariants: Variants = {
  offscreen: {
    y: 350,
  },
  onscreen: {
    y: 75,
    rotate: -5,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const splashBackground = `linear-gradient(306deg, #00712D, #118B50)`;

export default ProfileCardAnimated;
