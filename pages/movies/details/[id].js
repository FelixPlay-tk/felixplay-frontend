import { useEffect, useState } from "react";
import { DownloadIcon, LockClosedIcon } from "@heroicons/react/outline";
import ContentInfo from "../../../components/ContentInfo";
import Spinner from "../../../components/UI/Spinner";
import { useAuthCtx } from "../../../context/authContext";
import Head from "next/head";

const downloadlinks = [
    { id: 1, link: "", size: "4GB", resolution: "1080p HEVC" },
    { id: 2, link: "", size: "3GB", resolution: "1080p" },
    { id: 3, link: "", size: "2GB", resolution: "720p" },
    { id: 4, link: "", size: "1GB", resolution: "576p" },
];

const Details = () => {
    const [downloadLinks, setDownloadLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authLoading, isLoggedIn } = useAuthCtx();

    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchLinks = () => {
            setDownloadLinks(downloadlinks);
            setIsLoading(false);
        };

        setTimeout(() => {
            fetchLinks();
        }, 1500);

        console.log("logged in");
    }, [isLoggedIn]);

    return (
        <div className="bg-[url('https://www.themoviedb.org/t/p/original/u3B2YKUjWABcxXZ6Nm9h10hLUbh.jpg')] bg-no-repeat bg-fixed bg-cover">
            <Head>
                <title>Doctor Strange in the Multiverse of Madness</title>
            </Head>

            <div className="bg-black bg-opacity-90 backdrop-blur body-minimum-height">
                <ContentInfo />

                <div className="max-w-5xl w-10/12 mx-auto mt-10">
                    <div className="flex flex-col justify-center items-start mt-10">
                        <h2 className="text-xl">Download Section</h2>
                        <div className="h-0.5 w-full bg-gradient-to-r from-pink-600 to-purple-600 my-2 " />
                    </div>

                    {(authLoading && !isLoggedIn) ||
                        (isLoading && isLoggedIn && (
                            <div className="flex items-center justify-center my-10">
                                <Spinner className="animate-spin h-10 text-purple-500" />
                            </div>
                        ))}

                    {!authLoading && !isLoggedIn && (
                        <div className="max-w-5xl w-10/12 mx-auto mt-10 select-none flex items-center justify-center">
                            <div className="bg-pink-600 bg-opacity-10 text-pink-600 border border-pink-600 px-6 py-4 rounded-xl flex justify-between w-full max-w-md">
                                <p>Please Login to Download</p>
                                <LockClosedIcon className="h-6" />
                            </div>
                        </div>
                    )}

                    {!isLoading && !authLoading && isLoggedIn && (
                        <div className="flex flex-col items-center justify-center mt-4 gap-4">
                            {downloadLinks.map(
                                ({ id, link, resolution, size }) => (
                                    <button
                                        className="rounded-lg bg-pink-600 text-white py-2 w-full max-w-xs lg:text-base text-sm flex items-center justify-center gap-2"
                                        key={id}
                                    >
                                        <p>
                                            Download {resolution} ({size})
                                        </p>
                                        <DownloadIcon className="h-5" />
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Details;
