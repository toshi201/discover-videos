import { useRouter } from "next/router";
import React from "react";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";

import clsx from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { getYoutubeVideoById } from "../../lib/video";
import NavBar from "../../components/nav/navbar";

Modal.setAppElement("#__next");

export const getStaticProps: GetStaticProps = async (context) => {
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();

  const videoId = context.params?.videoId as string;
  const videoArray = await getYoutubeVideoById(videoId);
  //console.log("videoArr ", videoArray);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
};

const Video = (props: any) => {
  const router = useRouter();
  const video = props.video;
  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics,
  } = video;

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => {
          router.back();
        }}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>
          <iframe
            id="player"
            //            type=""
            className={styles.videoPlayer}
            width="100%"
            height="360"
            src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
            //          frameborder="0"
          ></iframe>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{statistics.viewCount || "0" }</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
