import Image from "next/image";
import React, { useState } from "react";
import styles from "./card.module.css";

import { motion } from "framer-motion";
import cls from "classnames";

type CardProps = {
  imgUrl?: string;
  size?: string;
  id?: number;
};

const defaultImgUrl =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80";

const Card = ({id, imgUrl = defaultImgUrl, size = "medium" }: CardProps) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnErrror = () => {
    console.log("Hi error");
    setImgSrc(defaultImgUrl);
  };

  const scale = id === 0 ? {scaleY: 1.1} : {scale: 1.1}
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(
          styles.imgMotionWrapper,
          classMap[size as keyof typeof classMap]
        )}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          layout="fill"
          onError={handleOnErrror}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
