import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const SplitParagraphsAnimation = () => {
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
            ease: "power3.out",
            stagger: 0.1,
          }
        );
    });
  };

  useEffect(() => {
    splitTextAndAnimate();
  }, []);

  return null;
};

export default SplitParagraphsAnimation;