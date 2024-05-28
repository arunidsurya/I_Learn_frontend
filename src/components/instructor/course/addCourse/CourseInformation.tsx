import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import * as Yup from "yup";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
  error?: string;
  categories: any[];
};

const CourseInformation: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
  categories,
  error,
}) => {
  const tutor = useSelector((state: RootState) => state.login.tutor);
  const [image, setImage] = useState<string | null>("");

  useEffect(() => {
    if (tutor) {
      setCourseInfo({
        ...courseInfo,
        instructorName: tutor.name,
        instructorId: tutor._id,
      });
    }
  }, []);

  const [dragging, setDragging] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationSchema = Yup.object({
    courseTitle: Yup.string().required("Course Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    estimatedPrice: Yup.number()
      .typeError("Price must be a number")
      .required("Estimated price is required"),
    tags: Yup.string().required("Tags is required"),
    category: Yup.string().required("category is required"),
    level: Yup.string().required("Course level is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    demoUrl: Yup.mixed().required("Demo Url is required"),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await validationSchema.validate(courseInfo, { abortEarly: false });
      setActive(active + 1);
    } catch (error: any) {
      // console.log(error.inner);

      const newError: { [key: string]: string } = {};

      error.inner.forEach((err: any) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const handleChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      setCourseInfo({ ...courseInfo, thumbnail: file });
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCategoryChange = (e: any) => {
    const selectedCategory = e.target.value;
    // console.log(selectedCategory);
    setCourseInfo({ ...courseInfo, category: selectedCategory });
  };

  return (
    <div className="w-[80%] m-auto mt-10 mb-20">
      {error && <div className="font-bold text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-gray-700 font-bold">
            Course Title
          </label>
          {errors.courseTitle && (
            <p className="text-red-500">*{errors.courseTitle}</p>
          )}
          <input
            type="text"
            name="courseTitle"
            value={courseInfo.courseTitle}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, courseTitle: e.target.value })
            }
            id="courseTitle"
            placeholder="Course title..."
            className="border border-gray-500 rounded-md h-8"
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="" className="text-gray-700 font-bold">
            Course Description
          </label>
          {errors.description && (
            <p className="text-red-500">*{errors.description}</p>
          )}
          <textarea
            name="description"
            cols={30}
            rows={8}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="description"
            placeholder="Course Description..."
            className="border border-gray-500 rounded-md "
          ></textarea>
        </div>

        <div className="flex justify-between flex-row">
          <div className="w-1/2 pr-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="text-gray-700 font-bold">
                Course Price
              </label>
              {errors.price && <p className="text-red-500">*{errors.price}</p>}
              <input
                type="number"
                name="price"
                value={courseInfo.price}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, price: e.target.value })
                }
                id="price"
                placeholder="Course Price..."
                className="border border-gray-500 rounded-md  min-w-80"
              />
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <div className="flex flex-col gap-2 h-1/2">
              <label htmlFor="" className="text-gray-700 font-bold">
                Course Estimated Price
              </label>
              {errors.estimatedPrice && (
                <p className="text-red-500">*{errors.estimatedPrice}</p>
              )}
              <input
                type="number"
                name="estimatedPrice"
                value={courseInfo.estimatedPrice}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="price"
                placeholder="Course Estimated Price..."
                className="border border-gray-500 rounded-md  min-w-80"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="" className="text-gray-700 font-bold">
            Course Tags
          </label>
          {errors.tags && <p className="text-red-500">*{errors.tags}</p>}

          <input
            name="tags"
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="Course Tags..."
            className="border border-gray-500 rounded-md h-8"
          />
        </div>
        <div className="flex justify-between flex-row">
          <div className="w-1/2 pr-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="text-gray-700 font-bold">
                Course Level
              </label>
              {errors.level && <p className="text-red-500">*{errors.level}</p>}
              <input
                type="price"
                name="level"
                value={courseInfo.level}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, level: e.target.value })
                }
                id="level"
                placeholder="Course level..."
                className="border border-gray-500 rounded-md h-8"
              />
            </div>
          </div>
          <div className="w-1/2 pr-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="category" className="text-gray-700 font-bold">
                Categories
              </label>
              {errors.category && (
                <p className="text-red-500">*{errors.category}</p>
              )}
              <select
                name="category"
                id="category"
                value={courseInfo.category}
                onChange={handleCategoryChange}
                className="border border-gray-500 rounded-md h-8 bg-white"
              >
                <option value=""> Select course category</option>
                {categories.map((category: any) => (
                  <option key={category?._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 h-1/2">
          <label htmlFor="" className="text-gray-700 font-bold">
            Demo Video
          </label>
          {errors.demoUrl && <p className="text-red-500">*{errors.demoUrl}</p>}
          <input
            type="file"
            name="demoUrl"
            accept="video/*"
            className="border border-gray-400 h-15 rounded-md bg-transparent p-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setCourseInfo({ ...courseInfo, demoUrl: file });
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            id="file"
            onChange={handleChange}
            placeholder="Course title..."
            className=" hidden"
          />
          {errors.thumbnail && (
            <p className="text-red-500">*{errors.thumbnail}</p>
          )}
          <label
            htmlFor="file"
            className={`w-full min-h[10vh] border-gray-500 rounded-md h-200 p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <img
                src={image}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                {" "}
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
          <br />
          <br />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
