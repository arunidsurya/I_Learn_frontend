import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import * as Yup from "yup";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const validationSchema = Yup.object().shape({
  benefits: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Benefit is required"),
    })
  ),
  prerequisites: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Prerequisite is required"),
    })
  ),
});

const CourseData: React.FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };
  const handlePrequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  // const handleOptions = () => {
  //   if (
  //     benefits[benefits.length - 1]?.title !== "" &&
  //     prerequisites[prerequisites.length - 1]?.title !== ""
  //   ) {
  //     setActive(active + 1);
  //     setError("");
  //   } else {
  //     setError("Please fill all the fields!!!");
  //   }
  // };

    const handleOptions = async () => {
      try {
        await validationSchema.validate(
          { benefits, prerequisites },
          { abortEarly: false }
        );
        setActive(active + 1);
      } catch (error:any) {
        const validationErrors: { [key: string]: string } = {};
        
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    };

  return (
    <div className="w-[80%] m-auto mt-24 mb-20">
      <div className="flex flex-col gap-4 mb-20">
        {/* {error && (
          <div className="font-bold text-red-500">
            <h1>{error}</h1>
          </div>
        )} */}
        <label htmlFor="benefits" className="text-gray-700 font-bold">
          What are the benefits for students in this course?
        </label>
        {benefits.map((benefit: any, index: number) => (
          <div key={index}>
            <input
              type="text"
              key={index}
              name="Benefit"
              placeholder="you will be able build a fulls stack prject platform..."
              required
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
              className="border border-gray-500 rounded-md h-8 p-4 w-full"
            />
            {errors[`benefits[${index}].title`] && (
              <div className="text-red-500">
                {errors[`benefits[${index}].title`]}
              </div>
            )}
          </div>
        ))}
        <IoMdAddCircleOutline size={20} onClick={handleAddBenefits} />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="benefits" className="text-gray-700 font-bold">
          What are the prereauisites of this course?
        </label>
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisite"
            placeholder="You need basics of MERN stack..."
            required
            value={prerequisite.title}
            onChange={(e) => handlePrequisiteChange(index, e.target.value)}
            className="border border-gray-500 rounded-md h-8 p-4"
          />
        ))}
        <IoMdAddCircleOutline size={20} onClick={handleAddPrerequisite} />
      </div>
      <div className="flex justify-between">
        <input
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] items-center rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
          type="button"
          value="Prev"
        />

        <input
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center items-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
          type="button"
          value="Next"
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseData;
