import Api from "../axios/axiosService";
import tutorRoutes from "../endpoints/tutorEndpoint";

export const handleAddSchedule = async (
  courseId: string,
  date:string,
  time:string,
  meetingCode:string,
  description:string
) => {
  try {
    const res = await Api.put(`${tutorRoutes.addSchedule}/${courseId}`, {
      date,time,meetingCode,description
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetOneCourse = async (
  courseId: string,
) => {
  try {
    const res = await Api.get(`${tutorRoutes.getOneCourse}/${courseId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};