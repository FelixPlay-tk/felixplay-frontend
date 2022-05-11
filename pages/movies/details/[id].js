import { useEffect, useState } from "react";
import { DownloadIcon, LockClosedIcon } from "@heroicons/react/outline";
import ContentInfo from "../../../components/ContentInfo";
import Spinner from "../../../components/UI/Spinner";
import { useAuthCtx } from "../../../context/authContext";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

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
        runtime,
        releaseDate,
        region,
    },
}) => {
    const [downloadLinks, setDownloadLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authLoading, isLoggedIn } = useAuthCtx();

    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) return;
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/movies/links/${_id}`)
            .then((res) => {
                if (res.statusText === "OK") {
                    console.log(res.data);
                    setDownloadLinks(res.data?.downloadLinks || []);
                    setIsLoading(false);
                }
            })
            .catch((e) => console.log(e));
    }, [isLoggedIn, _id]);

    return (
        <div
            className={`bg-no-repeat bg-fixed bg-center bg-cover`}
            style={{ backgroundImage: `url('${poster}')` }}
        >
            <Head>
                <title>{title}</title>
            </Head>

            <div className="bg-black bg-opacity-90 backdrop-blur body-minimum-height">
                <ContentInfo
                    _id={_id}
                    contentType={contentType}
                    title={title}
                    details={details}
                    language={language}
                    poster={poster}
                    banner={banner}
                    categories={categories}
                    runtime={runtime}
                    releaseDate={releaseDate}
                    region={region}
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

                        {!isLoading && !authLoading && isLoggedIn && (
                            <div className="flex flex-col items-center justify-center gap-4">
                                {downloadLinks.map(
                                    ({ id, link, resolution, size }) => (
                                        <button
                                            className="rounded-lg bg-pink-600 text-white py-2 w-full max-w-xs lg:text-base text-sm flex items-center justify-center gap-2"
                                            key={id}
                                            onClick={() => router.push(link)}
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
        </div>
    );
};

export default Details;

export async function getStaticProps(context) {
    try {
        const fetchResponse = await fetch(
            `${process.env.SSR_URL}/movies/details/${context.params.id}`
        );
        const details = await fetchResponse.json();

        return {
            props: {
                details,
                key: details._id,
            },
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
