import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Color.module.css";
import { BsEyeFill } from "react-icons/bs";

export default function PostDetailPage() {
  const [blog, setblog] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    // Fetch data for the specific entry to be updated
    const fetchData = async () => {
      

      if (slug) {
        try {
          const response = await fetch(`/api/blog/slug?title=${slug}`);
          const data = await response.json();
          console.log(data)
          if (data) {
            setblog(data);
          } else {
            console.error("not found");
            
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [router.query,slug]);

  return (
    <div className={` ${styles.customcolor} top-0`}>
    <div className={`max-w-screen-xl mx-auto min-h-screen  ${styles.customcolor}`}>
      {blog&&
      <div className="lg:flex   justify-center  lg:space-x-6 ">
        <div className="lg:w-2/3 py-2 border-x-2 lg:px-2 rounded-md mb-2 bg-white ">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
         
          <img src={blog.imageURL} className="aspect-video w-full " alt="" />
        
          <div
                className="prose mt-6 text-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              /></div>
      </div>}
    </div></div>
  );
}
