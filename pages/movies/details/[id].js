import React from "react";
import ContentInfo from "../../../components/ContentInfo";

const Details = () => {
    return (
        <div className="bg-[url('https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black bg-opacity-90 backdrop-blur body-minimum-height">
                <ContentInfo />
            </div>
        </div>
    );
};

export default Details;
