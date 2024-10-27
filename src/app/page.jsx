"use client";
import Image from "next/image";
import styles from "./home.module.css";
import {  useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

if (!isLoaded || !isSignedIn) {
  return null;
}

  // useEffect(() => {

  //   if (user) {
  //     fetch("/api/auth", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         userId: user.id,
  //         email: user.primaryEmailAddress?.emailAddress,
  //         avatarUrl: user.imageUrl,
  //       }),
  //     });
  //   }
  // }, [user]);

  return (
    <div></div>
    // <div className={styles.container}>
    //   <div className={styles.textContainer}>
    //     <div>Hello, {user.firstName}</div>

    //     <h1 className={styles.title}>Creative Thoughts Agency.</h1>
    //     <p className={styles.desc}>
    //       We create digital ideas that are bigger, bolder, braver and better. We
    //       believe in good ideas, flexibility, and precision. We’re the world’s
    //       best consulting & finance solution provider.
    //     </p>
    //   </div>
    //   <div className={styles.imgContainer}>
    //     <Image
    //       src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTZ6NTcwam40M3d1dGZpcm42eWpnNTQ0dWxsbmRuNHYzNHUzYTNnNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d3rYKAgSa6mD3gKpB1/giphy.gif"
    //       alt="Creative Thoughts Agency GIF"
    //       fill
    //       className={styles.heroImg}
    //     />
    //   </div>
    // </div>
  );
};

export default Home;
