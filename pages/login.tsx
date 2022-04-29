import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMsg("");
    //console.log("event", e);
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (email) {
      //      if (email === "aquaconner8@gmail.com") {
      // router.push("/");
      try {
        setIsLoading(true);
        if (magic) {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log({ didToken });
          if (didToken) {
            const response = await fetch("/api/login", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${didToken}`,
                "Content-Type": "application/json",
              },
            });

            const loggedInResponse = await response.json();
            if (loggedInResponse.done) {
              console.log({ loggedInResponse });
              router.push("/");
            } else {
              setIsLoading(false);
              setUserMsg("Something went wrong");
            }
            //router.push("/");
          }
        }
      } catch (error) {
        console.error("Something went wrong logging", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setUserMsg("Something went wrong logging in");
    }
    // } else {
    //   // show user
    //   setIsLoading(false);
    //   setUserMsg("Enter a valid email address");
    // }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Signin</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>Netflix</div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading" : "Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
