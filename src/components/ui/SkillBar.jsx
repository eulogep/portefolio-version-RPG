import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ name, level, color, icon: Icon }) => {
  return (
    <div className="glass-effect p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6" style={{ color: color }} />}
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <span className="text-sm font-medium">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 skill-bar">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default SkillBar;