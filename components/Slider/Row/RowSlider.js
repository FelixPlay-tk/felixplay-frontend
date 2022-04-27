import Slider from "react-slick";
import { motion } from "framer-motion";
import SliderNextArrow from "../SliderNextArrow";
import SliderPrevArrow from "../SliderPrevArrow";
import RowItem from "./RowItem";
import { items } from "../../../Data/data";
import Link from "next/link";
import {
    ChevronDoubleRightIcon,
    ChevronRightIcon,
} from "@heroicons/react/solid";

const RowSlider = ({ row }) => {
    // const { title, hasMore, items } = row;
    const { title, hasMore, link } = row;

    const settings = {
        dots: false,
        slidesToShow: 8,
        slidesToScroll: 8,
        infinite: false,
        speed: 500,
        nextArrow: <SliderNextArrow />,
        prevArrow: <SliderPrevArrow />,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    arrows: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    arrows: false,
                },
            },
        ],
    };
    return (
        items &&
        items.length > 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="space-y-2"
            >
                <div className="flex items-center justify-between font-semibold mx-1 lg:mx-2">
                    <h2 className="text-lg lg:text-xl font-semibold capitalize">
                        {title}
                    </h2>

                    {hasMore && (
                        <Link href={link}>
                            <a className="flex items-center text-sm lg:text-base text-pink-600 hover:underline">
                                <span>See more</span>
                                <ChevronDoubleRightIcon className="h-4 lg:h-5" />
                            </a>
                        </Link>
                    )}
                </div>

                <div>
                    <Slider {...settings}>
                        {items.map((item) => (
                            <RowItem key={item._id} item={item} />
                        ))}
                    </Slider>
                </div>
            </motion.div>
        )
    );
};

export default RowSlider;
