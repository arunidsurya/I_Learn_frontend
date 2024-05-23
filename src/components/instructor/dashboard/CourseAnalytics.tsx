import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import { handleGetCourseAnalytics } from "../../services/api/tutorApi";


const CourseAnalytics: React.FC = () => {
  const [data, setData] = useState([]);

  const courseAanalytics = async () => {
    try {
      const response = await handleGetCourseAnalytics();
      
      if (response?.data.success) {
        setData(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    courseAanalytics();
  }, []);

  const analyticsData: any = [];

  data &&
    data.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  //  console.log(analyticsData);

  return (
    <div className="height-[50px]">
      <div className="h-[80vh] w-[80vw]">
        <div className="mt-[50px]">
          <h1 className="font-bold text-[2rem] text-gray-500 px-4">
            Courses Analytics
          </h1>
          <p className="font-bold text-[1rem] text-gray-500 px-5 mb-8">
            Last 12 months analytics data
          </p>
        </div>
        <div className="w-full h-[90%] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="50%">
            <BarChart width={150} height={300} data={analyticsData}>
              <XAxis dataKey="name">
                <Label offset={0} position={"insideBottom"} />
              </XAxis>
              <YAxis domain={[minValue, "auto"]} />
              <Bar dataKey="uv" fill="#3faf82">
                <LabelList dataKey="uv" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;
