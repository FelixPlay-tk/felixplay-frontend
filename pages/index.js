import Head from "next/head";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
    return (
        <>
            <Head>
                <title>FelixPlay - Get Free HD Movies, Shows, Animes</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <h1>Hello World</h1>
        </>
    );
}
