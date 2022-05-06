/* eslint-disable @next/next/no-img-element */
import React from "react";
import CategoryList from "../../../components/CategoryList";

const Language = ({ language, data }) => {
    return <CategoryList categoryName={language} categoryItems={data} />;
};

export default Language;

export async function getStaticProps(context) {
    try {
        const res = await fetch(
            `${process.env.SSR_URL}/movies/language/${context.params.language}`
        );

        const data = await res.json();

        return {
            props: {
                language: context.params.language,
                data: data,
            },

            revalidate: 3600,
        };
    } catch (error) {
        return {
            props: {
                language: context.params.language,
                data: null,
            },
            revalidate: 3600,
        };
    }
}

export async function getStaticPaths() {
    const paths = [
        { params: { language: "bengali" } },
        { params: { language: "hindi" } },
        { params: { language: "english" } },
    ];

    return {
        paths,
        fallback: false,
    };
}
