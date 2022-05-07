/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const ContentInfo = () => {
    return (
        <section className="max-w-7xl mx-auto w-10/12 py-10">
            <section className="grid lg:grid-cols-6 gap-10 lg:gap-14">
                <div className="lg:col-span-2 w-full flex justify-center items-start">
                    <img
                        src="https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
                        alt=""
                        className="object-contain h-96 lg:h-auto rounded-2xl"
                    />
                </div>

                <section className="lg:col-span-4 ml-auto self-start">
                    <div className="space-y-2 md:space-y-4">
                        <h1 className="text-xl md:text-4xl font-bold leading-tight">
                            Doctor Strange in the Multiverse of Madness
                        </h1>
                        <p className="md:text-xl">
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
