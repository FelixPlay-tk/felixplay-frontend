import { useState } from "react";
import CategoryItem from "./CategoryItem";

const CategoryList = ({ categoryName, categoryItems }) => {
    const [items, setItems] = useState(categoryItems);
    return (
        <div className="px-4 ">
            <div className="mt-2 lg:mt-5 w-[95%] mx-auto">
                <h1 className="text-md lg:text-lg font-semibold tracking-wide uppercase">
                    {categoryName}
                </h1>
            </div>
            {!!items?.length && (
                <div className="mx-auto my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-[95%] ">
                    {items.map((t) => (
                        <CategoryItem item={t} key={t._id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
