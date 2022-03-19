import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { magic } from "../../lib/magic-client";
import styles from "./navbar.module.css";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const fetch_username = async () => {
        if (!magic) {
          return;
        }
        const data = await magic.user.getMetadata();
        const { email } = data;
        setUsername(email || "");
      };
      fetch_username();
    } catch (error) {
      console.error("Error retreving email", error);
    }
  }, []);

  const handleOnClickHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!magic) {
      return;
    }

    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      router.push("/login");
    } catch (error) {
      console.error("error retrieving email", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>Netflix</div>
        </a>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more_white_24dp.svg"
                alt="expand"
                width="24px"
                height="24px"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.link} onClick={handleSignOut}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
