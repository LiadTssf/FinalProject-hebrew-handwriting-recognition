import React, { useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InfoPageLayout = ({ title, subtitle, children, icon, color = 'blue' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const colorClasses = {
    blue: 'from-blue-600 to-indigo-700',
    green: 'from-green-600 to-teal-700',
    purple: 'from-purple-600 to-indigo-700',
    red: 'from-red-600 to-pink-700',
    yellow: 'from-yellow-500 to-orange-600',
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className={`w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${colorClasses[color]}`}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center text-white"
            >
              <div className="mr-4 bg-white bg-opacity-20 p-3 rounded-full">
                {icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-white text-opacity-90 mt-2">{subtitle}</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// Reusable animation components
const FadeInSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const InfoCard = ({ title, description, icon, delay = 0 }) => {
  return (
    <FadeInSection delay={delay}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full border border-gray-100">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </FadeInSection>
  );
};

export { InfoPageLayout, FadeInSection, InfoCard };