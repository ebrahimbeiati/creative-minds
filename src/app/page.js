import styles from './Home.module.css'
import Image from 'next/image'
const Home = () => {

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Welcome to our agency
        </h1>
        <p className={styles.desc}>
          We create digital ideas that are bigger, bolder, braver and better.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>
            Contact
          </button>
          <button className={styles.button}>
            Learn More
          </button>
        </div>
        <div>
          <Image src="/brands.png" alt="Home Image" fill className={styles.brandImg} />
     </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/home.png" alt="Home Image" fill className={styles.homeImg} />
      </div>
    </div>
  )
  
}