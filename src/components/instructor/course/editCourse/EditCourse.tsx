import React, { useEffect, useState } from "react";
import CourseInformation from "./EditCourseInformation";
import CourseOptions from "./EditCourseOptions";
import CourseData from "./EditCourseData";
import CourseContent from "./EditCourseContent";
import CoursePreview from "./EditCoursePreview";
import axios from "axios";
import { UploadS3Bucket } from "../../utils/UploadS3Bucket";
import LoadingComponent from "../../templates/LoadingComponent";
import { useLocation, useNavigate } from "react-router-dom";
import CourseSubmitResult from "./EditCourseSubmitResult";
// import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client, S3, PutObjectCommand } from "@aws-sdk/client-s3";

const EditCourse: React.FC = () => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    _id: "",
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
      _id: "",
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

  const [itemsToRemove, setItemsToRemove] = useState<any[]>([]);

  const [newUrls, setNewUrls] = useState<any[]>([]);

  const navigate = useNavigate();

  const location = useLocation();

  // Retrieve user data from location state
  const course = location.state;
  //   console.log(course);

  useEffect(() => {
    if (course) {
      setCourseInfo({
        _id: course._id,
        courseTitle: course.courseTitle,
        instructorId: course.instructorId,
        instructorName: course.instructorName,
        description: course.description,
        category: course.category,
        price: course.price,
        estimatedPrice: course.estimatedPrice,
        tags: course.tags,
        level: course.level,
        demoUrl: course.demoUrl,
        thumbnail: course.thumbnail,
      });
      setBenefits(course.benefits);
      setPrerequisites(course.prerequisites);
      setCourseContentData(course.courseData);
    }
  }, [course]);

  console.log(courseContentData);

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
        return {
          _id: courseContent._id,
          videoUrl: courseContent.videoUrl,
          title: courseContent.title,
          description: courseContent.description,
          videoSection: courseContent.videoSection,
          links: courseContent.links.map((link) => ({
            title: link.title,
            url: link.url,
          })),
          suggestion: courseContent.suggestion,
        };
      })
    );

    // const demoVideo = await UploadS3Bucket(courseInfo.demoUrl);
    // const thumnailImage = await UploadS3Bucket(courseInfo.thumbnail);

    //prepare our data object
    const data = {
      _id: courseInfo._id,
      courseTitle: courseInfo.courseTitle,
      instructorId: courseInfo.instructorId,
      instructorName: courseInfo.instructorName,
      category: courseInfo.category,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
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
            itemsToRemove={itemsToRemove}
            setItemsToRemove={setItemsToRemove}
            newUrls={newUrls}
            setNewUrls={setNewUrls}
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
            itemsToRemove={itemsToRemove}
            setItemsToRemove={setItemsToRemove}
            newUrls={newUrls}
            setNewUrls={setNewUrls}
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
            itemsToRemove={itemsToRemove}
            newUrls={newUrls}
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

export default React.memo(EditCourse);
