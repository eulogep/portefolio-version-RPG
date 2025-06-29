
import React from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ items }) => {
  return (
    <div className="relative border-l-2 border-blue-500/30 pl-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2.5 border-2 border-background"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.date}</p>
          <h4 className="text-lg font-bold">{item.title}</h4>
          <p className="text-gray-600 dark:text-gray-300">{item.institution}</p>
          {item.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{item.description}</p>}
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;