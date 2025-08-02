import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "تکنیک‌های صحیح شنای کرال",
    excerpt:
      "یادگیری اصول و تکنیک‌های درست برای شنای کرال سینه و بهبود عملکرد در آب",
    date: "۱۵ مهر ۱۴۰۳",
    category: "تکنیک",
    readTime: "۵ دقیقه",
    image: "/images/articles/crawl-technique.gif",
  },
  {
    id: 2,
    title: "انتخاب تجهیزات مناسب برای شروع شنا",
    excerpt: "راهنمای کامل برای خرید اولین تجهیزات شنا و انتخاب بهترین برندها",
    date: "۱۰ مهر ۱۴۰۳",
    category: "تجهیزات",
    readTime: "۷ دقیقه",
    image: "/images/articles/equipment-guide.png",
  },
  {
    id: 3,
    title: "نکات ایمنی در استخر و دریا",
    excerpt:
      "مهم‌ترین نکات ایمنی که هر شناگری باید بداند تا از حوادث جلوگیری کند",
    date: "۵ مهر ۱۴۰۳",
    category: "ایمنی",
    readTime: "۴ دقیقه",
    image: "/images/articles/safety-tips.jpg",
  },
  {
    id: 4,
    title: "تمرینات تقویت عضلات برای شناگران",
    excerpt:
      "برنامه تمرینی ویژه برای تقویت عضلات مورد نیاز در شنا و بهبود قدرت",
    date: "۱ مهر ۱۴۰۳",
    category: "تمرین",
    readTime: "۶ دقیقه",
    image: "/images/articles/strength-training.jpg",
  },
];

function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            مقالات آموزشی شنا
          </h1>
          <p className="text-lg text-gray-600">
            راهنماها و نکات تخصصی برای بهبود مهارت‌های شنا
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
                {/* Placeholder for article image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    quality={80}
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  ادامه مطلب
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage;
