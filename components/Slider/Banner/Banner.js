import Slider from "react-slick";
import SliderNextArrow from "../SliderNextArrow";
import SliderPrevArrow from "../SliderPrevArrow";
import BannerItem from "./BannerItem";

const Banner = ({ items }) => {
    const settings = {
        lazyLoad: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        speed: 700,
        focusOnSelect: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
    };

    return (
        <Slider {...settings}>
            {items?.map((item) => (
                <BannerItem key={item._id} item={item} />
            ))}
        </Slider>
    );
};

export default Banner;
