import Image from "next/image";
import HeroImage from "@/public/images/pic-1.jpg";
function Hero() {
  return (
    <section className="flex justify-center items-center flex-col relative  h-[70vh] text-center overflow-hidden">
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
        <button className="text-white bg-primary hover:bg-primary-dark px-8 py-4 rounded-lg text-lg font-semibold  transition-colors">
          ثبت‌ نام در کلاس شنا
        </button>
      </div>
    </section>
  );
}

export default Hero;
