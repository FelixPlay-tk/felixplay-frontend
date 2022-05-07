import React from "react";
import ContentInfo from "../../../components/ContentInfo";

const Details = () => {
    return (
        <div className="bg-[url('https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black bg-opacity-90 backdrop-blur body-minimum-height">
                <ContentInfo />

                <div className="max-w-5xl w-10/12 mx-auto mt-10">
                    <div className="flex flex-col justify-center items-center mt-10">
                        <h2 className="text-center text-xl">
                            Download Section
                            <div className="h-1 bg-gradient-to-r from-pink-600 to-purple-600 my-1 scale-x-150" />
                        </h2>
                    </div>

                    <div className="flex flex-col items-center justify-center mt-4 gap-4">
                        <button className="rounded-full bg-gradient-to-tl from-pink-600 to-purple-600 text-white py-2 px-8">
                            Download 1080p (4GB)
                        </button>
                        <button className="rounded-full bg-gradient-to-tl from-pink-600 to-purple-600 text-white py-2 px-8">
                            Download 1080p (4GB)
                        </button>
                        <button className="rounded-full bg-gradient-to-tl from-pink-600 to-purple-600 text-white py-2 px-8">
                            Download 1080p (4GB)
                        </button>
                        <button className="rounded-full bg-gradient-to-tl from-pink-600 to-purple-600 text-white py-2 px-8">
                            Download 1080p (4GB)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
