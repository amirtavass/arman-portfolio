import ServicesOverview from "./components/ui/ServicesOverview";
import CoachResume from "./components/ui/CoachResume";
import DemoDisclaimer from "./components/ui/DemoDisclaimer";
import ChildrenSafetySection from "./components/ui/ChildrenSafetySection ";
import SlidingHero from "./components/ui/SlidingHero";
import FeaturedProducts from "./components/ui/FeaturedProducts";

export const metadata = {
  title: "آرمان داریوشی - آموزش شنا حرفه‌ای",
  description:
    "آموزش شنا حرفه‌ای برای تمام سنین با ۱۵ سال تجربه. مربی مجرب با مدارک بین‌المللی.",
};
export default function page() {
  return (
    <>
      <SlidingHero />
      <FeaturedProducts />
      <ChildrenSafetySection />
      <CoachResume />
      <DemoDisclaimer />
    </>
  );
}
