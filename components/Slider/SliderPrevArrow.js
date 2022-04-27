import { ChevronLeftIcon } from "@heroicons/react/solid";

const SliderPrevArrow = ({ onClick, className }) => {
    return (
        <button onClick={onClick} className={className}>
            <ChevronLeftIcon />
        </button>
    );
};

export default SliderPrevArrow;
