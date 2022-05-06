import Slider from "react-slick";
import SliderNextArrow from "../SliderNextArrow";
import SliderPrevArrow from "../SliderPrevArrow";
import RowItem from "./RowItem";

const RowSlider = ({ items }) => {
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
    <Slider {...settings}>
      {items?.map((item) => (
        <RowItem key={item._id} item={item} />
      ))}
    </Slider>
  );
};

export default RowSlider;
