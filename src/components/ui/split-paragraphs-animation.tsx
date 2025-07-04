import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const SplitParagraphsAnimation = ({ watchKey }: { watchKey: string }) => {
  const splitTextAndAnimate = () => {
    const paragraphs = document.querySelectorAll(
      '[gsap-target="paragraph-1"]'
    ) as NodeListOf<HTMLElement>;

    paragraphs.forEach((paragraph) => {
      const splitText = new SplitType(paragraph as HTMLElement, {
        types: "lines",
      });
      const lines = splitText.lines;

      gsap.set(lines, { y: "2rem", opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: paragraph,
            start: "top 95%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        })
        .fromTo(
          lines,
          { y: "2rem", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
          }
        );
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      splitTextAndAnimate();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [watchKey]);

  useEffect(() => {
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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
};

export default SplitParagraphsAnimation;
