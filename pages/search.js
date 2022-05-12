import { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import ContentCard from "../components/ContentCard";
import axios from "axios";
import Spinner from "../components/UI/Spinner";

function Search() {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const closeSearch = () => {
        router.back();
    };

    const searchHandler = (e) => {
        e.preventDefault();
        if (input.trim().length <= 2) return;

        setLoading(true);

        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/search?query=${input}`)
            .then((res) => {
                if (res.statusText === "OK") {
                    setSearchResult(res.data || []);
                    setLoading(false);
                }
            })
            .catch((e) => {
                setLoading(false);
                setSearchResult([]);
                setError(e.response.data.message || e.message);
                return;
            });
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

                <form
                    className="py-6 flex justify-center items-center w-10/12 mx-auto"
                    onSubmit={searchHandler}
                >
                    <input
                        type="search"
                        placeholder="Search"
                        className="flex-1 min-w-0 bg-gray-900 px-3 h-10 outline-none"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError("");
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading || error}
                        className="bg-gradient-to-tr from-pink-600 to-purple-600 h-10 px-3 lg:px-6"
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="mt-10 w-10/12 mx-auto">
                {loading && (
                    <div className="w-full grid place-items-center h-24">
                        <Spinner className="h-10 w-10 animate-spin text-pink-500" />
                    </div>
                )}

                {!loading && error && (
                    <h2 className="my-2 text-lg md:text-xl font-semibold">
                        No Result Found for {input}
                    </h2>
                )}

                {!!searchResult.length && !loading && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
                        {searchResult.map((item, i) => (
                            <ContentCard item={item} key={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
