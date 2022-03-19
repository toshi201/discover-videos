import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import { useRouter } from "next/router";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!magic) {
        return;
      }
      const user = await magic.user;
      console.log({ user });
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    })();
  }, []);

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

  // if loggedin
  // router to /
  // else
  // router to /login
  return <>{isLoading ? <Loading /> : <Component {...pageProps} />}</>;
}
export default MyApp;
