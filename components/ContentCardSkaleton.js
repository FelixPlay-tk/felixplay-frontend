import React from "react";

const ContentCardSkaleton = () => {
    const items = Array.from({ length: 6 });
    return (
        <>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="bg-gray-900 rounded-lg animate-pulse aspect-video w-full"
                />
            ))}
        </>
    );
};

export default ContentCardSkaleton;
