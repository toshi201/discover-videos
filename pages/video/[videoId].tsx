import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";

import clsx from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { getYoutubeVideoById } from "../../lib/video";
import NavBar from "../../components/nav/navbar";
import Like from "../../components/icons/like-icons";
import DisLike from "../../components/icons/dislike-icon";

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
};

export const getStaticPaths: GetStaticPaths = async () => {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
};

const Video = (props: any) => {
  const router = useRouter();

  const videoId = router.query.videoId as string;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, settoggleDislike] = useState(false);
  const video = props.video;
  const { title, publishTime, description, channelTitle, statistics } = video;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json() as Array<any>;
      console.log({data});

      if (data.length > 0) {
        const favorited = data[0].favorited;
        if (favorited === 1) {
          setToggleLike(true);
        } else if (favorited === 0) {
          settoggleDislike(true);
        }
      }
    })();
  }, []);

  const runRatingService = async (favorited: number) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favorited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    settoggleDislike(toggleLike);
    console.log("like");

    const response = await runRatingService(val ? 1 : 0);

    console.log("data", await response.json());
  };

  const handleToggleDislike = async () => {
    settoggleDislike(!toggleDislike);
    setToggleLike(toggleDislike);
    console.log("dislike");
    const val = !toggleDislike;

    const response = await runRatingService(val ? 0 : 1);

    console.log("data", await response.json());
  };

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
            src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
            //          frameborder="0"
          ></iframe>

          <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button onClick={handleToggleLike}>
                <div className={styles.btnWrapper}>
                  <Like selected={toggleLike} />
                </div>
              </button>
              <button onClick={handleToggleDislike}>
                <div className={styles.btnWrapper}>
                  <DisLike selected={toggleDislike} />
                </div>
              </button>
            </div>
          </div>
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
                <span className={styles.channelTitle}>
                  {statistics.viewCount || "0"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
