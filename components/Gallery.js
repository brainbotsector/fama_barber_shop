import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Gallery.module.css';
import Image from 'next/image';
const images = [
  { src: '/assets/images/barber-shop-interior.jpeg', alt: 'Barber shop' },
  { src: '/assets/images/barber-tools.jpg', alt: 'Barber tools' },
  { src: '/assets/images/fade-haircut.jpg', alt: 'Fade haircut' },
  { src: '/assets/images/beird-styles.jpg', alt: 'Beird Styles' },
  { src: '/assets/images/hair-color.jpg', alt: 'Hair Coloring' },
  { src: '/assets/images/barber-chair.jpeg', alt: 'Chair' },
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [is3DView, setIs3DView] = useState(true);
  const scrollRef = useRef(null);
  const controls = useAnimation();
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const switchView = () => {
    setIs3DView(!is3DView);
  };

  return (
    <section id="gallery" className={styles.gallery} ref={ref}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>
            Our <span className={styles.highlight}>Gallery</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Showcasing our artistry and passion for crafting stylish looks
          </p>

        </motion.div>
        
        {is3DView ? (
          <>
            <div className={styles.showcase}>
              <button className={styles.navButton} onClick={prevSlide}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <motion.div 
                className={styles.carousel3D}
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {images.map((image, index) => {
                  // Calculate rotation for 3D effect
                  const distance = Math.abs(activeIndex - index);
                  const isActive = index === activeIndex;
                  const isNext = (activeIndex + 1) % images.length === index;
                  const isPrev = activeIndex === 0 ? index === images.length - 1 : activeIndex - 1 === index;
                  
                  let zIndex = images.length - distance;
                  let opacity = 1 - (distance * 0.2);
                  let rotateY = 0;
                  let translateX = 0;
                  
                  if (index < activeIndex) {
                    rotateY = 45;
                    translateX = -140;
                  } else if (index > activeIndex) {
                    rotateY = -45;
                    translateX = 140;
                  }
                  
                  if (distance > 2) {
                    opacity = 0;
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      className={`${styles.imageCard} ${isActive ? styles.activeCard : ''}`}
                      initial="hidden"
                      animate={inView ? {
                        rotateY: rotateY,
                        x: translateX,
                        opacity: opacity,
                        scale: isActive ? 1 : 0.8,
                        zIndex: zIndex
                      } : {}}
                      transition={{ 
                        duration: 0.8, 
                        type: "spring", 
                        stiffness: 100 
                      }}
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ scale: isActive ? 1.05 : 0.85 }}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <div className={styles.imageCardInner}>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            className={styles.image}
                            loading="lazy"
                          />
                          <div className={styles.overlay}>
                            <div className={styles.imageCaption}>
                              <h3>{image.alt}</h3>
                              <div className={styles.iconRow}>
                                <span className={styles.icon}>
                                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                  </svg>
                                  Premium Salon
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {isActive && hoveredIndex === index && (
                        <motion.div 
                          className={styles.cardDetails}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <button className={styles.detailsBtn}>View Details</button>
                        </motion.div>
                      )}
                      
                      <div className={styles.cardReflection}></div>
                    </motion.div>
                  );
                })}
              </motion.div>
              
              <button className={styles.navButton} onClick={nextSlide}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className={styles.dotIndicators}>
              {images.map((_, index) => (
                <button 
                  key={index} 
                  className={`${styles.dotIndicator} ${index === activeIndex ? styles.activeDot : ''}`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
          </>
        ) : (
          <motion.div 
            className={styles.gridView}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate={controls}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={styles.gridItem}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10, 
                  boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                }}
              >
                <div className={styles.gridImageContainer}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className={styles.gridImage}
                    loading="lazy"
                  />
                  <div className={styles.gridOverlay}>
                    <div className={styles.overlayContent}>
                      <h3>{image.alt}</h3>
                      <button className={styles.viewDetailsBtn}>View Details</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      <div className={styles.decorationCircle1}></div>
      <div className={styles.decorationCircle2}></div>
    </section>
  );
};

export default Gallery;

