import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursorOuter = document.getElementById("cursor-outer");
    const cursorInner = document.getElementById("cursor-inner");

    // Track mouse position
    const moveCursor = (e) => {
      gsap.to(cursorOuter, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(cursorInner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll("button, input, a");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => setHovering(true));
      el.addEventListener("mouseleave", () => setHovering(false));
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", () => setHovering(true));
        el.removeEventListener("mouseleave", () => setHovering(false));
      });
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        id="cursor-outer"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border-2 border-orange-500`}
        style={{
          width: hovering ? "40px" : "25px",
          height: hovering ? "40px" : "25px",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
      ></div>

      {/* Inner dot */}
      <div
        id="cursor-inner"
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-orange-500 z-50"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </>
  );
}
