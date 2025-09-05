"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { swimmingTypes, articlesContent } from "@/app/data/articles";
import ArticleReader from "@/app/components/ui/ArticleReader";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function FreestylePage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { language, t } = useLanguage();

  const swimmingType = swimmingTypes.freestyle;
  const articles = Object.values(articlesContent.freestyle || {});

  // Create language-aware article object for ArticleReader
  const getLocalizedArticle = (article) => {
    if (!article) return null;

    return {
      ...article,
      title: language === "fa" ? article.title : article.englishTitle,
      excerpt: language === "fa" ? article.excerpt : article.englishExcerpt,
      content: language === "fa" ? article.content : article.englishContent,
      readTime: language === "fa" ? article.readTime : article.englishReadTime,
      difficulty:
        language === "fa" ? article.difficulty : article.englishDifficulty,
      tags: language === "fa" ? article.tags : article.englishTags,
      author: language === "fa" ? article.author : article.englishAuthor,
      publishDate:
        language === "fa" ? article.publishDate : article.englishPublishDate,
    };
  };

  const localizedSwimmingType = {
    name: language === "fa" ? swimmingType.name : swimmingType.englishName,
    description:
      language === "fa"
        ? swimmingType.description
        : swimmingType.englishDescription,
  };

  if (selectedArticle) {
    return (
      <ArticleReader
        article={getLocalizedArticle(selectedArticle)}
        swimmingType={localizedSwimmingType}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header with Swimming Type Info */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <Link
              href="/articles"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {t("articles")}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800 font-medium">
              {localizedSwimmingType.name}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {language === "fa" ? "مقالات" : "Articles"}{" "}
            {localizedSwimmingType.name}
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            {localizedSwimmingType.description}
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={
                      language === "fa" ? article.title : article.englishTitle
                    }
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={80}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                      {language === "fa"
                        ? article.difficulty
                        : article.englishDifficulty}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {language === "fa"
                        ? article.readTime
                        : article.englishReadTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {language === "fa" ? article.title : article.englishTitle}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {language === "fa"
                      ? article.excerpt
                      : article.englishExcerpt}
                  </p>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {t("readMore")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {language === "fa" ? "مقاله‌ای یافت نشد" : "No Articles Found"}
            </h3>
            <p className="text-gray-600">
              {language === "fa"
                ? "مقاله‌ای برای این نوع شنا هنوز منتشر نشده است."
                : "No articles have been published for this swimming style yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
