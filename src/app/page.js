import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>
          We create digital ideas that are bigger, bolder, braver and better.
          We believe in good ideas flexibility and precission We’re world’s Our
          Special Team best consulting & finance solution provider.
       
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
    
      </div>
      <div className={styles.imgContainer}>
        {/* If you experience issues with the GIF in next/image, try using img tag */}
        <Image
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTZ6NTcwam40M3d1dGZpcm42eWpnNTQ0dWxsbmRuNHYzNHUzYTNnNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d3rYKAgSa6mD3gKpB1/giphy.gif"
          alt="Creative Thoughts Agency GIF"
          fill
          className={styles.heroImg}
        />
      </div>
    </div>
  );
};

export default Home;
