import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Color.module.css";
import { BsEyeFill } from "react-icons/bs";

export default function PostDetailPage() {
  const [news, setNews] = useState(null);
  const router = useRouter();
  const { id, category } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/news?category=${category}&token=cnnk8q1r01qpkl7d2gm0cnnk8q1r01qpkl7d2gmg`
          );
          const data = await response.json();
          console.log(data);
          
          // Find the news article with the matching id
          const matchingNews = data.find(
            (article) => article.id == id
          );
          
          if (matchingNews) {
            setNews(matchingNews);
          } else {
            console.error("News article not found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [router.query,id]);

  return (
    <div className={` ${styles.customcolor} top-0`}>
      <div className={`max-w-screen-xl mx-auto min-h-screen ${styles.customcolor}`}>
        {news && (
          <div className="lg:flex justify-center lg:space-x-6">
            <div className="lg:w-2/3 py-2 border-x-2 lg:px-2 px-2 rounded-md mb-2 bg-white">
              <h1 className="text-4xl font-bold mb-4">{news.headline}</h1>
              <img
                src={news.image}
                className="aspect-video w-full h-50%"
                alt=""
              />
              <div
                className="prose mt-6 text-lg"
                dangerouslySetInnerHTML={{ __html: news.summary }}
              />
              <Link href={news.url}
                 className="text-blue-500 hover:underline">Read More
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
