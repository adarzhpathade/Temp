"use client";

import React from "react";
import { motion } from "framer-motion";

export function HandDrawnHeroArt() {
  return (
    <div className="relative w-full max-w-md flex items-center justify-center py-6">
      {/* Background Watercolor Blot in Ultramarine & Sage */}
      <div
        className="absolute w-72 h-72 blur-2xl -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(63,92,154,0.35), rgba(110,140,79,0.2) 65%, transparent 75%)",
          borderRadius: "55% 45% 60% 40% / 50% 55% 45% 50%",
        }}
      />

      <svg
        viewBox="0 0 340 400"
        className="w-full h-auto drop-shadow-sm select-none"
        style={{ overflow: "visible" }}
      >
        {/* Apothecary Mortar & Pestle base */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          d="M70 280 Q80 340 170 345 Q260 340 270 280 Q250 240 170 240 Q90 240 70 280 Z"
          fill="none"
          stroke="#33302B"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Mortar Pedestal Stand */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
          d="M130 345 L115 375 L225 375 L210 345"
          fill="none"
          stroke="#33302B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Pestle tilted */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          d="M140 310 L235 150 Q245 135 255 142 Q265 150 252 165 L165 315"
          fill="none"
          stroke="#A85A33"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Botanical Willow / Digitalis Stem growing upward */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.7, ease: "easeInOut" }}
          d="M170 240 Q150 160 175 90 Q180 50 170 25"
          fill="none"
          stroke="#6E8C4F"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Botanical Leaves */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          d="M172 190 Q205 175 220 188 Q200 205 172 195"
          fill="none"
          stroke="#6E8C4F"
          strokeWidth="1.8"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
          d="M165 140 Q130 120 120 135 Q140 155 165 145"
          fill="none"
          stroke="#6E8C4F"
          strokeWidth="1.8"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
          d="M175 95 Q205 75 215 90 Q195 108 175 98"
          fill="none"
          stroke="#6E8C4F"
          strokeWidth="1.8"
        />

        {/* Molecular / Chemistry Ring Callout in Ultramarine */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1.8, ease: "easeOut" }}
          d="M75 120 L100 105 L125 120 L125 150 L100 165 L75 150 Z"
          fill="none"
          stroke="#3F5C9A"
          strokeWidth="1.8"
          strokeDasharray="3 3"
        />
        <text
          x="100"
          y="138"
          textAnchor="middle"
          className="font-elite text-[11px] fill-[#3F5C9A]"
        >
          C₉H₈O₄
        </text>

        {/* Doodled Dosing Pipette / Capsule */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
          d="M60 190 Q50 175 65 165 Q80 155 95 170 L75 200 Z"
          fill="none"
          stroke="#A85A33"
          strokeWidth="1.6"
        />
      </svg>

      {/* Sketched study annotation badge */}
      <div className="absolute -bottom-2 right-4 font-cav text-xl text-[#A85A33] rotate-[-5deg] select-none">
        pharmacopeia plate no. 06 ↺
      </div>
    </div>
  );
}
