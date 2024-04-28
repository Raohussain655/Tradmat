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

 
  return (
    <>
     
      <main className={` text-white top-0  ${styles.customcolor}`}>
        <div className="max-w-screen-xl mx-auto px-2 ">
         
       
        
          <section className="py-4 pt-12 text-white">
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
         
        </div>
      </main>
    </>
  );
}
