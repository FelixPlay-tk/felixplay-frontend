import Slider from "react-slick";

function Skaleton() {
    const items = Array.from({ length: 20 });

    const settings = {
        dots: false,
        slidesToShow: 8,
        slidesToScroll: 0,
        infinite: false,
        arrows: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };
    return (
        <div className="lg:mx-2">
            <div className="pt-5"></div>
            <Slider {...settings}>
                {items.map((itm, idx) => (
                    <div className="p-1 lg:p-2" key={idx}>
                        <div className="bg-gray-900 pb-[75%] pt-[75%] animate-pulse rounded-lg mx-1 lg:mx-2"></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Skaleton;
