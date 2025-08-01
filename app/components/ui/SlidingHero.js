"use client";

import Image from "next/image";
import HeroImage from "@/public/images/registerHero.jpg";
import ProductImage from "@/public/images/productsHero.jpg";
import CoachImage from "@/public/images/coachHero.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
function SlidingHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "آموزش شنا حرفه‌ای",
      subtitle: "با آرمان داریوشی",
      ctaText: "ثبت‌ نام در کلاس شنا",
      ctaLink: "/register",
      bgColor: "bg-primary hover:bg-primary-dark",
      imagesrc: HeroImage,
    },
    {
      id: 1,
      title: "تجهیزات شنا با کیفیت",
      subtitle: "مایو، عینک، فین و تجهیزات حرفه‌ای",
      ctaText: "مشاهده محصولات",
      ctaLink: "/products",
      bgColor: "bg-green-600 hover:bg-green-700",
      imagesrc: ProductImage,
    },
    {
      id: 2,
      title: "آموزش و راهنمایی تخصصی",
      subtitle: "تکنیک‌ها، نکات ایمنی و مقالات آموزشی",
      ctaText: "مطالعه راهنماها",
      ctaLink: "/articles",
      bgColor: "bg-purple-600 hover:bg-purple-700",
      imagesrc: CoachImage,
    },
  ];

  const getTransform = (slideIndex) => {
    if (slideIndex === currentSlide) {
      return "translate-x-0";
    } else if (slideIndex > currentSlide) {
      return "translate-x-full";
    } else {
      return "translate-x-[-100%]";
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <main>
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Slides with map */}
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            className={`inset-0 flex justify-center items-center flex-col absolute  h-[70vh] text-center overflow-hidden transition-transform transform ease-in-out duration-1000 ${getTransform(
              index
            )}`}
          >
            <div className="top-0 left-0 absolute w-full h-full -z-10">
              <Image
                src={slide.imagesrc}
                alt="Swimmer"
                fill
                className="object-cover"
                quality={80}
                placeholder="blur"
              />
            </div>
            <div className="bg-black bg-opacity-70 absolute top-0 left-0 w-full h-full -z-5"></div>
            <div className="relative z-10 text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
              <Link
                href={slide.ctaLink}
                className={`text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors ${slide.bgColor}`}
              >
                {slide.ctaText}
              </Link>
            </div>
          </section>
        ))}
        {/* Slides with each section */}
        {/* <section
          className={`inset-0 flex justify-center items-center flex-col absolute  h-[70vh] text-center overflow-hidden transition-transform transform ease-in-out duration-1000
            ${currentSlide === 0 ? "translate-x-0" : "translate-x-[-100%]"}  `}
        >
          <div className="top-0 left-0 absolute w-full h-full -z-10">
            <Image
              src={HeroImage}
              alt="Swimmer"
              fill
              className="object-cover"
              quality={80}
              placeholder="blur"
            />
          </div>
          <div className="bg-black bg-opacity-70 absolute top-0 left-0 w-full h-full -z-5"></div>
          <div className="relative z-10 text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
              آموزش شنا حرفه‌ای
            </h1>
            <p className="text-xl md:text-2xl mb-8">با آرمان داریوشی</p>
            <Link
              href="/products"
              className="text-white bg-primary hover:bg-primary-dark px-8 py-4 rounded-lg text-lg font-semibold  transition-colors"
            >
              ثبت‌ نام در کلاس شنا
            </Link>
          </div>
        </section> */}
        {/* Slide 2: Products   */}
        {/* <section
          className={`inset-0 flex justify-center items-center flex-col absolute  h-[70vh] text-center overflow-hidden transition-transform transform ease-in-out duration-1000
             ${
               currentSlide === 1
                 ? "translate-x-0"
                 : currentSlide === 0
                 ? "translate-x-full"
                 : "translate-x-[-100%]"
             }  `}
        >
          <div className="top-0 left-0 absolute w-full h-full -z-10">
            <Image
              src={HeroImage}
              alt="Swimmer"
              fill
              className="object-cover"
              quality={80}
              placeholder="blur"
            />
          </div>
          <div className="bg-black bg-opacity-70 absolute top-0 left-0 w-full h-full -z-5"></div>
          <div className="relative z-10 text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              تجهیزات شنا با کیفیت
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              مایو، عینک، فین و تجهیزات حرفه‌ای
            </p>
            <Link
              href="/register"
              className="text-white bg-primary hover:bg-primary-dark px-8 py-4 rounded-lg text-lg font-semibold  transition-colors"
            >
              مشاهده محصولات
            </Link>
          </div>
        </section> */}
        {/* Slide 3: Educational Content */}
        {/* <section
          className={`inset-0 flex justify-center items-center flex-col absolute  h-[70vh] text-center overflow-hidden transition-transform transform ease-in-out duration-1000
            ${currentSlide === 2 ? "translate-x-0" : "translate-x-full"}  `}
        >
          <div className="top-0 left-0 absolute w-full h-full -z-10">
            <Image
              src={HeroImage}
              alt="Swimmer"
              fill
              className="object-cover"
              quality={80}
              placeholder="blur"
            />
          </div>
          <div className="bg-black bg-opacity-70 absolute top-0 left-0 w-full h-full -z-5"></div>
          <div className="relative z-10 text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              آموزش و راهنمایی تخصصی
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              تکنیک‌ها، نکات ایمنی و مقالات آموزشی
            </p>
            <Link
              href="/register"
              className="text-white bg-primary hover:bg-primary-dark px-8 py-4 rounded-lg text-lg font-semibold  transition-colors"
            >
              مطالعه راهنماها
            </Link>
          </div>
        </section> */}
        {/*Navigation Dots*/}
        <div className=" absolute bottom-7 left-1/2 -translate-x-1/2  transform flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${
                currentSlide === index ? "bg-white" : "bg-gray-600"
              } rounded-full h-3 w-3 transition-colors cursor-pointer`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default SlidingHero;
