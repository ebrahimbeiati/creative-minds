import Image from "next/image";
import styles from "./About.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};

const AboutPage = () => {
  // console.log("lets check where it works")
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Us</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better.
        </h1>
        <p className={styles.desc}>
          We create digital ideas that are bigger, bolder, braver and better. We
          believe in good ideas flexibility and precission We’re world’s Our
          Special Team best consulting & finance solution provider. Wide range
          of web and software development services.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>1000</h1>
            <p>Employee</p>
          </div>
          <div className={styles.box}>
            <h1>20 K+</h1>
            <p>Customers</p>
          </div>
          <div className={styles.box}>
            <h1>30 K+</h1>
            <p>Hours of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="About Image"  fill className={styles.img} />
      </div>
    </div>
  );
};

export default AboutPage;
