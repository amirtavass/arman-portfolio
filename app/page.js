import ServicesOverview from "./components/ui/ServicesOverview";
import CoachResume from "./components/ui/CoachResume";
import DemoDisclaimer from "./components/ui/DemoDisclaimer";
import Hero from "./components/ui/Hero";

export const metadata = {
  title: "آرمان داریوشی - آموزش شنا حرفه‌ای",
  description:
    "آموزش شنا حرفه‌ای برای تمام سنین با ۱۵ سال تجربه. مربی مجرب با مدارک بین‌المللی.",
};
export default function page() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <CoachResume />
      <DemoDisclaimer />
    </>
  );
}
