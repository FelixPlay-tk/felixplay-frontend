import Banner from "../../components/Slider/Banner/Banner";
import RowSlider from "../../components/Slider/Row/RowSlider";

const Movies = ({ movieBanner, movieRows }) => {
    return (
        <>
            <section className="w-full to-pink-600">
                {movieBanner && <Banner items={movieBanner} />}
            </section>

            <section className="space-y-5 mt-5 m-2 lg:m-4">
                {movieRows?.map((row) => (
                    <RowSlider key={row.id} row={row} />
                ))}
            </section>
        </>
    );
};

export default Movies;

export async function getStaticProps(context) {
    const response = await fetch(`${process.env.SSR_URL}/movies`);
    const movies = await response.json();

    return {
        props: {
            movieBanner: movies?.movieBanner?.items,
            movieRows: movies?.movieRows,
        },
    };
}
