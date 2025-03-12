"use client"
import React, { useEffect } from "react";
import { motion, useCycle } from "framer-motion";

const itemsA: number[] = [1, 2, 3, 4];
const itemsB: number[] = [3, 1, 4, 2];
const itemsC: number[] = [4, 3, 2, 1];
const itemsD: number[] = [2, 4, 1, 3];

const colors: string[] = ["#f0f", "#3f0", "#fb0", "#0ef"];

 const LoadingCard: React.FC = () => {
  const [items, setItems] = useCycle<number[]>(itemsA, itemsB, itemsC, itemsD);

  useEffect(() => {
    const timer = setTimeout(() => setItems(), 1500);
    return () => clearTimeout(timer);
  }, [items, setItems]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridGap: 10,
      }}
    >
      {items.map((item: number) => (
        <motion.div
          key={item}
          style={{
            width: 65,
            height: 65,
            borderRadius: 15,
            backgroundColor: colors[item - 1],
          }}
          layout
          transition={{ type: "spring", stiffness: 350, damping: 16 }}
        />
      ))}
    </div>
  );
};

export default LoadingCard;
