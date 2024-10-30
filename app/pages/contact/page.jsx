/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Header from "../../../components/header/header";
import { SocialMedia } from "../../../constants";
import localFont from "next/font/local";

const popinsFont = localFont({
    src: "../../fonts/Poppins-Variable.ttf"
});

const images = [
  "1.png", "2.png", "11.jpg", "3.png", "4.png", "5.jpg", 
  "6.jpg", "1.jpg", "8.jpg", "9.jpg", "10.jpg", "12.jpg"
];

export default function Home() {
  const picAniamtion = useRef(null);
  const menuAnimation = useRef(null);
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      picAniamtion.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 2, ease: "power2.out" }
    );
    tl.fromTo(
      menuAnimation.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  });

  return (
    <main className={styles.main}>
      <div className="flex py-5 px-11 fixed z-10 items-center justify-between w-full">
        <Link
          href="/"
          className="cursor-pointer text-2xl text-white font-extrabold uppercase"
          ref={picAniamtion}
        >
          <Image
            src="/images/m4.png"
            alt="logo dev"
            width={70}
            height={70}
            className="rounded-full"
          />
        </Link>
        <div ref={menuAnimation}>
          <Header />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-60">
        <p className={`text-white text-lg mb-4 ${popinsFont.className}`}>
          Vous avez des questions ou vous souhaitez travailler ensemble ?
        </p>
        <p className="text-white text-lg">
          N'hésitez pas à me contacter à l'adresse suivante :
        </p>
        <Link
          href="mailto:m3dev4@example.com"
          className="text-white text-lg underline cursor-pointer"
        >
          m3dev4@example.com
        </Link>
      </div>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className={styles.spacer}></div>
      <div className="flex w-full h-full relative -top-32 px-5">
        <div className="flex items-center justify-between w-full px-9">
          <div>
            <p className={`${popinsFont.className} text-white font-semibold`}>
              Local Time: {localTime}
            </p>
            <p className={`${popinsFont.className} text-white font-semibold`}>
              © 2024 Mouhamed Lo. All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            {SocialMedia.map((media) => (
              <div key={media} className="flex gap-10">
                <Link href={media.href}>
                  <Image
                    src={media.img}
                    alt={media.href}
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <Image src={`/images/${src}`} alt="image" fill />
          </div>
        );
      })}
    </motion.div>
  );
};
