import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function NavMenu({ expanded, setExpanded, closeSideBar, index, item }) {
    const isOpen = index === expanded;
    return (
        <>
            <motion.header
                initial={false}
                animate={{
                    backgroundColor: isOpen ? "#0c121f" : "rgba(11, 17, 29, 0)",
                }}
                onClick={() => setExpanded(isOpen ? false : index)}
            >
                <div className="sidebar-nav">{item.title}</div>
            </motion.header>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                        onClick={closeSideBar}
                    >
                        <motion.ul
                            transition={{ duration: 0.3 }}
                            className="px-6 py-3 bg-[#0c121f]  origin-top"
                        >
                            {item.childrens.map((link, i) => (
                                <li key={i}>
                                    <Link href={link.link}>
                                        <a className="block py-1 pl-2">
                                            {link.title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </motion.ul>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
}

export default NavMenu;
