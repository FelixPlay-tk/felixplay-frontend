import Banner from "../../components/Banner/Banner";
import { useState, useEffect } from "react";
import useSWR from "swr";

const Movies = () => {
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/featured`,
        (url) => fetch(url).then((r) => r.json())
    );

    return (
        <>
            <section className="">
                {data && data.length > 0 ? (
                    <Banner items={data} />
                ) : (
                    <div className="pt-[56%] w-full lg:h-[650px] lg:pt-0 overflow-hidden bg-gray-900 animate-pulse"></div>
                )}
            </section>
        </>
    );
};

export default Movies;
