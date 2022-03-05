import React from "react";
import Card from "./card";
import styles from "./section-cards.module.css";

type sectionCardsProps = {
  title: string;
  videos: any[];
  size: string;
};

const SectionCards = ({ title, videos = [], size }: sectionCardsProps) => {
  return (
    <section className="">
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return <Card id={idx} key={idx} imgUrl={video.imgUrl} size={size} />;
        })}
      </div>
    </section>
  );
};

export default SectionCards;
