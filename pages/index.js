import { NextSeo } from "next-seo";

import { Inter } from "next/font/google";

import { useState, useEffect, useRef } from "react";
import { BsEyeFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import BlogCard from "@/components/BlogCard";
import Author from "@/components/AuthorCard";

import Card from "../components/Card";
import MarketOverviewWidget from "../components/MarketOverviewWidget";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero from "../lotti/hero.json";
import Lottie from "lottie-react";
import styles from "@/styles/Color.module.css";
import NewsCard from "@/components/NewsCard";

const cardData = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="64"
        height="64"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="1" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="5" y1="12" x2="1" y2="12" />
        <line x1="23" y1="12" x2="19" y2="12" />
        <line x1="16.5" y1="7.5" x2="18.8" y2="9.8" />
        <line x1="7.5" y1="16.5" x2="9.8" y2="18.8" />
        <line x1="16.5" y1="16.5" x2="18.8" y2="18.8" />
        <line x1="7.5" y1="7.5" x2="9.8" y2="9.8" />
      </svg>
    ),
    heading: "FOREX MARKET",
    description:
      "We Are Providing All Services For Biggner To Advance Forex Trader.",
    buttonText: "Forex Market",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="64"
        height="64"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="8" />
        <line x1="12" y1="4" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
    heading: "STOCK MARKET",
    description:
      "We Are Providing All Services For Biggner To Advance Stock Trader.",

    buttonText: "Stock Market",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="64"
        height="64"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="15.6,8.4 12,15.6 8.4,8.4" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <polygon points="5.64,5.64 5.64,18.36 18.36,18.36 18.36,5.64" />
        <line x1="5.64" y1="18.36" x2="18.36" y2="5.64" />
      </svg>
    ),
    heading: "CRYPTO MARKET",
    description:
      "We Are Providing All Services For Biggner To Advance Crypto Trader.",

    buttonText: "Crypto Market",
  },
  // Add more card data objects as needed
];

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogs, setblogs] = useState([]);
  const [investment, setInvestment] = useState(0);
  const [risk, setRisk] = useState(0);
  const [results, setResults] = useState({
    dailyTarget: 0,
    dailyDrawdown: 0,
    weeklyTarget: 0,
    monthlyTarget: 0,
  });
  const [error, setError] = useState("");

  const calculateResults = () => {
    setError("");
  
    if (isNaN(parseFloat(investment)) || isNaN(parseFloat(risk))) {
      setError("Please enter valid numbers for investment and risk.");
      return;
    }
  
    const investmentAmount = parseFloat(investment);
    const riskPercentage = parseFloat(risk) / 100; // Convert risk to a decimal
  
    const dailyTarget = investmentAmount * riskPercentage;
    const dailyDrawdown = dailyTarget;
    const weeklyTarget = dailyTarget * 5;
    const monthlyTarget = weeklyTarget * 4;
  
    setResults({ dailyTarget, dailyDrawdown, weeklyTarget, monthlyTarget });
  };
  

  const finnhub = require("finnhub");

  const api_key = finnhub.ApiClient.instance.authentications["api_key"];
  api_key.apiKey = "cnnk8q1r01qpkl7d2gm0cnnk8q1r01qpkl7d2gmg";
  const finnhubClient = new finnhub.DefaultApi();

  const [newsData, setNewsData] = useState([]);
  const fetchnews = async () => {
    try {
      finnhubClient.marketNews(`crypto`, {}, (error, data, response) => {
        console.log(data);
        setNewsData((prevNewsData) => {
          // Initialize prevNewsData as an empty array if it's undefined
          prevNewsData = prevNewsData || [];
          // Create a Set from the concatenated arrays to remove duplicates
          const uniqueNewsData = new Set([...prevNewsData, ...data]);
          // Convert the Set back to an array
          return Array.from(uniqueNewsData);
        });
      });
    } catch (error) {
      console.error("Error fetching news data:", error.message);
      toast.error("Error fetching news data");
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        finnhubClient.marketNews("forex", {}, (error, data, response) => {
          console.log(data);
          setNewsData(data);
        });
      } catch (error) {
        console.error("Error fetching news data:", error.message);
        toast.error("Error fetching news data");
      }
    };
    fetchData();
    fetchnews();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blog/get-all");
        const data = await response.json();
        setblogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <>
      <NextSeo
        title="TradeMate"
        description="TradeMate.com!"
        viewport="width=device-width, initial-scale=1"
        canonical="https://TradeMate.com"
        openGraph={{
          url: "https://TradeMate.com",
          title: "TradeMate",
          description: "TradeMate",
        }}
      />
      <main className={` text-white top-0  ${styles.customcolor}`}>
        <div className="max-w-screen-xl mx-auto px-2 ">
          <section className="py-8">
            <div
              className={` rounded-full p-4  transition duration-300 ease-in-out ${styles.horcolor}`}
            >
              <div className="lg:flex lg:items-start lg:space-x-6 ">
                <div className="lg:w-1/2">
                  <div className="py-24 font-extrabold text-2xl">
                    {" "}
                    <Slider {...settings}>
                      <div className="flex justify-center text-center items-center flex-col">
                        <h1>
                          Forex Market Unveiled: Navigating the World of Foreign
                          Exchange Trading
                        </h1>
                        <div className="mt-4 space-x-4  ">
                          <Link
                            href={`/courses`}
                          >
                            <button className="my-1 bg-blue-500 text-white font-bold rounded-full py-2 px-4 hover:bg-blue-700  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                              start learning now
                            </button>
                          </Link>
                          <Link href="/contact">
                            <button className="border my-1 text-white font-bold rounded-full py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                              contact-us
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-center text-center">
                        <h1>
                          Crypto Chronicles: A Learning Journey through the
                          Dynamic Crypto Market
                        </h1>
                        <div className="mt-4 space-x-4">
                          <Link
                            href={`/courses`}
                          >
                            <button className="my-1 bg-blue-500 text-white font-bold rounded-full py-2 px-4 hover:bg-blue-700  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                              start learning now
                            </button>
                          </Link>
                          <Link href="/contact">
                            <button className="border my-1 text-white font-bold rounded-full py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                              contact-us
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-center text-center">
                        <h1>
                          Stock Market Mastery: Acquiring Knowledge to Navigate
                          Financial Frontiers
                        </h1>
                        <div className="mt-4 space-x-4">
                          <Link
                            href={`/courses`}
                          >
                            <button className="my-1 bg-blue-500 text-white font-bold rounded-full py-2 px-4 hover:bg-blue-700  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                              start learning now
                            </button>
                          </Link>
                          <Link href="/contact">
                            <button className="border my-1 text-white font-bold rounded-full py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                              contact-us
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-center text-center">
                        <h1>
                          Money Market Insights: A Learning Expedition into
                          Short-Term Financing Landscapes
                        </h1>
                        <div className="mt-4 space-x-4">
                          <button className="my-1 bg-blue-500 text-white font-bold rounded-full py-2 px-4 hover:bg-blue-700  focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                            start learning now
                          </button>
                          <button className="border my-1 text-white font-bold rounded-full py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                            contact-us
                          </button>
                        </div>
                      </div>
                    </Slider>
                    <div className="progress-bar">
                      <div
                        className="bar"
                        style={{ width: `${((currentSlide + 1) * 100) / 3}%` }}
                      ></div>
                    </div>
                  </div>{" "}
                </div>
                <div className="lg:w-1/2">
                  <div>
                    {" "}
                    <Lottie
                      animationData={hero}
                      loop={true}
                      className="w-full  "
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-24">
            <div className="flex flex-wrap justify-center content-center">
              {cardData.map((data, index) => (
                <div key={index} className="m-4">
                  <Card {...data} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <MarketOverviewWidget />
          </section>
          <section className="py-2 pt-12 text-white">
            <div
              className={` rounded-full p-4  transition duration-300 ease-in-out ${styles.customcolor1}`}
            >
              <div className="lg:flex lg:items-start lg:space-x-6 py-12">
                <div className="text-center">
                  <h2 className="text-4xl  font-extrabold mb-4 uppercase">
                    Risk Calculator
                  </h2>

                  {error && <p className="text-red-500 mb-4">{error}</p>}

                  <div className="intro px-4 lg:px-32">
                    <p className="text-sm mb-4">
                      This Risk calculator is designed to be a unique and
                      informative tool. It helps you estimate potential outcomes
                      based on your investment amount and risk tolerance. By
                      providing these inputs, you can gain valuable insights
                      into how your investment may perform under different risk
                      scenarios.
                    </p>
                  </div>

                  <div className="lg:flex justify-center lg:space-x-8 text-lg font-extrabold">
                    <div className="">
                      <p>Investment($): </p>
                      <input
                        type="number"
                        className="p-2 rounded-lg text-black"
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <p>Risk(%): </p>
                      <input
                        type="number"
                        className="p-2 rounded-lg text-black"
                        value={risk}
                        onChange={(e) => setRisk(e.target.value)}
                      />
                    </div>
                    <div className="mt-1">
                      
                      <button className="bg-blue-500 p-2 mt-6 rounded-lg" onClick={calculateResults}>Calculate</button>
                    </div>
                  </div>

                  <div className="mt-2 text-lg font-extrabold">
                    <div>
                      <h1>Results:</h1>
                    </div>{" "}
                    <div className="mt-1 flex justify-center">
                      <table className="table-auto border">
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border">Daily Target:</td>
                            <td className="px-4 py-2">
                              {results.dailyTarget}$
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">
                              Daily Drawdown:
                            </td>
                            <td className="px-4 py-2">
                              {results.dailyDrawdown}$
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">Weekly Target:</td>
                            <td className="px-4 py-2">
                              {results.weeklyTarget}$
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">
                              Monthly Target:
                            </td>
                            <td className="px-4 py-2">
                              {results.monthlyTarget}$
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-2 lg:pb-24">
            <div className="flext justify-center text-center ">
              <div className="pt-12 pb-12 ">
                <div className=" flex py-2 justify-center text-center">
                  <h1
                    className={`text-4xl rounded-full  font-extrabold px-6 py-2 ${styles.gradientBg}`}
                  >
                    LATEST BLOG
                  </h1>
                </div>
                <div className="md:px-24 ">
                  <p1>
                    To achieve the layout where the image is on the left side
                    and the title, date, and more button are on the right side,
                    you can update the structure of the BlogCard component.
                    Here's an updated version:
                  </p1>
                </div>
              </div>
            </div>

            <div className=" justify-center grid gap-2 gap-y-10 pb-6 md:grid-cols-2 lg:grid-cols-2">
            {blogs&&blogs.length > 0 ? 
    blogs.map((post) => (
        <BlogCard key={post.title} post={post} />
    )) 
    : null
}

            </div>
          </section>
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

                <div
                  className={`max-w-screen-xl mt-24 lg:px-8 py-16 mx-auto rounded-lg shadow-lg ${styles.customcolor}`}
                >
                  <section className="">
                    <div className="lg:flex lg:items-start  ">
                      <div className="lg:w-1/3 pr-1 ">
                        {newsData&&newsData.length > 0 && (
                          <div className="max-w-md pt-1 mx-auto rounded shadow-xl overflow-hidden md:max-w-2xl">
                            <Link
                              className="md:flex"
                              href={`/news/[category]/[id]`}
                              as={`/news/${newsData[0]?.category}/${newsData[0]?.id}`}
                            >
                              <div className="md:shrink-0">
                                <img
                                  className="h-48 w-full rounded object-cover md:h-full md:w-48"
                                  src={newsData[0]?.image || ""}
                                  alt="News headline"
                                />
                              </div>
                              <div className="pl-1">
                                <div
                                  className={`uppercase tracking-wide text-sm text-indigo-500 font-semibold ${styles.customtext}`}
                                >
                                  {newsData[0]?.category || ""}
                                </div>
                                <a
                                  href="#"
                                  className="block mt-1 text-lg leading-tight font-bold hover:underline"
                                >
                                  {newsData[1]?.headline || ""}
                                </a>
                              </div>
                            </Link>
                          </div>
                        )}
                        <div className="grid gap-1 pt-2 grid-cols-1 md:grid-cols-1 ">
                          {newsData&&newsData.length>0&&newsData.slice(1, 5).map((news) => (
                            <NewsCard
                              key={news.id}
                              date={news.category}
                              id={news.id}
                              category={news.category}
                              image={news.image}
                              headline={news.headline}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <div className="grid gap-1 pb-6 grid-cols-1 md:grid-cols-2 ">
                          {newsData&&newsData.length>0&&newsData.slice(2, 14).map((news) => (
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
                    <div className="flex justify-center text-center">
                      {" "}
                      <Link href="/news">
                        <div>
                          <h1
                            className={`text-lg rounded-full  font-extrabold px-6 py-2 ${styles.gradientBg}`}
                          >
                            More News
                          </h1>
                        </div>
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
