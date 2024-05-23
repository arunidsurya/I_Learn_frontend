import React, { useEffect, useState } from 'react'
import {BarChart,Bar,ResponsiveContainer,XAxis,Label,YAxis,LabelList} from 'recharts'
import { handleGetCourseAnalytics } from '../../../services/api/adminApi'

const CourseAnalytics:React.FC = () => {

    const [data, setData] = useState([])

    // const analyticsData = [
    //   { name: "Jun 2023", uv: 3 },
    //   { name: "July 2023", uv: 2 },
    //   { name: "August 2023", uv: 5 },
    //   { name: "Sept 2023", uv: 7 },
    //   { name: "October 2023", uv: 2 },
    //   { name: "Nov 2023", uv: 5 },
    //   { name: "December 2023", uv: 7 },
    // ];

    const courseAanalytics=async()=>{
        try {
            const response = await handleGetCourseAnalytics();
            if(response?.data.success){
                setData(response.data.courses)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
            courseAanalytics();
    },[])

    const analyticsData: any =[];

   
     data && 
     data.forEach((item:any)=>{
        analyticsData.push({name:item.month, uv:item.count})
     })

    const minValue=0

    //  console.log(analyticsData);

  return (
    <div className='height-[50px]'>
      <div className="h-[80vh] ">
        <div>
          <h1 className="font-bold text-[2rem] text-gray-500 px-4">
            Courses Analytics
          </h1>
          <p className="font-bold text-[1rem] text-gray-500 px-5 ">
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
}

export default CourseAnalytics