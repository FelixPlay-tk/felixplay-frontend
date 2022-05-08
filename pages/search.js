import { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import ContentCard from "../components/ContentCard";

const item = {
    title: "uncharted (2022)",
    contentType: "movie",
    banner: "https://image.tmdb.org/t/p/w1280_and_h720_bestv2/aEGiJJP91HsKVTEPy1HhmN0wRLm.jpg",
    poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/sqLowacltbZLoCa4KYye64RvvdQ.jpg",
    releaseDate: "2022-02-17T18:30:00.000Z",
    _id: "62682d56e103597b88259c3f",
    categories: ["comedy", "drama"],
    language: "hindi",
    runtime: "2h 30m",
    details:
        "a young street-smart, nathan drake and his wisecracking partner victor “sully” sullivan embark on a dangerous pursuit of “the greatest treasure never found” while also tracking clues that may lead to nathan’s long-lost brother.",
};

function Search() {
    const [searchResult, setSearchResult] = useState([
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]);

    const router = useRouter();

    const closeSearch = () => {
        router.back();
    };

    const searchHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-black top-0 bottom-0 right-0 left-0 fixed z-50 overflow-auto">
            <div className="sticky top-0 z-10 bg-black bg-opacity-90 backdrop-blur">
                <div className="h-12 bg-black w-10/12 mx-auto relative">
                    <XIcon
                        className="h-8 absolute right-5 top-5 cursor-pointer"
                        onClick={closeSearch}
                    />
                </div>

                <form className="py-6 flex justify-center items-center w-10/12 mx-auto">
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
            </div>

            <div className="mt-10 w-10/12 mx-auto">
                <h2 className="my-2 text-lg md:text-xl font-semibold">
                    Seach Results
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
                    {searchResult.map((r, i) => (
                        <ContentCard item={item} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;
