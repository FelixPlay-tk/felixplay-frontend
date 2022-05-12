/* eslint-disable @next/next/no-img-element */

import { ShareIcon } from "@heroicons/react/outline";

const ContentInfo = ({
    _id,
    contentType,
    platform,
    title,
    details,
    language,
    poster,
    categories,
    runtime,
    releaseDate,
    region,
}) => {
    return (
        <section className="max-w-5xl mx-auto w-11/12 py-10">
            <section className="grid lg:grid-cols-7 gap-10 lg:gap-14">
                <div className="lg:col-span-2 w-full flex justify-center items-start">
                    <img
                        src={poster}
                        alt={title}
                        className="object-contain h-96 lg:h-auto rounded-2xl select-none bg-gray-900"
                    />
                </div>

                <section className="lg:col-span-5 ml-auto self-start px-4 space-y-6">
                    <div>
                        <h1 className="text-xl md:text-4xl font-bold leading-tight capitalize">
                            {title}
                        </h1>

                        <div className="mt-1 flex items-center justify-start flex-wrap gap-2 text-xl font-semibold text-gray-500">
                            <p className="capitalize">{language[0]}</p>
                            <span>•</span>
                            {contentType === "movie" && <p>{runtime}</p>}
                            {contentType === "show" && (
                                <p className="capitalize">{platform}</p>
                            )}
                            <span>•</span>
                            <p className="uppercase">
                                {new Date(releaseDate).getFullYear()} ({region})
                            </p>
                        </div>

                        <div className="mt-4 flex gap-2 items-center flex-wrap cursor-default">
                            {categories.map((cat, index) => (
                                <span
                                    className="bg-gray-800 rounded-full text-gray-400 font-semibold flex justify-center items-center h-8 px-4 capitalize"
                                    key={index}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <p className="mt-4 md:text-xl text-gray-400">
                            {details.charAt(0).toUpperCase() + details.slice(1)}
                        </p>
                    </div>

                    <div>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 w-48 px-2 py-2 rounded-lg flex items-center justify-center gap-2">
                            <ShareIcon className="h-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </section>
            </section>
        </section>
    );
};

export default ContentInfo;
