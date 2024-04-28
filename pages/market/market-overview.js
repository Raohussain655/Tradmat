import React from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/Color.module.css";
const MarketOverviewNoSSR = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.MarketOverview),
  {
    ssr: false,
  }
);

function chart() {
  return (
    <div>
      <div className={` text-white top-0  ${styles.customcolor}`}>
        <section className="py-32 ">
          <div className="container  mx-auto  ">
            <div
              className={`block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6  ${styles.gradientBg}`}
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
                      Market Overview Widget
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <MarketOverviewNoSSR
                colorTheme="dark"
                height={600}
                width="100%"
                showFloatingTooltip
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default chart;
