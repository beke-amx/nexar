"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Tooltip({ children, content, containerClassName = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleClose = () => {
    if (isTouchDevice) {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 3000);
    } else {
      setIsOpen(false);
    }
  };

  const handleClick = (e) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={!isTouchDevice ? handleOpen : undefined}
      onMouseLeave={!isTouchDevice ? handleClose : undefined}
      onClick={handleClick}
      onTouchStart={isTouchDevice ? handleOpen : undefined}
    >
      <span className={containerClassName}>{children}</span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[9999] w-64 sm:w-72 md:w-80 pointer-events-none"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 p-4 max-w-[90vw]">
              {typeof content === "string" ? (
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content}
                </p>
              ) : (
                content
              )}
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-6 sm:border-8 border-transparent border-t-white dark:border-t-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}