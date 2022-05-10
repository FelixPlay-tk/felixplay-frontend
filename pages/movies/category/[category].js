import React from "react";
import CategoryList from "../../../components/CategoryList";

const Category = ({ category, data }) => {
    return (
        <CategoryList
            categoryItems={data}
            categoryName={`${category} Movies`}
        />
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
                data,
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
