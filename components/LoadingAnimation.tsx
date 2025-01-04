"use client";

import { useEffect, useState } from "react";

const loadingTexts = [
  "Analyzing your images...",
  "Processing visual elements...",
  "Interpreting context...",
  "Generating insights...",
  "Almost there...",
];

export default function LoadingAnimation() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-6 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin-slower"></div>
      </div>
      <p className="mt-8 text-lg text-gray-300 animate-pulse">
        {loadingTexts[textIndex]}
      </p>
    </div>
  );
}