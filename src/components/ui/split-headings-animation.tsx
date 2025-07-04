import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const SplitHeadingsAnimation = () => {
  const splitTextAndAnimate = () => {
    const headings = document.querySelectorAll('[gsap-target="heading-1"]');

    if (headings.length > 0) {
      headings.forEach((heading) => {
        const splitText = new SplitType(heading as HTMLElement, { types: 'words' });
        const words = splitText.words;

        gsap.set(words, {
          y: "2rem", 
          opacity: 0,
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top 95%", 
            end: "bottom 20%",
            toggleActions: "play none none reverse", 
            markers: false,
          },
        })
        .fromTo(
          words,
          {
            y: "2rem",
            opacity: 0,
          },
          {
            y: "0",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
          }
        );
      });
    }
  };

  useEffect(() => {
    splitTextAndAnimate();

    let resizeTimeout: NodeJS.Timeout;
    let lastWindowWidth = window.innerWidth;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth !== lastWindowWidth) {
          lastWindowWidth = window.innerWidth;
          splitTextAndAnimate();
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

export default SplitHeadingsAnimation;