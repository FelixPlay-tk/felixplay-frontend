import React from "react";

const Details = () => {
    return <div>Details</div>;
};

export default Details;

export async function getServerSideProps(ctx) {
    return {
        props: {
            name: "new",
        },
    };
}
