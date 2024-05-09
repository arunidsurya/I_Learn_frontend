import Api from "../axios/axiosService";
import userRoutes from "../endpoints/userEndpoint";

export const login= async(email:string,password:string)=>{
    try {
        const res = await Api.post(userRoutes.login,{email,password});
        return res
    } catch (error:any) {
        console.log(error);
        
    }
}

export const signup = async (name:string, email: string, gender:string, password: string) => {
  try {
    const res = await Api.post(userRoutes.signup, { name,email, gender, password, });
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const getCourseContent = async (
courseId:string
) => {
  try {
    const res = await Api.get(`${userRoutes.getCourseContent}/${courseId}`);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const addQuestion = async(courseId:string,contentId:string,question:string) =>{
  try {
    const res = await Api.put(userRoutes.addQuestion,{courseId,contentId,question});
    return res;
  } catch (error) {
    console.log(error);
    
  }
}

export const addAnswer = async(courseId:string,contentId:string,questionId:string,answer:string) =>{
  try {
    const res = await Api.put(userRoutes.addAnswer,{courseId,contentId,questionId,answer});
    return res;
  } catch (error) {
    console.log(error);
    
  }
}



