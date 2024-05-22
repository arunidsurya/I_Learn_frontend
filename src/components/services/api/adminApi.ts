import Api from "../axios/axiosService";
import adminRoutes from "../endpoints/adminEndpoint";

export const login = async (email: string, password: string) => {
  try {
    const res = await Api.post(adminRoutes.login, { email, password });
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await Api.get(adminRoutes.logout);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const viewCategory = async () => {
  try {
    const res = await Api.get(adminRoutes.viewCategory);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const addCategory = async (name: string, description: string) => {
  try {
    const res = await Api.post(adminRoutes.addCategory, { name, description });
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const editCategory = async (
  _id: string,
  name: string,
  description: string
) => {
  try {
    const res = await Api.put(adminRoutes.editCategory, {
      _id,
      name,
      description,
    });
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteCategory = async (_id: string) => {
  try {
    const res = await Api.delete(`${adminRoutes.deleteCategory}/${_id}`);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const getNonApprovedCourses = async () => {
  try {
    const res = await Api.get(adminRoutes.nonApprovedCourses);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const getCourses = async () => {
  try {
    const res = await Api.get(adminRoutes.courses);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const handleChangeCourseStatus = async (
  status: string,
  courseId: string
) => {
  try {
    const res = await Api.put(adminRoutes.changeCourseStatus, {
      status,
      courseId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handlegetTutors = async () => {
  try {
    const res = await Api.get(adminRoutes.getTutors);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleChangeTutorStatus = async (method: string, _id: string) => {
  try {
    const res = await Api.post(`${adminRoutes.tutorVerificaton}/${method}`, {
      _id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleEditTutor = async (
  _id: string,
  name: string,
  email: string,
  institute: string,
  qualifiaction: string,
  experience: string
) => {
  try {
    const res = await Api.post(adminRoutes.editTutor, {
      _id,
      name,
      email,
      institute,
      qualifiaction,
      experience,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handlegetNotifications = async () => {
  try {
    const res = await Api.get(adminRoutes.getNotifications);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCourseAnalytics = async () => {
  try {
    const res = await Api.get(adminRoutes.getCourseAnalytics);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleGetOrderAnalytics = async () => {
  try {
    const res = await Api.get(adminRoutes.getOrderAnalytics);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetUserAnalytics = async () => {
  try {
    const res = await Api.get(adminRoutes.getUserAnalytics);

    
    return res;

  } catch (error) {
    console.log(error);
  }
};

export const handleChangeNotificationStatus = async (id:string) => {
  try {
    const res = await Api.get(`${adminRoutes.changeNotificationStatus}/${id}`);


    return res;
  } catch (error) {
    console.log(error);
  }
};

