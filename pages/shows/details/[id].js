import { DownloadIcon, LockClosedIcon } from "@heroicons/react/outline";
import { useState } from "react";
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
        episodes,
    },
}) => {
    const { authLoading, isLoggedIn } = useAuthCtx();

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
                        {authLoading && !isLoggedIn && (
                            <div className="flex items-center justify-center">
                                <Spinner className="animate-spin h-10 text-purple-500" />
                            </div>
                        )}

                        {!authLoading && !isLoggedIn && (
                            <div className="flex justify-center items-center">
                                <div className="bg-pink-600 bg-opacity-10 text-pink-600 border border-pink-600 px-6 py-4 rounded-xl flex justify-between w-full max-w-md">
                                    <p>Please Login to Download</p>
                                    <LockClosedIcon className="h-6" />
                                </div>
                            </div>
                        )}

                        {!authLoading && isLoggedIn && (
                            <div className="w-full flex flex-wrap justify-center gap-4">
                                {Array.from({ length: 20 }).map(
                                    (episode, index) => (
                                        <div
                                            className="w-52 flex flex-col gap-6 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-md p-4"
                                            key={index}
                                        >
                                            <p className="font-bold tracking-wider text-center">
                                                {episode.episode}
                                                {/* {episode.title} */}
                                            </p>

                                            <div className="flex flex-col items-center justify-center gap-2">
                                                {
                                                    // episode.downloadLinks.map
                                                    Array.from({
                                                        length: 2,
                                                    }).map((link, index) => (
                                                        <button
                                                            key={index}
                                                            className="uppercase flex items-center justify-center text-pink-600 rounded-md font-semibold w-28 py-1 bg-white"
                                                        >
                                                            <DownloadIcon className="h-5" />
                                                            {/* {link.resolution} */}
                                                            1080p
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                )}
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
    // const response = await fetch(`${process.env.SSR_URL}/shows/ids`);
    // const data = await response.json();

    // const paths = data.map(({ _id }) => ({ params: { id: _id } }));
    return {
        paths: [],
        fallback: "blocking",
    };
}
