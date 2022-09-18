import Head from "next/head";
import React from "react";
import SectionCards from "../../components/card/section-cards";
import NavBar from "../../components/nav/navbar";

const MyList = () => {
  return (
    <div>
      <Head>
        <title>MyList</title>
      </Head>
      <main>
        <NavBar />
        <div>
          <SectionCards title="My List" videos={[]} size="small" />
        </div>
      </main>
    </div>
  );
};

export default MyList;
