import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import youtubeVideoId from "youtube-video-id";
import { FaRegFileVideo } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";
import styles1 from "@/styles/Color.module.css";
import styles from "@/styles/Styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductForm() {
  const router = useRouter();
  const id = router.query.id;
  const [course, setCourse] = useState(null);

  const [enroll, setEnroll] = useState(null);
  const enrollId = router.query.enroll_id;
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(""); // Set default to "video"
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  console.log("url", videoUrl);
  const [file, setFile] = useState(null); // State to store the uploaded file
  console.log("url", videoUrl);
  const [marks, setMarks] = useState(25);
  const [marksRange, setMarksRange] = useState(30);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  // Function to handle file upload
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]); // Set the selected file to the state
  };

  const handleMaterialClick = (materialType, chapterId) => {
    setSelectedMaterial(materialType);

    // If the chapterId is provided, update the selected chapter
    if (chapterId) {
      setSelectedChapter(chapterId);
      const selectedChapterData = course.chapters.find(
        (chapter) => chapter._id === chapterId
      );

      // Load the appropriate content based on the selected material type
      switch (materialType) {
        case "video":
          setVideoUrl(selectedChapterData.videos[0]?.video_url);
          break;
        case "summary":
          // Load summary content
          break;
        case "assignment":
          // Load assignment content
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    // Extract video ID from the entered URL
    const extractVideoId = (url) => {
      const id = youtubeVideoId(url);
      return id ? id : null;
    };

    // Set the video ID when a valid URL is entered
    if (videoUrl) {
      const id = extractVideoId(videoUrl);
      setVideoId(id);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (course) {
      // Set the default selected chapter to the first chapter
      setSelectedChapter(course.chapters[0]?._id);

      // Check for the availability of each type of material in the selected chapter
      const selectedChapterData = course.chapters.find(
        (chapter) => chapter._id == selectedChapter
      );
      if (selectedChapterData) {
        if (selectedChapterData.videos.length > 0) {
          setSelectedMaterial("video");
          setVideoUrl(selectedChapterData.videos[0]?.video_url);
        } else if (selectedChapterData.summary.length > 0) {
          setSelectedMaterial("summary");
        } else if (selectedChapterData.assignments.length > 0) {
          setSelectedMaterial("assignment");
        }
      }
    }
  }, [course]);

  useEffect(() => {
    // Fetch data for the specific entry to be updated
    const fetchData = async () => {
      const { id } = router.query;

      if (id) {
        try {
          const response = await fetch(`/api/course/get-by-id?id=${id}`);
          const data = await response.json();
          console.log(data.course);
          if (data) {
            setCourse(data.course);
            setSelectedChapter(course.chapters[0]?._id);

            // Check for the availability of each type of material in the selected chapter
            const selectedChapterData = course.chapters.find(
              (chapter) => chapter._id == selectedChapter
            );
            if (selectedChapterData) {
              if (selectedChapterData.videos.length > 0) {
                setSelectedMaterial("video");
                setVideoUrl(selectedChapterData.videos[0]?.video_url);
              } else if (selectedChapterData.summary.length > 0) {
                setSelectedMaterial("summary");
              } else if (selectedChapterData.assignments.length > 0) {
                setSelectedMaterial("assignment");
              }
            }
          } else {
            console.error("not found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [router.query]);

  // Function to submit the file
  const handleSubmitFile = async () => {
    const selectedChapterData = course.chapters.find(
      (chapter) => chapter._id == selectedChapter
    );
    setSubmitButtonDisabled(true);
    try {
      const formData = new FormData();
      formData.append("chapter_id", selectedChapter); // Assuming you have the selected chapter ID available
      formData.append("chapter_name", selectedChapterData.title); // Assuming you have the selected chapter name available
      formData.append(
        "assignment_name",
        selectedChapterData.assignments[0].title
      ); // Provide the assignment name here
      formData.append("file", file);
      console.log(
        selectedChapter,
        selectedChapterData.title,
        selectedChapterData.assignments[0].title
      );
      const response = await fetch(
        `/api/assignment/create?enroll_id=${enrollId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        fetchData();
        toast.success("Assignment submitted successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to submit assignment", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      // Enable the submit button after the submission process is complete
      setSubmitButtonDisabled(false);
    }
  };
  const fetchData = async () => {
    if (id) {
      try {
        const response = await fetch(
          `/api/enroll/get-enroll?enroll_id=${enrollId}`
        );
        const data = await response.json();
        if (data) {
          setEnroll(data);
          // Set default selected chapter and load content
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [enrollId]);
  return (
    <div className={`min-h-screen bg-gray-700 relative`}>
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
      <div className="container mx-auto md:backdrop relative ">
        <div className="flex flex-col md:flex-row px-2">
          <div className="md:w-3/4 w-full bg-gray-300 ">
            <div className="p-4 py-24 md:min-h-screen">
              {selectedChapter && selectedMaterial && (
                <>
                  {selectedMaterial === "video" && videoId && (
                    <iframe
                      width="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Video"
                      className="video-iframe h-[100%] md:h-[500px]"
                      allowFullScreen
                    ></iframe>
                  )}
                  {selectedMaterial === "summary" && (
                    <div
                      className={styles.list}
                      dangerouslySetInnerHTML={{
                        __html: course.chapters.find(
                          (chapter) => chapter._id === selectedChapter
                        )?.summary[0]?.content,
                      }}
                    />
                  )}
                  {selectedMaterial === "assignment" && (
                    <>
                      <div
                        className={styles.list}
                        dangerouslySetInnerHTML={{
                          __html: course.chapters.find(
                            (chapter) => chapter._id === selectedChapter
                          )?.assignments[0]?.content,
                        }}
                      ></div>
                      <hr className="w-full"></hr>
                      <h1 className="text-lg font-bold">For submission:</h1>
                      {enroll &&
                      enroll.assignments &&
                      enroll.assignments.some(
                        (assignment) =>
                          assignment.assignment_name ===
                          course.chapters.find(
                            (chapter) => chapter._id === selectedChapter
                          )?.assignments[0]?.title
                      ) ? (
                        <>
                          {enroll &&
                            enroll.assignments &&
                            enroll.assignments.length > 0 && (
                              <div className="mt-4">
                                {enroll.assignments.map((assignment, index) => (
                                  <div key={index}>
                                    {assignment.assignment_name ===
                                    course.chapters.find(
                                      (chapter) =>
                                        chapter._id === selectedChapter
                                    )?.assignments[0]?.title ? (
                                      <>
                                        {assignment.marks !== null ? ( // Check if marks is not null
                                          <>
                                            <div className="flex">
                                              <h1> Obtained Marks: </h1>
                                              {assignment.marks}%
                                            </div>
                                            <input
                                              type="range"
                                              className="text-green-500"
                                              min="0"
                                              max="100"
                                              value={assignment.marks}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <h1 className="text-lg text-green-500 font-bold">
                                              Your assignment has been submitted
                                            </h1>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="flex mt-2 justify-center items-center">
                            <div>
                              <div>
                                <input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileUpload}
                                />
                              </div>
                              <div className="mt-4">
                                {/* Button to submit the file */}
                                <button
                                  onClick={handleSubmitFile}
                                  disabled={submitButtonDisabled} // Disable the button when submitButtonDisabled is true
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                  {submitButtonDisabled ? ( // Display loading spinner if submitButtonDisabled is true
                                    <div className="flex items-center justify-center">
                                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                  ) : (
                                    "Submit"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="md:w-1/4 w-full md:m-2">
            {course
              ? course.chapters.map((chapter) => (
                  <div key={chapter._id} className="my-2 bg-gray-200">
                    <span
                      className="p-4 text-2xl font-bold flex content-center text-center justify-between"
                      onClick={() => setSelectedChapter(chapter._id)}
                    >
                      {chapter.title}
                      {selectedChapter === chapter._id ? (
                        <IoChevronUp className="mt-2" />
                      ) : (
                        <IoChevronDown className="mt-2" />
                      )}
                    </span>
                    {selectedChapter === chapter._id && (
                      <div className="px-4 md:text-2xl pb-4">
                        {chapter.videos.length > 0 && (
                          <div
                            className="flex border-t-2 border-black"
                            onClick={() =>
                              handleMaterialClick("video", chapter._id)
                            }
                          >
                            <FaRegFileVideo className="mt-1" />{" "}
                            <span>{chapter.videos[0].title}</span>
                          </div>
                        )}
                        {chapter.summary.length > 0 && (
                          <div
                            className="flex border-y-2 border-black"
                            onClick={() =>
                              handleMaterialClick("summary", chapter._id)
                            }
                          >
                            <MdOutlineSummarize className="mt-1" />{" "}
                            {chapter.summary[0]?.title}
                          </div>
                        )}
                        {chapter.assignments.length > 0 && (
                          <div
                            className="flex border-b-2 border-black"
                            onClick={() =>
                              handleMaterialClick("assignment", chapter._id)
                            }
                          >
                            <MdAssignment className="mt-1" />{" "}
                            {chapter.assignments[0]?.title}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
