import React from "react";

const Language = ({ language }) => {
    return <div></div>;
};

export default Language;

// export async function getStaticProps(context) {
//     return {
//         props: {
//             language: context.params.language,
//         },
//         revalidate: 3600,
//     };
// }

// export async function getStaticPaths() {
//     const paths = [
//         { params: { language: "bengali" } },
//         { params: { language: "hindi" } },
//         { params: { language: "english" } },
//     ];

//     return {
//         paths,
//         fallback: false,
//     };
// }
