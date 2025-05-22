import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity }}
        >
          <motion.h1
            className={styles.title}
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          >
            Fama <span className={styles.highlight}>Barber Shop</span> &{" "}
            <span className={styles.highlight}>Beauty Salon</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Experience the art of barbering at Fama Barber Shop and Beauty
            Salon. Where every cut{" "}
            <span className={styles.emphasis}>tells a story</span>.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.a
              href="#contact"
              className={`btn ${styles.primaryBtn}`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 15px rgba(212, 175, 55, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
            <motion.a
              href="#services"
              className={`btn btn-outline ${styles.secondaryBtn}`}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ y }}
        >
          <div className={`${styles.image} ${styles.floatAnimation}`}>
            <div className={styles.imageOverlay}></div>
          </div>

          <motion.div
            className={styles.scissorsIcon}
            initial={{ rotate: -20 }}
            animate={{ rotate: 20 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="var(--primary-color)"
            >
              <path d="M8.1,15.9L4.2,12l3.9-3.9C7.6,7.5,7,7.2,6.5,7.1l-3.9,3.9l3.9,3.9C7,14.8,7.6,14.5,8.1,15.9z M17.5,7.1 c-0.5,0.1-1.1,0.4-1.6,0.9l3.9,3.9l-3.9,3.9c0.5,0.5,1.1,0.8,1.6,0.9l3.9-3.9L17.5,7.1z M12,16.5c-0.7,0-1.3-0.3-1.8-0.7 L6.4,12l3.9-3.9c0.5-0.5,1.1-0.7,1.8-0.7s1.3,0.3,1.8,0.7l3.9,3.9l-3.9,3.9C13.3,16.2,12.7,16.5,12,16.5z" />
            </svg>
          </motion.div>

          <motion.div
            className={styles.ratingBadge}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 1.2,
            }}
          >
            <span>★ 4.6</span>
            <small>116+ reviews</small>
          </motion.div>

          <motion.div
            className={styles.experience}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <small>Status</small>
            <span>Open</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>

      {/* <div className={styles.backgroundDecoration}></div> */}
    </section>
  );
};

export default Hero;
