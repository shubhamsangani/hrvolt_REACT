import { Dispatch } from "redux";



import {
 TokenBaseFetchApi,
 FetchAPI,
 GetFetchAPI,
 userRegisterAPI,
 viewUserProfileAPI,
 emailVerificationAPI,
 otpVerificationAPI,
 sectorGetDetailsAPI,
 companyTypeGetDetailsAPI,
 recruiterCompanyRegisterAPI,
 userCompanyAPI,
 jobPositionBySearchAPI,


  jobDescriptionRegisterAPI,
  educationJobDescriptionRegisterAPI,
  educationFieldJobDescriptionRegisterAPI,
  technicalskillsJobDescriptionRegisterAPI,
  softskillsJobDescriptionRegisterAPI,
  customjobDescriptionResponsibilityRegisterAPI,
  jobDescriptionResponsibilityRegisterAPI,
  customjobDescriptionRequirementRegisterAPI,
  customjobDescriptionBenefitRegisterAPI,
  jobDescriptionBenefitRegisterAPI,
  jobDescriptionEmploymentTypeDetailRegisterAPI,
  nationalityJobDescriptionRegisterAPI,
  genderJobDescriptionRegisterAPI,
  workPlaceJobDescriptionRegisterAPI,
  languageJobDescriptionRegisterAPI,
  joiningperiodJobDescriptionRegisterAPI,

//   jobDescriptioncompanyLocationDetailRegisterAPI,
  autoJobDescriptionAPI,
  RecruiterBulkResumeUploadAPI,
  RecruiterResumeJobDescriptionCompareAPI,
  userCompanyUpdateAPI

  


} from "../api"

import { IProfileDetails, IProfileDetailsAI } from "../../app/modules/hrvolt/jd/components/AutoJdModel";

// type ResumeData = {
//   resume_file_path: string;
//   text: string;
//   candidate_name: string;
//   aiCompPercentageScore: number;
// };

// type ResumeList = ResumeData[];


type RecruiterDetails = {
  softSkills: string[];
  technicalSkills: string[];
  responsibilities: string;
};

type ResumeDetails = {
  resumeFilePath: string;
  resume_file_path: string;
  text: string;
  candidateName: string;
  aiCompPercentageScore: number;
};

type JobApplicationDetails = {
  userId: string;
  jobDescriptionId: string;
  recruiterDetails: RecruiterDetails;
  aiCompPercentageScore: ResumeDetails[];
  type: string;
};



interface UserDispatchAction {
    type: string;
    payload: {
      data: object;
    };
  }


  interface SearchAction {
    type: string,
    payload: object,
    key: string
  }


  interface JobDescriptionDispatch {
    type: string,
  }

  
export const userRegisterCall = (sendData: object) => async (dispatch: Dispatch<UserDispatchAction>) => {

    try {

        const { data } = await FetchAPI(
            userRegisterAPI(),
            "POST",
            sendData
        );


        dispatch({
            type: "ADDED_MAIN_USER",
            payload: {
                data: data?.Data || [],
            },
        });


        return data?.Data || data

    } catch(error) {

        return {
            "errorMsg" : 'something goes wrong !!'
        }

    }
};


export const getUserDetails = (sendData: object, token: string) => async (dispatch: Dispatch<UserDispatchAction>) => {
   
  
    const { data } = await TokenBaseFetchApi(
      viewUserProfileAPI(),
      "POST",
      sendData,
      token
    );
  
    dispatch({
      type: "GET_USER_DETAIL",
      payload: {
        data: data,
      },
    });
};


export const clearDetails = () => ({
    type: "CL_DETAIL",
});
  

export const userEmailVerificationCall = (sendData: object) => async (dispatch: Dispatch<UserDispatchAction>) => {

    try {

        const { data } = await FetchAPI(
            emailVerificationAPI(),
            "POST",
            sendData
        );
        
        dispatch({
            type: "ADDED_USER_VERIFICATION",
            payload: {
                data: data?.Data || [],
            },
        });

        return data?.Data || []

    } catch(error) {

        return {
            "errorMsg" : 'something goes wrong !!'
        }

    }
};


export const otpVerificationCall = (sendData: object) => async (dispatch: Dispatch<UserDispatchAction>) => {

    try {

        const { data } = await FetchAPI(
            otpVerificationAPI(),
            "PATCH",
            sendData
        );
        
        dispatch({
            type: "ADDED_USER_VERIFICATION",
            payload: {
                data: data?.Data || [],
            },
        });

        return data?.Data || data

    } catch(error) {

        return {
            "errorMsg" : 'something goes wrong !!'
        }

    }
};


export const sectorDatabaseCall = () => async (dispatch: Dispatch<UserDispatchAction>) => {

    try {

        const { data } = await GetFetchAPI(
            sectorGetDetailsAPI(),
            "GET",
        );
        
        dispatch({
            type: "GET_SECTOR",
            payload: {
                data: data?.Data || [],
            },
        });

        return data

    } catch(error) {

        return {
            "errorMsg" : 'something goes wrong !!'
        }

    }
};


export const companyTypeDatabaseCall = () => async (dispatch: Dispatch<UserDispatchAction>) => {

    try {

        const { data } = await GetFetchAPI(
            companyTypeGetDetailsAPI(),
            "GET",
        );
        
        dispatch({
            type: "GET_COMPANY_TYPE",
            payload: {
                data: data?.Data || [],
            },
        });

        console.log("puuu", data)

        return data

    } catch(error) {

        return {
            "errorMsg" : 'something goes wrong !!'
        }

    }
};


export const companyRegisterCall = (sendData: object) => async (dispatch: Dispatch<UserDispatchAction>) => {

    try {

        const { data } = await FetchAPI(
            recruiterCompanyRegisterAPI(),
            "POST",
            sendData
        );
        
        dispatch({
            type: "ADDED_COMPANY",
            payload: {
                data: data?.Data || [],
            },
        });

        if("Data" in data){

            const inpData = {
                "user_id" : data.Data.user_id,
                "company_info_id": data.Data.company_info_id
            }

            const { data: userCompany } = await FetchAPI(
                userCompanyAPI(),
                "POST",
                inpData
            );

            dispatch({
                type: "ADDED_USER_COMPANY",
                payload: {
                    data: userCompany?.Data || [],
                },
            });

            return userCompany?.Data || []

        }else{
            
            return data?.Data || []
        }

    } catch(error) {

        return {
            "errorMsg" : 'something goes wrong !!'
        }

    }
};


export const companyRegister = (sendData: object) => async (dispatch: Dispatch<UserDispatchAction>) => {

  try {

    const { data } = await FetchAPI(
      userCompanyUpdateAPI(),
      "patch",
      sendData
    );

    dispatch({
      type: "ADDED_USER_COMPANY",
      payload: {
          data: data?.Data || [],
      },
    });

    return data?.Data || {}



    } catch(error) {

      console.log("Compsny Update error API")

    }

};


export const jobPositionDatabaseBySearchCall = (sendData: object) => async (dispatch: Dispatch<UserDispatchAction>) => {

    try {

        const { data } = await FetchAPI(
            jobPositionBySearchAPI(),
            "POST",
            sendData,
        );
        
        dispatch({
            type: "GET_JOB_POSITION",
            payload: {
                data: data?.Data || [],
            },
        });

        return data

    } catch(error) {

        return {
            "errorMsg" : 'something goes wrong !!'
        }

    }
};


export const setDropdownOptions = (data: object, key: string) => async (dispatch: Dispatch<SearchAction>) => {

    dispatch({
      type: "SET_OPTIONS",
      payload: data,
      key
    });
    
};


export const jobDescriptionRegisterAI = (e: IProfileDetailsAI, token: string, user_id: string) => async (dispatch: Dispatch<JobDescriptionDispatch>) => {

    try {

        const inpData = {
        "job_position_id": e.jobPosition.value,
        "job_level_id": e.jobLevel.value,
        "user_id":user_id
        }
    
        const { data } = await TokenBaseFetchApi(
            autoJobDescriptionAPI(),
            "POST",
            inpData,
            token
        );

        dispatch({
            type: "ADDED_JOB_POST_AI",

        });
    
        return data?.Data || [];

    } catch (error) {
        console.error("Error in Job register api call", error);
    }
}


export const jobDescriptionRegister = (e: IProfileDetails, token: string, user_id: string) => async (dispatch: Dispatch<JobDescriptionDispatch>) => {

    // Job register
    

  try {

    let status : string = ""

    if(e.jobPostStatus == true){
        status = "active"
    }else{
        status = "deactive"
    }
    
      dispatch({
        type: "UPDATING_JOB_REGISTER",
        
      });

  
      const inpData = {
        "job_position_id": e.jobPosition.value,
        "job_level_id": e.jobLevel.value,
        "user_id":user_id,
        "number_of_vacancy":e.jobNumberVacancy,
        "salary_max":e.jobMaxSalary,
        "salary_min":e.jobMinsalary,
        "job_tilte": e.jobTitle,
        "job_description_action": status
  
      }
  
      const { data : jobData } = await TokenBaseFetchApi(
        jobDescriptionRegisterAPI(),
          "POST",
          inpData,
          token
      );
  
    
    // Job Education
  
    try {
  
      if(e.JobEduation.length > 0){
  
        dispatch({
          type: "UPDATING_Job_EDU",
        });
  
        for (const key in e.JobEduation) {
          
          const item = e.JobEduation[key];
  
          const educationData =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "education_id": item.value,
          }
  
           await TokenBaseFetchApi(
            educationJobDescriptionRegisterAPI(),
              "POST",
              educationData,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_EDU",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Education api call", error);
    }
  
    // Job Education
  
    try {
  
      if(e.jobEduationField.length > 0){
  
        dispatch({
          type: "UPDATING_Job_EDU_FIELD",
        });
  
        for (const key in e.jobEduationField) {
          
          const item = e.jobEduationField[key];
  
          const educationFieldData =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "education_field_id": item.value,
          }
  
          await TokenBaseFetchApi(
            educationFieldJobDescriptionRegisterAPI(),
              "POST",
              educationFieldData,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_EDU_FIELD",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Education Field api call", error);
    }
  
  
    // Technical Skills
  
    try {
  
      if(e.jobTechnicalSkills.length > 0){
  
        dispatch({
          type: "UPDATING_Job_Tech",
        });
  
        for (const key in e.jobTechnicalSkills) {
          
          const item = e.jobTechnicalSkills[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "technical_skills_id": item.value,
          }

          console.log(inpData);
  
          await TokenBaseFetchApi(
              technicalskillsJobDescriptionRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_Tech",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Tech api call", error);
    }
  
    // Soft Skills
  
    try {
  
      if(e.jobSoftSkills.length > 0){
  
        dispatch({
          type: "UPDATING_Job_SOFT",
        });
  
        for (const key in e.jobSoftSkills) {
          
          const item = e.jobSoftSkills[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "soft_skills_id": item.value,
          }
  
          await TokenBaseFetchApi(
              softskillsJobDescriptionRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_SOFT",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Soft api call", error);
    }
  
  
    // Custom Responsibilities

    if(e.jobManualResp != ""){
  
        try {
        
        dispatch({
            type: "UPDATING_Job_Custom_Job_resp",
        });
    
    
        const inpResData = {
            "user_id":user_id,
            "job_description_id": jobData.Data.job_description_id,
            "job_position_id": e.jobPosition.value,
            "responsibilities_description": e.jobManualResp,
            "job_level_id": e.jobLevel.value
        }
    
    
        const { data : jobResData } = await TokenBaseFetchApi(
            customjobDescriptionResponsibilityRegisterAPI(),
            "POST",
            inpResData,
            token
        );
    
        dispatch({
            type: "ADDED_Job_Custom_Job_resp",
            payload: {
            data : jobResData.Data
            },
        });
    
        } catch (error) {
        console.error("Error in Job Custom Resp api call", error);
        }
  
    }
  
  
    // Custom Requirements

    if(e.jobManualReq != ""){
  
        try {
        
        dispatch({
            type: "UPDATING_Job_Custom_Job_req",
        });
    
    
        const inpReqData = {
            "user_id":user_id,
            "job_description_id": jobData.Data.job_description_id,
            "job_position_id": e.jobPosition.value,
            "requirement_description": e.jobManualReq,
            "job_level_id": e.jobLevel.value
        }
    
        const { data : jobReqData } = await TokenBaseFetchApi(
            customjobDescriptionRequirementRegisterAPI(),
            "POST",
            inpReqData,
            token
        );
    
        dispatch({
            type: "ADDED_Job_Custom_Job_req",
            payload: {
            data : jobReqData.Data
            },
        });
    
        } catch (error) {
        console.error("Error in Job Custom Req api call", error);
        }

    }
  
  
    // Custom Benefits

    if(e.jobManualBenefit != ""){
  
        try {
        
        dispatch({
            type: "UPDATING_Job_Custom_Job_benefits",
        });
    
    
        const inpReqData = {
            "user_id":user_id,
            "job_description_id": jobData.Data.job_description_id,
            "job_position_id": e.jobPosition.value,
            "benefit_description": e.jobManualBenefit,
            "job_level_id": e.jobLevel.value
        }
    
        const { data : jobBenefitsData } = await TokenBaseFetchApi(
            customjobDescriptionBenefitRegisterAPI(),
            "POST",
            inpReqData,
            token
        );
    
        dispatch({
            type: "ADDED_Job_Custom_Job_benefits",
            payload: {
            data : jobBenefitsData.Data
            },
        });
    
        } catch (error) {
        console.error("Error in Job Custom Benefits api call", error);
        }

    }
  
  
    // Job Responsibilities
  
    try {
  
      if(e.jobResp.length > 0){
  
        dispatch({
          type: "UPDATING_Job_RES",
        });
  
        for (const key in e.jobResp) {
          
          const item = e.jobResp[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "job_responsibility_id": item.value,
          }
  
          await TokenBaseFetchApi(
              jobDescriptionResponsibilityRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_RES",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Responsibilities api call", error);
    }
  
  
    // Job benefits
  
    try {
  
      if(e.jobBenefit.length > 0){
  
        dispatch({
          type: "UPDATING_Job_Benefits",
        });
  
        for (const key in e.jobBenefit) {
          
          const item = e.jobBenefit[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "job_benefit_id": item.value,
          }
  
          await TokenBaseFetchApi(
            jobDescriptionBenefitRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_Benefits",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job benefits api call", error);
    }
  
  
    // Job Employment Type
  
    try {
  
      if(e.jobEmpType.length > 0){
  
        dispatch({
          type: "UPDATING_Job_comp_employment",
        });
  
        for (const key in e.jobEmpType) {
          
          const item = e.jobEmpType[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "employment_type_id": item.value,
          }
  
          await TokenBaseFetchApi(
            jobDescriptionEmploymentTypeDetailRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_comp_employment",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job employment type api call", error);
    }
  
    // Job Nationality
  
    try {
  
      if(e.jobNationality.length > 0){
  
        dispatch({
          type: "UPDATING_Job_nationality",
        });
  
        for (const key in e.jobNationality) {
          
          const item = e.jobNationality[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "nationality_id": item.value,
          }
  
          await TokenBaseFetchApi(
              nationalityJobDescriptionRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_nationality",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Nationality api call", error);
    }
  
    // Job Gender
  
    try {
  
      if(e.jobGender.length > 0){
  
        dispatch({
          type: "UPDATING_Job_gender",
        });
  
        for (const key in e.jobGender) {
          
          const item = e.jobGender[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "gender": item.value,
          }
  
          await TokenBaseFetchApi(
              genderJobDescriptionRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_gender",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Gender api call", error);
    }
  
  
    // Job Work place
  
    try {
  
      if(e.jobWorkPlace.length > 0){
  
        dispatch({
          type: "UPDATING_Job_work_place",
        });
  
        for (const key in e.jobWorkPlace) {
          
          const item = e.jobWorkPlace[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "work_place_id": item.value,
          }
  
          await TokenBaseFetchApi(
               workPlaceJobDescriptionRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_work_place",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Work Place api call", error);
    }
  
  
    // Job language
  
    try {
  
      if(e.jobLang.length > 0){
  
        dispatch({
          type: "UPDATING_Job_Lang",
        });
  
        for (const key in e.jobLang) {
          
          const item = e.jobLang[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "language_id": item.value,
          }
  
          await TokenBaseFetchApi(
              languageJobDescriptionRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_Lang",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job language api call", error);
    }
  
  
    // Job Joining period
  
    try {
  
      if(e.jobJoinPeriod.length > 0){
  
        dispatch({
          type: "UPDATING_Job_joining_period",
        });
  
        for (const key in e.jobJoinPeriod) {
          
          const item = e.jobJoinPeriod[key];
  
          const inpdata =  {
            "user_id": user_id,
            "job_description_id":jobData.Data.job_description_id,
            "joining_period_id": item.value,
          }
  
         await TokenBaseFetchApi(
            joiningperiodJobDescriptionRegisterAPI(),
              "POST",
              inpdata,
              token
            );
  
        }
  
        dispatch({
          type: "ADDED_Job_joining_period",
        });
  
      }
      
    } catch (error) {
    console.error("Error in Job Joining period api call", error);
    }
    
    // Job Location
  
    // try {
  
    //     if(e.jobLocation.length > 0){
    
    //         dispatch({
    //         type: "UPDATING_Job_location",
    //         });
    
    //         for (const key in e.jobLocation) {
            
    //         const item = e.jobLocation[key];
    
    //         const inpdata =  {
    //             "user_id": user_id,
    //             "job_description_id":jobData.Data.job_description_id,
    //             "company_location_id": item.value,
    //             "work_place_id": ""
    //         }
    
    //         await TokenBaseFetchApi(
    //             jobDescriptioncompanyLocationDetailRegisterAPI(),
    //             "POST",
    //             inpdata,
    //             token
    //             );
    
    //         }
    
    //         dispatch({
    //         type: "ADDED_Job_location",
    //         });
    
    //     }
      
    // } catch (error) {
    // console.error("Error in Job Location api call", error);
    // }


    dispatch({
      type: "ADDED_JOB_REGISTER",
      payload: {
        data : jobData.Data
      },
    });

    return jobData
  
  
  } catch (error) {
    console.error("Error in Job register api call", error);
  }

  
};

export const bulkResumeRegister = async (e: object, jobpost: string, userid: string, token: string): Promise<JobApplicationDetails | null> => {
  try {
    // First API call
    const { data } = await TokenBaseFetchApi(
      RecruiterBulkResumeUploadAPI(),
      "POST",
      e,
      token
    );

    if ("Data" in data) {
      const inp = {
        "user_id": userid,
        "job_description_id": jobpost,
        "recruiter_bulk_resume_upload_id":  data.Data.recruiter_bulk_resume_upload_id
      };

      const { data: compareOutput } = await TokenBaseFetchApi(
        RecruiterResumeJobDescriptionCompareAPI(),
        "POST",
        inp,
        token
      );

      console.log("compare outputtt:", compareOutput);

      return compareOutput?.Data || null;
    }

    return null;
  } catch (error) {
    console.error("Error in Candidate preference and resume upload APIs call", error);
    return null;
  }
};

