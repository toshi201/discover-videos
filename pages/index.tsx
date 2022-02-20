import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import Card from "../components/card/card";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Netflixapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="aaaaa@bbb.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
      />

      <Card imgUrl="/static/sample.png" size="large" />
      <Card imgUrl="/static/fff" size="medium" />
      <Card imgUrl="/static/sample.png" size="small" />
    </div>
  );
}
