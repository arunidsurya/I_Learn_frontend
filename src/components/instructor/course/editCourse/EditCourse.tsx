import React, { useEffect, useState } from "react";
import CourseOptions from "./EditCourseOptions";
import LoadingComponent from "../../templates/LoadingComponent";
import { useLocation,} from "react-router-dom";
import EditCourseInformation from "./EditCourseInformation";
import EditCourseData from "./EditCourseData";
import EditCourseContent from "./EditCourseContent";
import EditCoursePreview from "./EditCoursePreview";
import EditCourseSubmitResult from "./EditCourseSubmitResult";
import { handleGetcategories } from "../../../services/api/tutorApi";
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


  const [categories, setCategories] = useState([]);

  const [itemsToRemove, setItemsToRemove] = useState<any[]>([]);

  const [newUrls, setNewUrls] = useState<any[]>([]);



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

  const getCategories = async () => {
    const res = await handleGetcategories();
    if (res?.data.success) {
      setCategories(res.data.categories);
    }
  };

  useEffect(() => {
    getCategories();
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
          <EditCourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
            categories={categories}
            itemsToRemove={itemsToRemove}
            setItemsToRemove={setItemsToRemove}
            newUrls={newUrls}
            setNewUrls={setNewUrls}
          />
        )}
        {active === 1 && (
          <EditCourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <EditCourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            itemsToRemove={itemsToRemove}
            setItemsToRemove={setItemsToRemove}
            handleSubmit={handleSubmit}
            newUrls={newUrls}
            setNewUrls={setNewUrls}
          />
        )}
        {active === 3 && (
          <EditCoursePreview
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
          <EditCourseSubmitResult
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
