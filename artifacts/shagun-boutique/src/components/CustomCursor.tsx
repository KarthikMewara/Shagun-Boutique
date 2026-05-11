import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-cursor-hover]")) {
        setHovered(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-cursor-hover]")) {
        setHovered(false);
      }
    };

    const loop = () => {
      setPos(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.12,
        y: prev.y + (targetRef.current.y - prev.y) * 0.12,
      }));
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        style={{
          left: pos.x,
          top: pos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 44 : 10,
          height: hovered ? 44 : 10,
          opacity: hovered ? 0.45 : 1,
          backgroundColor: "#D4AF37",
          backdropFilter: hovered ? "blur(4px)" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
      />
      <motion.div
        style={{
          left: pos.x,
          top: pos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 60 : 0,
          height: hovered ? 60 : 0,
          opacity: hovered ? 0.2 : 0,
          border: "1px solid #D4AF37",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed pointer-events-none z-[9998] rounded-full"
      />
    </>
  );
}
