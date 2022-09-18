import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";

import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from "../lib/video";

import { magic } from "../lib/magic-client";
import { GetServerSideProps } from "next";
import useRedirectUser from "../utils/redirectUser";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token, userId } = useRedirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  console.log({ token });
  const watchItAgainVideos = await getWatchItAgainVideos(token, userId);
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  return {
    props: {
      disneyVideos,
      watchItAgainVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
    },
  };
};

export default function Home({
  disneyVideos,
  watchItAgainVideos,
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
          videoId={"M7lc1UVf-VE"}
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
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
