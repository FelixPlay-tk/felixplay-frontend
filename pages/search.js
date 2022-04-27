import { XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
function Search() {
    const router = useRouter();

    const closeSearch = () => {
        router.back();
    };

    const searchHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-black top-0 bottom-0 right-0 left-0 fixed z-50">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
            >
                <div className="h-12 ">
                    <XIcon
                        className="h-8 absolute right-5 top-5 cursor-pointer"
                        onClick={closeSearch}
                    />
                </div>

                <form className="mx-auto w-11/12 mt-6 flex justify-center items-center">
                    <input
                        type="search"
                        placeholder="Search"
                        className="flex-1 min-w-0 bg-gray-900 px-3 h-10 outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-gradient-to-tr from-pink-600 to-purple-600 h-10 px-3 lg:px-6"
                        onClick={searchHandler}
                    >
                        Search
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default Search;
