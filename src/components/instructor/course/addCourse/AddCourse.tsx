import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import axios from "axios";
import { UploadS3Bucket } from "../../utils/UploadS3Bucket";
import LoadingComponent from "../../templates/LoadingComponent";
import { useNavigate } from "react-router-dom";
import CourseSubmitResult from "./CourseSubmitResult";
// import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client, S3, PutObjectCommand } from "@aws-sdk/client-s3";

const AddCourse: React.FC = () => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    courseTitle: "",
    instructorId: "",
    instructorName: "",
    description: "",
    category: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: null,
    thumbnail: null,
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: null,
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/tutor/categories", {
        withCredentials: true,
      })
      .then((res: any) => {
        // console.log(res.data);
        if (res.data.success) {
          // console.log(res.data.categories);
          setCategories(res.data.categories);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   if (Object.keys(courseData).length !== 0) {
  //     // Once courseData is available and not empty, make the Axios POST request
  //     axios
  //       .post(
  //         "http://localhost:5000/api/v1/tutor/create_course",
  //         { data: courseData },
  //         { withCredentials: true }
  //       )
  //       .then((res) => {
  //         if (res.data.courseStatus.success) {
  //           setError("");
  //           // Navigate or perform any other action upon success
  //         } else {
  //           setError(res.data.courseStatus.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //       .finally(() => {
  //         setIsLoading(false); // Make sure to handle loading state accordingly
  //       });
  //   }
  // }, [courseData]);

  const handleSubmit = async () => {
    setIsLoading(true);
    // console.log("this is handle submit");

    //format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    //format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = await Promise.all(
      courseContentData.map(async (courseContent) => {
        const uploadedVideo = await UploadS3Bucket(courseContent.videoUrl);
        if (uploadedVideo) {
          return {
            videoUrl: uploadedVideo.url,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({
              title: link.title,
              url: link.url,
            })),
            suggestion: courseContent.suggestion,
          };
        }
      })
    );

    const demoVideo = await UploadS3Bucket(courseInfo.demoUrl);
    const thumnailImage = await UploadS3Bucket(courseInfo.thumbnail);

    //prepare our data object
    const data = {
      courseTitle: courseInfo.courseTitle,
      instructorId: courseInfo.instructorId,
      instructorName: courseInfo.instructorName,
      category: courseInfo.category,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: thumnailImage.url,
      level: courseInfo.level,
      demoUrl: demoVideo.url,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
    setIsLoading(false);
  };

  console.log(courseData);

  const handleCourseCreate = async () => {
    console.log("Reached courseCreate");

    //  setIsLoading(true);

    //  //format benefits array
    //  const formattedBenefits = benefits.map((benefit) => ({
    //    title: benefit.title,
    //  }));
    //  //format prerequisites array
    //  const formattedPrerequisites = prerequisites.map((prerequisite) => ({
    //    title: prerequisite.title,
    //  }));

    //  const formattedCourseContentData = await Promise.all(
    //    courseContentData.map(async (courseContent) => {
    //      const uploadedVideo = await UploadS3Bucket(courseContent.videoUrl);
    //      if (uploadedVideo) {
    //        return {
    //          videoUrl: uploadedVideo.url,
    //          title: courseContent.title,
    //          description: courseContent.description,
    //          videoSection: courseContent.videoSection,
    //          links: courseContent.links.map((link) => ({
    //            title: link.title,
    //            url: link.url,
    //          })),
    //          suggestion: courseContent.suggestion,
    //        };
    //      }
    //    })
    //  );

    //  const demoVideo = await UploadS3Bucket(courseInfo.demoUrl);
    //  const thumnailImage = await UploadS3Bucket(courseInfo.thumbnail);

    //  //prepare our data object
    //  const data = {
    //    courseTitle: courseInfo.courseTitle,
    //    instructorId: courseInfo.instructorId,
    //    instructorName: courseInfo.instructorName,
    //    category: courseInfo.category,
    //    description: courseInfo.description,
    //    price: courseInfo.price,
    //    estimatedPrice: courseInfo.estimatedPrice,
    //    tags: courseInfo.tags,
    //    thumbnail: thumnailImage.url,
    //    level: courseInfo.level,
    //    demoUrl: demoVideo.url,
    //    totalVideos: courseContentData.length,
    //    benefits: formattedBenefits,
    //    prerequisites: formattedPrerequisites,
    //    courseData: formattedCourseContentData,
    //  };
    //  setCourseData(data);
    //  setIsLoading(false);

    // setError("");
    // axios
    //   .post(
    //     "http://localhost:5000/api/v1/tutor/create_course",
    //     { data: courseData },
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     if (res.data.courseStatus.success) {
    //       setError("");
    //       // navigate()
    //     } else {
    //       setError(res.data.courseStatus.message);
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className="flex flex-row mx-10 ">
      <div className="flex-1 ">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
            categories={categories}
            error={error}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            benefits={benefits}
            prerequisites={prerequisites}
            handleCourseCreate={handleCourseCreate}
            handleSubmit={handleSubmit}
          />
        )}
        {Object.keys(courseData).length > 0 && active === 4 && (
          <CourseSubmitResult
            courseData={courseData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {isLoading && <LoadingComponent />}
      </div>
      <div className="flex flex-row mt-10 mx-10 gap-10 justify-center ">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default React.memo(AddCourse);
