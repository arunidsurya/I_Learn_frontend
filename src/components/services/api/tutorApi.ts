import Api from "../axios/axiosService";
import tutorRoutes from "../endpoints/tutorEndpoint";


export const handleLogout = async()=>{
try {
  const res = await Api.get(tutorRoutes.logout);
  return res
} catch (error) {
  console.log(error);
  
}
}

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

export const handleGetAllCourses = async (tutorId: string) => {
  try {
    const res = await Api.get(`${tutorRoutes.getAllCourses}/${tutorId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleGetNonApprovedCourses = async (tutorId: string) => {
  try {
    const res = await Api.get(`${tutorRoutes.getNonApprovedCourses}/${tutorId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteCourse = async (courseId: string) => {
  try {
    const res = await Api.delete(`${tutorRoutes.deleteCourse}/${courseId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetStudents= async (tutorId: string) => {
  try {
    const res = await Api.get(`${tutorRoutes.getStudents}/${tutorId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetSearchResults = async (searchKey: string) => {
  try {
    const res = await Api.post(tutorRoutes.getSearchResult, { searchKey });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleReplyToQuestion = async (
  courseId: string,
  contentId: string,
  questionId: string,
  answer: string
) => {
  try {
    const res = await Api.put(tutorRoutes.replyQuestion, {
      courseId,
      contentId,
      questionId,
      answer,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCredentials = async () => {
  try {
    const res = await Api.get(tutorRoutes.getVideoCallCredentials);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCourseAnalytics = async () => {
  try {
    const res = await Api.get(tutorRoutes.getCourseAnalaytics);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetOrderAnalytics = async () => {
  try {
    const res = await Api.get(tutorRoutes.getOrderAnalytics);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetUserAnalytics = async () => {
  try {
    const res = await Api.get(tutorRoutes.getUserAnalytics);

    return res;
  } catch (error) {
    console.log(error);
  }
};
