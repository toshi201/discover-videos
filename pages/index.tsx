import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";

import { getPopularVideos, getVideos } from "../lib/video";

import { magic } from "../lib/magic-client";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos("");
  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}: any) {
  return (
    <div>
      <Head>
        <title>Netflixapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Popular Videos"
            videos={popularVideos}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
