/* eslint-disable @next/next/no-img-element */

const ContentInfo = () => {
    return (
        <section className="max-w-7xl mx-auto w-11/12 py-10">
            <section className="grid lg:grid-cols-6 gap-10 lg:gap-14">
                <div className="lg:col-span-2 w-full flex justify-center items-start">
                    <img
                        src="https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
                        alt=""
                        className="object-contain h-96 lg:h-auto rounded-2xl"
                    />
                </div>

                <section className="lg:col-span-4 ml-auto self-start px-4 space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-xl md:text-4xl font-bold leading-tight">
                            Doctor Strange in the Multiverse of Madness
                        </h1>

                        <div className="flex items-center justify-start gap-2 text-xl font-semibold text-gray-500">
                            <p className="">English</p>•<p>2h 05m</p>
                        </div>

                        <div className="flex gap-2 items-center flex-wrap cursor-default">
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

                        <p className="md:text-xl text-gray-400">
                            Dr. Stephen Strange casts a forbidden spell that
                            opens the doorway to the multiverse, including
                            alternate versions of himself, whose threat to
                            humanity is too great for the combined forces of
                            Strange, Wong, and Wanda Maximoff.
                        </p>
                    </div>
                </section>
            </section>
        </section>
    );
};

export default ContentInfo;
