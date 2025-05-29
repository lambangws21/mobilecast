"use client";

import React, { JSX } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const items: number[] = [0, 1, 2, 3, 4];
const height: number = 70; // tinggi setiap card (px)
const padding: number = 10; // jarak antar card (px)
const size: number = 150; // ukuran container (px)

function getHeight(items: number[]): number {
  const totalHeight = items.length * height;
  const totalPadding = (items.length - 1) * padding;
  return totalHeight + totalPadding;
}


const NewSlide = () : JSX.Element => {
    const scrollY = useMotionValue(0);

    const width = useTransform(
      scrollY,
      [0, -getHeight(items) + size],
      ["calc(0% - 0px)", "calc(100% - 40px)"]
    );
  
    return (
      <>
        {/* Container utama dengan ukuran tetap */}
        <motion.div
          className="w-[150px] h-[150px] rounded-[30px] overflow-hidden relative cursor-grab"
          style={{ transform: "translateZ(0)" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Container draggable */}
          <motion.div
            className="w-[150px]"
            style={{
              height: getHeight(items),
              y: scrollY,
            }}
            drag="y"
            dragConstraints={{
              top: -getHeight(items) + size,
              bottom: 0,
            }}
          >
            {items.map((index: number) => (
              <motion.div
                key={index}
                className="w-[150px] h-[70px] rounded-[20px] bg-white absolute"
                style={{
                  top: (height + padding) * index,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
        {/* Progress bar */}
        <motion.div
          className="h-[px] rounded-[3px] bg-white absolute bottom-[20px] left-[20px]"
          style={{ width }}
        />
      </>
    );
  }

export default NewSlide