import React from "react";

const Category = ({ category }) => {
    return <div>{/* {category} */}</div>;
};

export default Category;

// export async function getStaticProps(context) {
//     return {
//         props: {
//             category: context.params.category,
//         },
//     };
// }

// export async function getStaticPaths() {
//     const response = await fetch(`${process.env.SSR_URL}/categories/movies`);
//     const categories = await response.json();

//     console.log(categories);

//     // { params: { category: "comedy" } }
//     const paths = categories.map(({ name }) => ({
//         params: { category: name },
//     }));

//     return {
//         paths,
//         fallback: "blocking",
//     };
// }
