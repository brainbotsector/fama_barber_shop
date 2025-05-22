import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import styles from './Services.module.css';
import { Scissors, Clock, Star, ChevronLeft, ChevronRight } from 'react-feather';

const services = [
  {
    title: 'Classic Haircut & Style',
    description: 'Traditional haircut with modern techniques for a clean, sharp look. Perfect for any occasion.',
    price: '$30',
    duration: '30 min',
    category: 'barber',
    icon: 'scissors',
    rating: 4.9
  },
  {
    title: 'Beard Trim & Shaping',
    description: 'Precision beard shaping and trimming to keep your facial hair looking sharp.',
    price: '$20',
    duration: '20 min',
    category: 'barber',
    icon: 'razor',
    rating: 4.8
  },
  {
    title: 'Hair & Beard Combo',
    description: 'Complete grooming package with haircut and beard trim. Save time and look great.',
    price: '$45',
    duration: '50 min',
    category: 'barber',
    icon: 'scissors',
    rating: 4.9
  },
  {
    title: 'Kids Cut & Style',
    description: 'Specialized haircuts for children in a comfortable environment. Fun and friendly service.',
    price: '$25',
    duration: '25 min',
    category: 'barber',
    icon: 'scissors',
    rating: 4.7
  },
  {
    title: 'Hair Coloring & Highlights',
    description: 'Professional hair coloring services to refresh your look. Choose from a variety of shades.',
    price: '$60+',
    duration: '1.5 hrs',
    category: 'both',
    icon: 'color',
    rating: 4.8
  },
  {
    title: 'Facial Treatment & Massage',
    description: 'Revitalizing facial treatment customized for your skin type. Relax and rejuvenate.',
    price: '$55',
    duration: '45 min',
    category: 'beauty',
    icon: 'face',
    rating: 4.9
  },
];

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory || service.category === 'both');

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === filteredServices.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? filteredServices.length - 1 : prev - 1
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'scissors':
        return <Scissors className={styles.serviceIcon} size={24} />;
      default:
        return <Star className={styles.serviceIcon} size={24} />;
    }
  };

  const renderServiceCard = (service, index) => (
    <motion.div
      key={service.title}
      className={styles.card}
      variants={item}
      whileHover={{ 
        y: -15, 
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setHoveredCard(service.title)}
      onHoverEnd={() => setHoveredCard(null)}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            {renderIcon(service.icon)}
          </div>
          <h3 className={styles.cardTitle}>{service.title}</h3>
        </div>
        
        <p className={styles.cardDescription}>{service.description}</p>
        
        <div className={styles.cardFooter}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{service.price}</span>
          </div>
          <div className={styles.durationContainer}>
            <Clock size={16} />
            <span className={styles.duration}>{service.duration}</span>
          </div>
        </div>
        

        
        <motion.div 
          className={styles.bookNowBtn}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={hoveredCard === service.title ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          Book Now
        </motion.div>
      </div>
      
      <div className={styles.cardGlow} />
    </motion.div>
  );

  return (
    <section id="services" className={styles.services} ref={ref}>
      <div className={styles.backgroundDecoration}></div>
      
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className={styles.sectionTitle}>Our <span className={styles.highlight}>Premium</span> Services</h2>
            <p className={styles.sectionSubtitle}>Experience excellence in grooming and beauty with our comprehensive range of services</p>
          </motion.div>
          
          <motion.div 
            className={styles.categoryTabs}
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Services
            </button>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'barber' ? styles.active : ''}`}
              onClick={() => setActiveCategory('barber')}
            >
              Barber
            </button>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'beauty' ? styles.active : ''}`}
              onClick={() => setActiveCategory('beauty')}
            >
              Beauty
            </button>
          </motion.div>
        </div>
        
  
        {!isMobile && (
          <motion.div 
            className={styles.grid}
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {filteredServices.map((service, index) => renderServiceCard(service, index))}
          </motion.div>
        )}

        {isMobile && (
          <div className={styles.mobileCarousel}>
            <motion.div 
              className={styles.carouselContainer}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <div className={styles.carouselTrack}>
                {filteredServices.map((service, index) => (
                  <div
                    key={service.title}
                    className={`${styles.slideWrapper} ${index === currentSlide ? styles.activeSlide : ''}`}
                    style={{
                      transform: `translateX(${(index - currentSlide) * 100}%)`,
                      opacity: index === currentSlide ? 1 : 0.3
                    }}
                  >
                    {renderServiceCard(service, index)}
                  </div>
                ))}
              </div>
            </motion.div>


            <div className={styles.carouselIndicators}>
              {filteredServices.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

       
            <div className={styles.carouselNavigation}>
              <button 
                className={styles.navButton}
                onClick={prevSlide}
                disabled={filteredServices.length <= 1}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className={styles.navButton}
                onClick={nextSlide}
                disabled={filteredServices.length <= 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <motion.div 
        className={styles.decorationCircle1}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
      
      <motion.div 
        className={styles.decorationCircle2}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.05 } : {}}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
      />
    </section>
  );
};

export default Services;