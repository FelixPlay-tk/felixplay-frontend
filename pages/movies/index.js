import { useState } from "react";
import ContentCardSkaleton from "../../components/ContentCardSkaleton";
import ContentCard from "../../components/ContentCard";
import InfiniteScroll from "react-infinite-scroller";

const Movies = () => {
    const [items, setItems] = useState([]);
    const [hasNext, setHasNext] = useState(true);

    const fetchData = async (page) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/movies/all?page=${page}`
            );
            const data = await res.json();

            setHasNext(data.hasNext || false);
            setItems([...items, ...data.items]);
        } catch (error) {
            // console.log(error.message);
            return;
        }
    };

    return (
        <>
            <div className="py-2 lg:py-5 w-[95%] mx-auto px-4">
                <h1 className="text-md lg:text-lg font-semibold tracking-wide uppercase">
                    All Movies
                </h1>
            </div>

            <InfiniteScroll
                pageStart={0}
                loadMore={fetchData}
                hasMore={hasNext}
                loader={<ContentCardSkaleton key={0} />}
                className="mx-auto my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-[95%] px-4"
            >
                {!!items?.length &&
                    items.map((t) => <ContentCard item={t} key={t._id} />)}
            </InfiniteScroll>
        </>
    );
};

export default Movies;
