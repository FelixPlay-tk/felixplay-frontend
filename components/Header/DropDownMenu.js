import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const DropDownMenu = ({ href, name, children }) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    return (
        <div
            onMouseEnter={() => setDropDownOpen(true)}
            onMouseLeave={() => setDropDownOpen(false)}
        >
            <Link href={href}>{name}</Link>
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
