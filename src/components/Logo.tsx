import React from "react";
import logoImg from "../assets/images/holiday_hype_logo_perfect_trans.png";

interface LogoProps {
  variant?: "nav" | "light" | "card";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "nav",
  size = "sm",
  className = "",
  alt = "Holiday Hype Tours & Travel",
}) => {
  // Proportional sizing that maintains aspect ratio and gives ample negative space
  const sizeMap = {
    xs: {
      container: "h-8 sm:h-9",
      img: "h-7 sm:h-8",
    },
    sm: {
      // Header navigation size: prominent, legible, and uncrowded
      container: "h-11 sm:h-12 md:h-14 py-0.5",
      img: "h-10 sm:h-11 md:h-13",
    },
    md: {
      // Medium display (e.g. footer brand card)
      container: "h-14 sm:h-16",
      img: "h-12 sm:h-14",
    },
    lg: {
      container: "h-18 sm:h-22",
      img: "h-16 sm:h-20",
    },
    xl: {
      container: "h-24 sm:h-28",
      img: "h-20 sm:h-24",
    },
  }[size];

  // Card variant for dark sections like footer where a refined white card provides a clean canvas
  if (variant === "card") {
    return (
      <div className={`inline-flex items-center justify-center bg-white rounded-lg px-3.5 py-2 shadow-xs border border-white/20 select-none ${className}`}>
        <img
          src={logoImg}
          alt={alt}
          className={`w-auto ${sizeMap.img} object-contain`}
          loading="eager"
          decoding="sync"
        />
      </div>
    );
  }

  // Default / Nav: 100% seamless, integrated directly into the navbar
  // No box, no border, no artificial glow or shadow
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${sizeMap.container} ${className}`}
    >
      <img
        src={logoImg}
        alt={alt}
        className={`w-auto ${sizeMap.img} object-contain`}
        loading="eager"
        decoding="sync"
      />
    </div>
  );
};



