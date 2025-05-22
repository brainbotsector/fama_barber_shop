import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = ['home', 'services', 'gallery', 'testimonials', 'contact'];
      const currentPosition = window.scrollY + 300;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveLink(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home', icon: 'home' },
    { name: 'Services', href: '#services', icon: 'scissors' },
    { name: 'Gallery', href: '#gallery', icon: 'image' },
    { name: 'Testimonials', href: '#testimonials', icon: 'star' },
    { name: 'Contact', href: '#contact', icon: 'phone' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const section = href.replace('#', '');
    setActiveLink(section);
    
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    
    if (isOpen) setIsOpen(false);
  };

  
  const navAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const logoAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <motion.nav
      ref={navbarRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial="hidden"
      animate="visible"
      variants={navAnimation}
    >
      <div className={styles.container}>
        <motion.div 
          variants={logoAnimation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="#home" className={styles.logo} onClick={(e) => handleLinkClick(e, '#home')}>
            {/* Logo image instead of text */}
            <Image 
              src="/assets/images/logo.png" 
              alt="Fama Barber Logo" 
              width={150} 
              height={50} 
              className={styles.logoImage}
            />
          </Link>
        </motion.div>

        <div className={styles.desktopMenu}>
          <motion.ul className={styles.navLinks} variants={navAnimation}>
            {navItems.map((item) => (
              <motion.li key={item.name} variants={itemAnimation}>
                <Link 
                  href={item.href}
                  className={`${styles.navLink} ${activeLink === item.href.replace('#', '') ? styles.active : ''}`}
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.navLinkContent}
                  >
                    
                    {item.name}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={itemAnimation}>
            <ThemeToggle />
          </motion.div>
          <motion.button 
            variants={itemAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.bookNowBtn}
          >
            Book Now
          </motion.button>
        </div>

        <motion.button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          variants={itemAnimation}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileMenuBackground} />
            <ul className={styles.mobileNavLinks}>
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: navItems.indexOf(item) * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <Link
                    href={item.href}
                    className={`${styles.mobileNavLink} ${activeLink === item.href.replace('#', '') ? styles.active : ''}`}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    <span className={styles.mobileNavIcon}>
                      {item.icon === 'home' && '🏠'}
                      {item.icon === 'scissors' && '✂️'}
                      {item.icon === 'image' && '🖼️'}
                      {item.icon === 'star' && '⭐'}
                      {item.icon === 'phone' && '📞'}
                    </span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className={styles.mobileActions}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className={styles.mobileThemeToggle}>
                <ThemeToggle />
              </div>
              <motion.button 
                className={styles.mobileBookNowBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;