import { cn } from "../../lib/utils";

import React, {
  Children,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const Spotlight = ({
  children,
  className,
  HoverFocusSpotlight = false,
}) => {
  return (
    <div
      className={cn(
        className,
        `group relative z-10 rounded-md grid grid-cols-4 gap-2`
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { HoverFocusSpotlight });
        }
        return child;
      })}
    </div>
  );
};

export function SpotlightItem({
  children,
  className,
  HoverFocusSpotlight = false,
}) {
  const divWrapper = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    setOverlayColor({ x: clientX - left, y: clientY - top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={divWrapper}
      className={cn(
        className,
        "relative rounded-lg justify-center items-center p-[2px] bg-[#ffffff15] overflow-hidden"
      )}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute opacity-0 z-50 rounded-xl w-full h-full group-hover:opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(250px circle at ${overlayColor.x}px ${overlayColor.y}px, rgba(255, 255, 255, 0.137), transparent 80%)`,
          }}
        />
      )}
      {HoverFocusSpotlight && (
        <div
          className="absolute opacity-0 group-hover:opacity-100 z-10 inset-0 bg-fixed rounded-lg"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff76 0%, transparent 20%, transparent) fixed`,
          }}
        />
      )}
      {children}
    </div>
  );
}

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  return (
    <div
      className={`relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
