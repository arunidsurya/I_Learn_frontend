import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import {
  handleGetUserAnalytics,
} from "../../../services/api/adminApi";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: React.FC<Props> = ({ isDashboard }) => {
  const [data, setData] = useState([]);

  const userAanalytics = async () => {
    try {
      const response = await handleGetUserAnalytics();
      if (response?.data.success) {
        setData(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userAanalytics();
  }, []);

  const analyticsData: any = [];

  data &&
    data.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      <div
        className={`${
          !isDashboard ? "mt-[0px]" : "mt-[0px] shadow-sm pb-5 rounded-sm"
        }`}
      >
        <div>
          <h1 className="font-bold text-[2rem] text-gray-500 px-4">
            Users Analytics
          </h1>
          <p className="font-bold text-[1rem] text-gray-500 px-5 mb-8">
            Last 12 months analytics data
          </p>
        </div>
        <div
          className={`w-full ${
            isDashboard ? "h-[30vh]" : "h-screen"
          } flex items-center justify-center `}
        >
          <ResponsiveContainer
            width={isDashboard ? "100%" : "90%"}
            height={!isDashboard ? "50%" : "100%"}
          >
            <AreaChart
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              data={analyticsData}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#4d62d9"
                fill="#4d62d9"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default UserAnalytics;
