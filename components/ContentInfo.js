/* eslint-disable @next/next/no-img-element */

import { ShareIcon } from "@heroicons/react/outline";

const ContentInfo = () => {
    return (
        <section className="max-w-5xl mx-auto w-11/12 py-10">
            <section className="grid lg:grid-cols-7 gap-10 lg:gap-14">
                <div className="lg:col-span-2 w-full flex justify-center items-start">
                    <img
                        src="https://www.themoviedb.org/t/p/w220_and_h330_face/u3B2YKUjWABcxXZ6Nm9h10hLUbh.jpg"
                        alt=""
                        className="object-contain h-96 lg:h-auto rounded-2xl select-none"
                    />
                </div>

                <section className="lg:col-span-5 ml-auto self-start px-4 space-y-6">
                    <div>
                        <h1 className="text-xl md:text-4xl font-bold leading-tight">
                            Doctor Strange in the Multiverse of Madness
                        </h1>

                        <div className="mt-1 flex items-center justify-start flex-wrap gap-2 text-xl font-semibold text-gray-500">
                            <p className="">English •</p>
                            <p>2h 05m</p>
                        </div>

                        <div className="mt-4 flex gap-2 items-center flex-wrap cursor-default">
                            <span className="bg-gray-800 rounded-full text-gray-400 font-semibold flex justify-center items-center h-8 px-4">
                                Action
                            </span>
                            <span className="bg-gray-800 rounded-full text-gray-400 font-semibold flex justify-center items-center h-8 px-4">
                                Sci-Fi
                            </span>
                            <span className="bg-gray-800 rounded-full text-gray-400 font-semibold flex justify-center items-center h-8 px-4">
                                Adventure
                            </span>
                            <span className="bg-gray-800 rounded-full text-gray-400 font-semibold flex justify-center items-center h-8 px-4">
                                Fantasy
                            </span>
                        </div>

                        <p className="mt-4 md:text-xl text-gray-400 ">
                            Dr. Stephen Strange casts a forbidden spell that
                            opens the doorway to the multiverse, including
                            alternate versions of himself, whose threat to
                            humanity is too great for the combined forces of
                            Strange, Wong, and Wanda Maximoff.
                        </p>

                        <p className="font-semibold italic text-gray-600 my-2">
                            Released on : 6 May, 2022
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
