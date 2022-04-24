import { motion } from "framer-motion";
import Portal from "./Portal";

function Modal({ children, className }) {
    return (
        <Portal>
            <motion.div
                initial={{
                    opacity: 0,
                    // y: -100,
                    scale: 0,
                }}
                animate={{
                    opacity: 1,
                    // y: 0,
                    scale: 1,
                }}
                exit={{
                    opacity: 0,
                    // y: -60,
                    scale: 0,
                }}
                transition={{ type: "just" }}
                className="fixed top-0 bottom-0 left-0 w-full bg-black bg-opacity-75  z-50 overflow-y-auto flex justify-center  items-center"
            >
                {children}
            </motion.div>
        </Portal>
    );
}

export default Modal;
