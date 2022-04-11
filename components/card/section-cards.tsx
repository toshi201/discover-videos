import React from "react";
import Card from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";

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
          return (
            <Link href={`video/${video.id}`}>
              <a>
                <Card id={idx} key={idx} imgUrl={video.imgUrl} size={size} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
