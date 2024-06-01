import Api from "../axios/axiosService";
import userRoutes from "../endpoints/userEndpoint";

export const login = async (email: string, password: string) => {
  try {
    const res = await Api.post(userRoutes.login, { email, password });
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const handleGoogleSignIn = async (name:any,email: any, avatar: any) => {
  try {
    const res = await Api.post(userRoutes.googleSignIn, { name, email, avatar });
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await Api.get(userRoutes.logout);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (
  name: string,
  email: string,
  gender: string,
  password: string
) => {
  try {
    const res = await Api.post(userRoutes.signup, {
      name,
      email,
      gender,
      password,
    });
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const getCourseContent = async (courseId: string) => {
  try {
    const res = await Api.get(`${userRoutes.getCourseContent}/${courseId}`);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const addQuestion = async (
  courseId: string,
  contentId: string,
  question: string
) => {
  try {
    const res = await Api.put(userRoutes.addQuestion, {
      courseId,
      contentId,
      question,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addAnswer = async (
  courseId: string,
  contentId: string,
  questionId: string,
  answer: string
) => {
  try {
    const res = await Api.put(userRoutes.addAnswer, {
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

export const getChat = async (courseId: string) => {
  try {
    const res = await Api.get(`${userRoutes.getChat}/${courseId}`);
    
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addChat = async (
  courseId: string,
  userId: string,
  userName: string,
  message: string
) => {
  try {
    // console.log(userName, userId, courseId, message);

    const res = await Api.put(userRoutes.addChat, {
      courseId,
      userId,
      userName,
      message,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    // console.log(userName, userId, courseId, message);

    const res = await Api.put(userRoutes.changePassword, {
      email,
      oldPassword,
      newPassword,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfo = async (
  _id: string,
  name: string,
  email: string,
  avatar: string
) => {
  try {
    // console.log(userName, userId, courseId, message);

    const res = await Api.put(userRoutes.updateUserInfo, {
      _id,
      name,
      email,
      avatar,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const enrolledCourses = async (userId: string) => {
  try {
    const res = await Api.get(`${userRoutes.enrolledCourses}/${userId}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCourses = async () => {
  try {
    const res = await Api.get(userRoutes.courses);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetOneCourse = async (courseId: string) => {
  try {
    const res = await Api.get(`${userRoutes.getOneCourse}/${courseId}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateOrder = async (
  courseId: string,
  payment_info: any
) => {
  try {
    const res = await Api.post(userRoutes.createOrder, {
      courseId,
      payment_info,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetStripePublishablekey = async () => {
  try {
    const res = await Api.get(userRoutes.getStripepublishablekey);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleCoursePayment = async (amount: number) => {

  try {
    const res = await Api.post(userRoutes.coursePayment, { amount });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddReview = async (
  courseId: string,
  rating: number,
  review: string
) => {
  try {
    const res = await Api.put(`${userRoutes.addReview}/${courseId}`, {
      courseId,
      rating,
      review,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddProgress = async (
  courseId: string,
  contentId: string
) => {
  try {
    const res = await Api.put(userRoutes.addProgress, {
      courseId,
      contentId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetPremiumPackages = async () => {
  try {
    const res = await Api.get(userRoutes.getPremiumPackages);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetVideoCallCredentials = async () => {
  try {
    const res = await Api.get(userRoutes.getVideoCallCredentials);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetSearchResults = async (searchKey: string) => {
  try {
    const res = await Api.post(userRoutes.getSearchResult, { searchKey });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCategories = async () => {
  try {
    const res = await Api.get(userRoutes.getCategories);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCourseByCategory = async (category: string) => {
  try {
    const res = await Api.post(userRoutes.getCourseByCategory, { category });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleCreatePremiumOrder = async (payment_info: any) => {
  try {
    const res = await Api.post(userRoutes.createPremiumOrder, { payment_info });
    return res;
  } catch (error) {
    console.log(error);
  }
};