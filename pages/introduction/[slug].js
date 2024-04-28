// pages/introduction/[slug].js

import Introduction from "../../models/Introduction";
import mongoose from 'mongoose';
import React from "react";
import styles1 from "@/styles/Color.module.css";
import styles from "@/styles/Styles.module.css";
export default function IntroductionPage({ introduction }) {
  return (
    <div>
      <div className={` md:p-8 p-1 min-h-screen top-0  ${styles1.customcolor}`}>
        <div class="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
          <div
            className={styles.list}
            dangerouslySetInnerHTML={{ __html: introduction.description }}
          />
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  try {
    console.log(params.slug);

    // Directly connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Before findOne');
    const introduction = await Introduction.findOne({ name: params.slug }).maxTimeMS(30000);
    console.log('After findOne');
    console.log('Introduction:', introduction);

    // Disconnect from MongoDB after the query
    await mongoose.disconnect();

    if (!introduction) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        introduction: {
          name: introduction.name,
          description: introduction.description,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
