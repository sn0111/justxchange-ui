import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay with backdrop blur */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel
            as="div"
            className="  shadow-2xl transition-all duration-300"
          >
            {/* Title (if provided) */}
            {/* {title && (
              <DialogTitle className="text-xl font-bold text-gray-800">
                {title}
              </DialogTitle>
            )} */}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              exit={{ opacity: 0, y: -50 }}
            >
              {children}
            </motion.div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
