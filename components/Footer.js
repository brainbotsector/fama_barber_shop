import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.logoSection}>
            <h2 className={styles.logo}>
              <span>Fama</span> Barber Shop <span>&</span> Beauty Salon
            </h2>
            <p className={styles.tagline}>
              Precision cuts and style for the modern gentleman.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Quick Links</h3>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#gallery">Gallery</a>
                </li>
                <li>
                  <a href="#testimonials">Testimonials</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Services</h3>
              <ul>
                <li>
                  <a href="#services">Haircuts</a>
                </li>
                <li>
                  <a href="#services">Beard Trims</a>
                </li>
                <li>
                  <a href="#services">Hot Towel Shaves</a>
                </li>
                <li>
                  <a href="#services">Hair Coloring</a>
                </li>
                <li>
                  <a href="#services">Kids Cuts</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Contact</h3>
              <ul>
                <li>500 N Bell Ave #109</li>
                <li>Denton, TX 76209</li>
                <li>United States</li>
                <li>+1 940-612-9127</li>
                <li>info@famabarber.com</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} Fama Barber Shop and Beauty Salon.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;