import React, { useState, useEffect } from "react";
import styles from "@/styles/Color.module.css";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const finnhub = require("finnhub");

  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  api_key.apiKey = "cnnk8q1r01qpkl7d2gm0cnnk8q1r01qpkl7d2gmg";
  const finnhubClient = new finnhub.DefaultApi();

  const [newsData, setNewsData] = useState([]);
  const [cat, setCat] = useState("forex");
  useEffect(() => {
    const fetchData = async () => {
      try {
        finnhubClient.marketNews(`${cat}`, {}, (error, data, response) => {
          console.log(data);
          setNewsData(data);
        });
      } catch (error) {
        console.error("Error fetching news data:", error.message);
        toast.error("Error fetching news data");
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div>
      <div className={`text-white top-0 ${styles.customcolor}`}>
        <section className="py-32 ">
          <div className="container mx-auto">
            <div
              className={`block rounded-lg shadow-lg pt-10 md:pt-12 px-2 md:px-6 ${styles.customcolor1}`}
              style={{
                marginTop: "-100px",
                backdropFilter: "blur(30px)",
              }}
            >
              <div className="flex flex-wrap items-center justify-center ">
                <div className="grow-0 shrink-0 basis-auto w-full xl:w-7/12 ">
                  <div className="flex justify-center text-center">
                    <div className="">
                      <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
                        News
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center text-center">
                {" "}
               
                  <div className="flex ">
                    <button
                      className={`text-lg mx-2 cursor-pointer rounded-full  font-extrabold px-6 py-2 ${styles.customcolor}`}
                    onClick={()=>setCat("forex")}>
                      Forex
                    </button>
                    <button
                      className={`text-lg mx-2 cursor-pointer rounded-full  font-extrabold px-6 py-2 ${styles.customcolor}`}
                      onClick={()=>setCat("crypto")}>
                     Crypto
                    </button>
                    <button
                      className={`text-lg mx-2 cursor-pointer rounded-full  font-extrabold px-6 py-2 ${styles.customcolor}`}
                      onClick={()=>setCat("general")}>
                     General
                    </button>
                  </div>
                
              </div>
              <div
                className={`max-w-screen-xl mt-8 lg:px-8 py-16 mx-auto rounded-lg shadow-lg ${styles.customcolor}`}
              >
                <section className="">
                  <div className="lg:flex lg:items-start  ">
                    <div className="">
                      <div className="grid gap-1 pb-6 grid-cols-1 md:grid-cols-3 ">
                        {newsData&&newsData.map((news) => (
                          <NewsCard
                          key={news.id}
                          id={news.id}
                          category={news.category}
                          date={news.category}
                          image={news.image}
                          headline={news.headline}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
