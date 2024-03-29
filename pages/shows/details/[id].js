import { DownloadIcon, LockClosedIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useState, useEffect } from "react";
import ContentInfo from "../../../components/ContentInfo";
import Spinner from "../../../components/UI/Spinner";
import { useAuthCtx } from "../../../context/authContext";

const Details = ({
    details: {
        _id,
        contentType,
        title,
        details,
        language,
        poster,
        banner,
        categories,
        platform,
        releaseDate,
        region,
    },
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);
    const { authLoading, isLoggedIn, authToken } = useAuthCtx();

    useEffect(() => {
        if (!isLoggedIn) return;
        axios
            .get(
                `${process.env.NEXT_PUBLIC_API_URL}/shows/episodelinks/${_id}`,
                {
                    headers: {
                        authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then((res) => {
                setEpisodes(res.data?.episodes || []);
                setIsLoading(false);
                return;
            })
            .catch((e) => {
                setIsLoading(false);
            });
    }, [isLoggedIn, _id, authToken]);

    return (
        <div
            className={`bg-no-repeat bg-fixed bg-top bg-cover`}
            style={{ backgroundImage: `url('${poster}')` }}
        >
            <div className="bg-black bg-opacity-90 backdrop-blur">
                <ContentInfo
                    _id={_id}
                    contentType={contentType}
                    title={title}
                    details={details}
                    language={language}
                    poster={poster}
                    banner={banner}
                    categories={categories}
                    releaseDate={releaseDate}
                    region={region}
                    platform={platform}
                />

                <div className="max-w-5xl w-10/12 mx-auto mt-10">
                    <div className="flex flex-col justify-center items-start">
                        <h2 className="text-xl">Download Section</h2>
                        <div className="h-0.5 w-full bg-gradient-to-r from-pink-600 to-purple-600 my-2" />
                    </div>

                    <div className="pt-10 pb-20">
                        {!authLoading && !isLoggedIn && (
                            <div className="flex justify-center items-center">
                                <div className="bg-pink-600 bg-opacity-10 text-pink-600 border border-pink-600 px-6 py-4 rounded-xl flex justify-between w-full max-w-md">
                                    <p>Please Login to Download</p>
                                    <LockClosedIcon className="h-6" />
                                </div>
                            </div>
                        )}

                        {(authLoading && !isLoggedIn) ||
                            (isLoading && isLoggedIn && (
                                <div className="flex flex-col items-center justify-center">
                                    <Spinner className="animate-spin h-10 text-purple-500" />
                                </div>
                            ))}

                        {!authLoading && isLoggedIn && (
                            <div className="w-full flex flex-wrap justify-center gap-4">
                                {episodes?.map((episode, index) => (
                                    <div
                                        className="w-52 flex flex-col gap-4 bg-white  bg-opacity-5 border border-pink-600 rounded-md p-4"
                                        key={index}
                                    >
                                        <p className="font-bold tracking-wider text-center">
                                            {episode.episode}
                                        </p>

                                        <div className="flex flex-col items-center justify-center gap-2">
                                            {episode.downloadLinks?.map(
                                                (link, index) => (
                                                    <button
                                                        key={index}
                                                        className="uppercase flex items-center justify-center text-pink-600 rounded-md font-semibold w-28 py-1 bg-white"
                                                    >
                                                        <DownloadIcon className="h-5" />
                                                        {link.resolution}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;

export async function getStaticProps(context) {
    try {
        const fetchResponse = await fetch(
            `${process.env.SSR_URL}/shows/details/${context.params.id}`
        );
        const details = await fetchResponse.json();

        return {
            props: {
                details,
                key: details._id,
            },
            revalidate: 600,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}
