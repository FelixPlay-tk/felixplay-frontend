import { DownloadIcon, LockClosedIcon } from "@heroicons/react/outline";
import { useState } from "react";
import ContentInfo from "../../../components/ContentInfo";
import SeasonSelect from "../../../components/SeasonSelect";
import Spinner from "../../../components/UI/Spinner";
import { useAuthCtx } from "../../../context/authContext";

const people = [
    { name: "Season 1" },
    { name: "Season 2" },
    { name: "Season 3" },
];

const Details = () => {
    const [selected, setSelected] = useState(people[0]);

    const { authLoading, isLoggedIn } = useAuthCtx();

    return (
        <div className="bg-[url('https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black bg-opacity-90 backdrop-blur body-minimum-height">
                <ContentInfo />

                <div className="max-w-5xl w-10/12 mx-auto select-none flex flex-col justify-center items-start mt-10">
                    <h2 className="text-xl">Download Section</h2>
                    <div className="h-0.5 w-full bg-gradient-to-r from-pink-600 to-purple-600 my-2 " />
                </div>

                {authLoading && !isLoggedIn && (
                    <div className="flex items-center justify-center">
                        <Spinner className="animate-spin h-10 text-purple-500" />
                    </div>
                )}

                {!authLoading && isLoggedIn && (
                    <div className="max-w-5xl w-10/12 mx-auto select-none">
                        <SeasonSelect
                            selected={selected}
                            setSelected={setSelected}
                            people={people}
                        />

                        <div className="flex gap-2 items-center flex-wrap pt-5 pb-10">
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 1</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 2</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 3</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 4</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 5</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 6</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 7</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 8</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 9</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                            <button className="w-full lg:w-60 bg-pink-600 py-2 px-8 rounded flex justify-between">
                                <span>Episode 10</span>
                                <span>
                                    <DownloadIcon className="text-white h-5" />
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {!authLoading && !isLoggedIn && (
                    <div className="max-w-5xl w-10/12 mx-auto mt-10 select-none flex items-center justify-center">
                        <div className="bg-pink-600 bg-opacity-10 text-pink-600 border border-pink-600 px-6 py-4 rounded-xl flex justify-between w-full max-w-md">
                            <p>Please Login to Download</p>
                            <LockClosedIcon className="h-6" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
