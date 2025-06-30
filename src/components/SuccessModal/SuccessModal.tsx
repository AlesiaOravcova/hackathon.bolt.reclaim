import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '../ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityTitle?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  activityTitle = "your wellness activity"
}) => {
  useEffect(() => {
    if (isOpen) {
      // Single burst of confetti from the bottom
      const fireConfetti = () => {
        const count = 200;
        const defaults = {
          origin: { y: 1.2 }, // Start from below the screen
          colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'],
          shapes: ['square', 'circle'],
          gravity: 0.8, // Realistic gravity
          drift: 0.1, // Slight horizontal drift
          ticks: 300, // How long particles last
          startVelocity: 45, // Initial upward velocity
          scalar: 1.2, // Size of particles
        };

        // Fire confetti from multiple points along the bottom
        confetti({
          ...defaults,
          particleCount: count * 0.25,
          spread: 26,
          angle: 60,
          origin: { x: 0.2, y: 1.2 }
        });

        confetti({
          ...defaults,
          particleCount: count * 0.35,
          spread: 60,
          angle: 90,
          origin: { x: 0.5, y: 1.2 }
        });

        confetti({
          ...defaults,
          particleCount: count * 0.25,
          spread: 26,
          angle: 120,
          origin: { x: 0.8, y: 1.2 }
        });

        // Additional smaller bursts for more natural effect
        setTimeout(() => {
          confetti({
            ...defaults,
            particleCount: count * 0.15,
            spread: 40,
            angle: 75,
            origin: { x: 0.35, y: 1.2 },
            startVelocity: 35,
          });

          confetti({
            ...defaults,
            particleCount: count * 0.15,
            spread: 40,
            angle: 105,
            origin: { x: 0.65, y: 1.2 },
            startVelocity: 35,
          });
        }, 150);
      };

      // Delay the confetti slightly to sync with modal animation
      const confettiTimeout = setTimeout(fireConfetti, 400);

      return () => clearTimeout(confettiTimeout);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 500,
              duration: 0.3 
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl"
          >
            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-medium text-gray-900 mb-4 text-left">
                You've committed to{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  me time!
                </span>
              </h2>
              
              {/* Activity Details Box - Centered */}
              <div className="text-center mb-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 inline-block border border-blue-200 rounded-2xl p-3"
                >
                  <p className="text-lg font-normal text-grey-900 text-left">
                    🧘 Morning Meditation
                  </p>
                </motion.div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-left">
                15 minutes before we'll send you a gentle reminder.
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={onClose}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center"
              >
                Perfect! ✨
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};