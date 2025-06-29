
import React from 'react';
import { motion } from 'framer-motion';

const CursorTrail = ({ cursorPosition }) => {
  return (
    <motion.div
      className="cursor-trail"
      animate={{
        x: cursorPosition.x - 10,
        y: cursorPosition.y - 10,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

export default CursorTrail;