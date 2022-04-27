import { ChevronRightIcon } from "@heroicons/react/solid";

const SliderNextArrow = ({ className, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            <ChevronRightIcon />
        </button>
    );
};

export default SliderNextArrow;
