import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { handleGetOrderAnalytics, handleGetUserAnalytics } from "../../../services/api/adminApi";


type Props={
    isDashboard?:boolean
}

const UserAnalytics:React.FC<Props> = ({isDashboard}) => {

        const [data, setData] = useState([]);

        // const analyticsData = [
        //   { name: "Jun 2023", count: 0 },
        //   { name: "July 2023", count: 8 },
        //   { name: "August 2023", count: 5 },
        //   { name: "Sept 2023", count: 7 },
        //   { name: "October 2023", count: 2 },
        //   { name: "Nov 2023", count: 5 },
        //   { name: "December 2023", count: 0 },
        // ];


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
          !isDashboard ? "mt-[20px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"
        }`}
      >
        <div className={`${isDashboard ? "!ml-8 mb-5" : " "}`}>
          <h1
            className={`font-bold text-[2rem] text-gray-500 px-4 ${
              isDashboard && "!text-[20px]"
            } px-5 !text-start`}
          >
            User Analytics
          </h1>
          {!isDashboard && (
            <p className="font-bold text-[1rem] text-gray-500 px-5 mb-8">
              Last 12 months analytics data
            </p>
          )}
        </div>
        <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center `}>
          <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? "50%" : "100%"}>
            <AreaChart margin={{top:20, right:30,left:0,bottom:0}} data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis  />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="#4d62d9" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default UserAnalytics;
