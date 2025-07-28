import Image from "next/image";
import ChildrenImage from "@/public/images/pic-2.png";

function ChildrenSafetySection() {
  const parentTestimonials = [
    {
      id: 1,
      quote: "فرزندم عاشق کلاس‌های آرمان شده و اعتماد به نفسش خیلی زیاد شده",
      parent: "کیان احمدی",
      childAge: "۷ سال",
    },
    {
      id: 2,
      quote: "آقای داریوشی با صبر و مهربانی به کودکان آموزش می‌دهد",
      parent: "علی رضایی",
      childAge: "۹ سال",
    },
    {
      id: 3,
      quote: "استاد آرمان واقعاً تخصص کار با کودکان را دارد",
      parent: "دانیال موسوی",
      childAge: "۶ سال",
    },
  ];
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2 relative h-96">
            <Image
              alt="آموزش شنا کودکان"
              src={ChildrenImage}
              className="object-cover rounded-lg"
              fill
              quality={70}
            />
          </div>
          <div className="md:col-span-1">
            {parentTestimonials.map((testemonial) => (
              <div
                key={testemonial.id}
                className="bg-white shadow-md mt-2 p-6 border-primary border-r-4 rounded-lg"
              >
                <p className="text-gray-700 mb-4 text-sm italic">
                  &quot;{testemonial.quote}&quot;{" "}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-primary">
                    {testemonial.parent}
                  </span>
                  <span className="text-xs text-gray-500">
                    {testemonial.childAge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChildrenSafetySection;
