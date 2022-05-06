import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DropDownMenu = ({ link, name, children }) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    return (
        <div
            onMouseEnter={() => setDropDownOpen(true)}
            onMouseLeave={() => setDropDownOpen(false)}
        >
            <span className="cursor-pointer">{name}</span>
            <AnimatePresence>
                {dropDownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ type: "just" }}
                        className="absolute overflow-hidden bg-transparent w-32 pt-3 -ml-3 capitalize rounded-md"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropDownMenu;
