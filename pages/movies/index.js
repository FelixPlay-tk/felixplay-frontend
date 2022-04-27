import Banner from "../../components/Banner/Banner";
import { useState, useEffect } from "react";

const Movies = () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/featured`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

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
