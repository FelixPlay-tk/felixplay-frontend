import { useEffect, useState } from "react";
import ContentCard from "../../../components/ContentCard";

const Category = ({ category, data }) => {
    const [items, setItems] = useState(data);

    useEffect(() => {}, []);

    return (
        <div className="px-4">
            <div className="mt-2 lg:mt-5 w-[95%] mx-auto">
                <h1 className="text-md lg:text-lg font-semibold tracking-wide uppercase">
                    {category} Movies
                </h1>
            </div>
            {!!items?.length && (
                <div className="mx-auto my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-[95%] ">
                    {data.map((t) => (
                        <ContentCard item={t} key={t._id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;

export async function getStaticProps(context) {
    try {
        const res = await fetch(
            `${process.env.SSR_URL}/movies/category/${context.params.category}`
        );
        const data = await res.json();

        return {
            props: {
                category: context.params.category,
                data,
            },
        };
    } catch (error) {
        return {
            props: {
                category: context.params.category,
                data: [],
            },
        };
    }
}

export async function getStaticPaths() {
    const response = await fetch(`${process.env.SSR_URL}/categories/movies`);
    const categories = await response.json();

    const paths = categories.map(({ name }) => ({
        params: { category: name },
    }));

    return {
        paths,
        fallback: "blocking",
    };
}
