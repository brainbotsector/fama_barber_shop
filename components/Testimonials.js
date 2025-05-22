import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Chris Taylor',
    role: 'Regular Client',
    content:
      'Costly compared to other barbershops with better haircuts.',
    rating: 5,
    avatar: 'assets/images/client1.jpg', 
  },
  {
    name: 'David Mart',
    role: 'New Client',
    content:
      'Fama Barber Shop provides the best haircut in Denton. Highly recommended!',
    rating: 4,
    avatar: 'assets/images/client2.jpg',
  },
  {
    name: 'Mich John',
    role: 'Long-time Client',
    content:
      "I've been coming here for years. Consistent quality and friendly staff.",
    rating: 5,
    avatar: 'assets/images/client3.jpg',
  },
];

const Testimonials = () => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Auto-rotate through testimonials
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView]);

  const handlePrev = () => {
    setActiveTestimonialIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveTestimonialIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setActiveTestimonialIndex(index);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const quoteVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.5 } }
  };

  return (
    <section id="testimonials" className={styles.testimonials} ref={ref}>
      <div className={styles.backgroundDecoration}></div>
      <div className={styles.decorationCircle1}></div>
      <div className={styles.decorationCircle2}></div>
      
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Client <span className={styles.highlight}>Testimonials</span>
          </h2>
          <p className={styles.sectionSubtitle}>
           {"Don't just take our word for it - hear what our satisfied have to say about their experience at Fama Barber Shop"}
          </p>
        </div>

        <div className={styles.testimonialShowcase}>
          <div className={styles.testimonialCarousel}>
            <button 
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            <div className={styles.carouselContainer}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`${styles.testimonialCard} ${activeTestimonialIndex === index ? styles.active : ''}`}
                  initial="hidden"
                  animate={activeTestimonialIndex === index ? "visible" : "hidden"}
                  variants={cardVariants}
                  transition={{ duration: 0.6, type: "spring" }}
                >

                  
                  <div className={styles.testimonialContent}>
                    <p className={styles.content}>{testimonial.content}</p>
                    
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < testimonial.rating ? styles.filled : styles.unfilled}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.clientInfo}>
                    <div className={styles.avatarContainer}>
                      <div className={styles.avatar}>
                      
                        {testimonial.avatar ? (
                          <img src={testimonial.avatar} alt={testimonial.name} />
                        ) : (
                          <div className={styles.initials}>
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>
                      <div className={styles.glowEffect}></div>
                    </div>
                    
                    <div className={styles.clientDetails}>
                      <h4 className={styles.name}>{testimonial.name}</h4>
                      <p className={styles.role}>{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button 
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className={styles.carouselDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselDot} ${
                  activeTestimonialIndex === index ? styles.activeDot : ''
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.callToAction}>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>Ready for a premium barber experience?</h3>
            <button className={styles.bookBtn}>Book an Appointment</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
