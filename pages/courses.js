import React, { Component } from "react";
import { useEffect, useState } from "react";
import styles from "@/styles/Color.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Link from "next/link";
export default function course() {
  const [confirmId, setConfirmId] = useState(null);
  const [course, setCourses] = useState([]);
  const [Enroll, setEnroll] = useState([]);

  console.log(course);
  const handleEnrollment = async (courseId) => {
    const session = await getSession();
    console.log("clicked");
    if (!session) {
      toast.error("Not Register user", {
        position: "top-right",
        autoClose: 2000,
      });
      router.push("/signin");
      return;
    }
    if (courseId && session.user.id) {
      try {
        const formData = new FormData();
        formData.append("course_id", courseId);
        formData.append("user_id", session.user.id);
        console.log("formData:", formData);
        const response = await fetch(
          `/api/enroll/create?course_id=${courseId}&user_id=${session.user.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (response.ok) {
          toast.success("Course enrolled successfully", {
            position: "top-right",
            autoClose: 2000,
          });
          fetchEnroll();
        } else {
          toast.error("Failed to enroll in course", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error enrolling in course:", error);
        toast.error("Failed to enroll in course", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };
  const fetchEnroll = async () => {
    const session = await getSession();
    try {
      const Response = await fetch(
        `/api/enroll/get?user_id=${session.user.id}`
      );
      const Data = await Response.json();
      if (Array.isArray(Data)) {
        setEnroll(Data);
      } else {
        setEnroll([]);
      }
      console.log(Data);
    } catch (error) {
      console.error("Error fetchingdata:", error.message);
    }
  };
  useEffect(() => {
    
    fetchEnroll();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await fetch("/api/course/get");
        const Data = await Response.json();
        setCourses(Data.courses);
      } catch (error) {
        console.error("Error fetching categories data:", error.message);
      }
    };

    fetchData();
  }, []);
  const showConfirmation = (id) => {
    setConfirmId(id);
  };

  const hideConfirmation = () => {
    setConfirmId(null);
  };
  const handleClick = (e) => {
    handleEnrollment(e);
    if (isUserLoggedIn) {
      toast.success("Course is Enrolled Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Please login for Enroll course!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    hideConfirmation();
  };

  const router = useRouter();
  return (
    <div className={` relative ${styles.customcolor}`}>
      <section className="pb-32 text-gray-800">
        <div
          className="relative overflow-hidden bg-no-repeat bg-cover h-[3]"
          style={{
            backgroundImage: "url('images/course.png')",
            backgroundPosition: "50%",
            height: "300px",
          }}
        ></div>
        <div className="container  mx-auto text-gray-800 ">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div
            className={`block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6  ${styles.customcolor1} `}
            style={{
              marginTop: "-100px",
              backdropFilter: "blur(30px)",
            }}
          >
            <div className={`justify-center text-center pb-6`}>
              <h2 className="text-4xl font-bold text-white mb-6">Courses</h2>
              <p className="text-white">
                Our courses are not just about acquiring new skills, but also
                about personal growth and development, helping students to
                become the best version of themselves.{" "}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.length > 0 ? (
                course.map((course, index) => (
                  <div
                    key={index}
                    className={`opacity-100 transition-opacity duration-500 ease-in-out mx-4 ${styles.courseCard}`}
                  >
                    <div
                      className="bg-white rounded-lg shadow-md mx-2 md:mx-4 lg:mx-6 px-6 py-4 flex-shrink-0"
                      style={{ width: "320px" }}
                    >
                      <img
                        className="w-full h-48 object-cover rounded-md mb-4"
                        src={course.feature_img}
                        alt="Course photo"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-2">
                        {course.description}
                      </p>
                      <div className="flex relative justify-between">
                        {Enroll?.find(
                          (enrollment) => enrollment.course_id === course._id
                        ) ? (
                          // User is already enrolled in this course
                          <Link
                            href={`/course/${course._id}?enroll_id=${
                              Enroll.find(
                                (enrollment) =>
                                  enrollment.course_id === course._id
                              )._id
                            }`}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Start Learning
                          </Link>
                        ) : (
                          // User is not enrolled in this course
                          <button
                            onClick={() => handleEnrollment(course._id)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Enroll
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No courses available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
