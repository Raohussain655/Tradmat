import { useState,useEffect } from "react";

import BlogCard from "@/components/BlogCard";
import styles from "@/styles/Color.module.css";


const YourCarousel = () => {
  const [blogs, setblogs] = useState([]);

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
  return (
    <main className={` min-h-screen  text-white top-0  ${styles.customcolor}`}>
      <div className="max-w-screen-xl mx-auto px-2 ">
        <div className="flext justify-center text-center ">
          <div className="py-24 ">
            <div className=" flex py-2 justify-center text-center">
              <h1
                className={`text-4xl rounded-full  font-extrabold px-6 py-2 ${styles.customcolor1}`}
              >
                LATEST BLOCK
              </h1>
            </div>{" "}
            <div className="md:px-24 p-2">
              <p1>
                To achieve the layout where the image is on the left side and
                the title, date, and more button are on the right side, you can
                update the structure of the BlogCard component. Here's an
                updated version:
              </p1>
            </div>
          </div>
        </div>
        <div className="grid gap-6 gap-y-10 pb-6  md:grid-cols-2 ">
          {blogs&&blogs.length>0&&blogs.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default YourCarousel;
