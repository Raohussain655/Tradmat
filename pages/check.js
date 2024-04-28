import React from "react";
import { BsEyeFill } from "react-icons/bs";
import styles from "@/styles/Color.module.css";
const BlogCard = ({ post }) => {
  return (
    
<div class="flex flex-col items-center">
  <div class="w-48 h-48 overflow-hidden rounded-lg">
    <img src="https://picsum.photos/200/300" alt="News photo" class="w-full h-full object-cover"/>
  </div>
  <h2 class="font-bold text-xl mt-4">News Headline</h2>
  <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>

  );
};

export default BlogCard;
