
// const baseURL = "http://103.10.234.158:8000";
const baseURL = "https://hrapis-yash.hrvolt.in";

import Axios from "axios";


// Auth Token APIs

const generateToken = "/userLoginApis/generateToken/";
const verifyToken = "/userLoginApis/verifyToken/";
const refreshToken = "/userLoginApis/refreshToken/";


export const generateTokenAPI = () => `${baseURL}${generateToken}`;
export const verifyTokenAPI = () => `${baseURL}${verifyToken}`;
export const refreshTokenAPI = () => `${baseURL}${refreshToken}`;




// Auth User Register APIs

const registerUser = "/userLoginApis/registerUser";
const viewUserProfile = "/userLoginApis/ViewUserProfile";

const loginUser = "/userLoginApis/loginUser";
const loggedinUser = "/userLoginApis/loggedInUpdateUser";
const logoutUser = "/userLoginApis/logoutUser";

export const userRegisterAPI = () => `${baseURL}${registerUser}`;
export const viewUserProfileAPI = () => `${baseURL}${viewUserProfile}`;

export const loginUserAPI = () => `${baseURL}${loginUser}`;
export const logoutUserAPI = () => `${baseURL}${logoutUser}`;
export const loggedinUserAPI = () => `${baseURL}${loggedinUser}`;
export const userLogoutAPI = () => `${baseURL}${logoutUser}`;


// Email Verification APIs

const emailVerification = "/userLoginApis/emailVerificationUser";
const otpVerification = "/userLoginApis/emailVerificationCompletion";

export const emailVerificationAPI = () => `${baseURL}${emailVerification}`;
export const otpVerificationAPI = () => `${baseURL}${otpVerification}`;


// Database APIs 

const sectorGetDetails="/databaseApis/sectorGet"
const companyTypeGetDetails="/databaseApis/companyTypeGet"

const hrvoltNationality = "/databaseApis/nationalityGet"
const usergettechnicalskillsDetails="/databaseApis/UniqueTechnicalSkillsGet"
const usergetsoftskillsDetails="/databaseApis/softSkillsGet"
const usergetJobpositionDetails="/databaseApis/jobPositionGet"
const usergetJoblevelDetails="/databaseApis/jobLevelGet"
const usergetWorkPlaceDetails="/databaseApis/workPlaceGet"
const usergetEducationDetails="/databaseApis/educationGet"
const usergetEducationFieldDetails="/databaseApis/educationFieldGet"
const usergetLocationDetails="/databaseApis/locationGet"
const employmentTypeGetDetails="/databaseApis/employmentTypeGet"
const joiningPeriodGetDetails="/databaseApis/joiningPeriodGet"
const responsibilitiesGetDetails="/databaseApis/jobResponsibilityGet"
const benefitsGetDetails="/databaseApis/jobBenefitGet"

export const companyTypeGetDetailsAPI = () => `${baseURL}${companyTypeGetDetails}`;
export const sectorGetDetailsAPI = () => `${baseURL}${sectorGetDetails}`;
export const hrvoltNationalityAPI = () => `${baseURL}${hrvoltNationality}`;
export const usergettechnicalskillsDetailsAPI = () => `${baseURL}${usergettechnicalskillsDetails}`;
export const usergetsoftskillsDetailsAPI = () => `${baseURL}${usergetsoftskillsDetails}`;
export const usergetJobpositionDetailsAPI = () => `${baseURL}${usergetJobpositionDetails}`;
export const usergetJoblevelDetailsAPI = () => `${baseURL}${usergetJoblevelDetails}`;
export const usergetWorkPlaceDetailsAPI = () => `${baseURL}${usergetWorkPlaceDetails}`;
export const usergetEducationDetailsAPI = () => `${baseURL}${usergetEducationDetails}`;
export const usergetEducationFieldDetailsAPI = () => `${baseURL}${usergetEducationFieldDetails}`;
export const usergetLocationDetailsAPI = () => `${baseURL}${usergetLocationDetails}`;
export const employmentTypeGetDetailsAPI = () => `${baseURL}${employmentTypeGetDetails}`;
export const joiningPeriodGetDetailsAPI = () => `${baseURL}${joiningPeriodGetDetails}`;
export const responsibilitiesGetDetailsAPI = () => `${baseURL}${responsibilitiesGetDetails}`;
export const benefitsGetDetailsAPI = () => `${baseURL}${benefitsGetDetails}`;


// Database APIs By Search

const jobPositionBySearch = "/databaseApis/JobPositionGetBySearch"
const jobLevelBySearch = "/databaseApis/JobLevelGetBySearch"
const nationaltyBySearch = "/databaseApis/NationalityGetBySearch"
const EmploymentTypeGetBySearch = "/databaseApis/EmploymentTypeGetBySearch"
const WorkPlaceGetBySearch = "/databaseApis/WorkPlaceGetBySearch"
const LanguageGetBySearch = "/databaseApis/LanguageGetBySearch"
const LocationGetBySearch = "/databaseApis/LocationGetBySearch"
const JoiningPeriodGetBySearch = "/databaseApis/JoiningPeriodGetBySearch"
const EducationGetBySearch = "/databaseApis/EducationGetBySearch"
const EducationFieldGetBySearch = "/databaseApis/EducationFieldGetBySearch"
const UniqueTechnicalSkillsGetBySearch = "/databaseApis/UniqueTechnicalSkillsGetBySearch"
const SoftSkillsGetBySearch = "/databaseApis/SoftSkillsGetBySearch"
const JobResponsibilityGetBySearch = "/databaseApis/JobResponsibilityGetBySearch"
const JobBenefitGetBySearch = "/databaseApis/JobBenefitGetBySearch"
const SectorGetBySearch = "/databaseApis/SectorGetBySearch"
const CompanyTypeGetBySearch = "/databaseApis/CompanyTypeGetBySearch"



export const jobPositionBySearchAPI = () => `${baseURL}${jobPositionBySearch}`;
export const jobLevelBySearchAPI = () => `${baseURL}${jobLevelBySearch}`;
export const nationalityBySearchAPI = () => `${baseURL}${nationaltyBySearch}`;
export const EmploymentTypeGetBySearchAPI = () => `${baseURL}${EmploymentTypeGetBySearch}`;
export const WorkPlaceGetBySearchAPI = () => `${baseURL}${WorkPlaceGetBySearch}`;
export const LanguageGetBySearchAPI = () => `${baseURL}${LanguageGetBySearch}`;
export const LocationGetBySearchAPI = () => `${baseURL}${LocationGetBySearch}`;
export const JoiningPeriodGetBySearchAPI = () => `${baseURL}${JoiningPeriodGetBySearch}`;
export const EducationGetBySearchAPI = () => `${baseURL}${EducationGetBySearch}`;
export const EducationFieldGetBySearchAPI = () => `${baseURL}${EducationFieldGetBySearch}`;
export const UniqueTechnicalSkillsGetBySearchAPI = () => `${baseURL}${UniqueTechnicalSkillsGetBySearch}`;
export const SoftSkillsGetBySearchAPI = () => `${baseURL}${SoftSkillsGetBySearch}`;
export const JobResponsibilityGetBySearchAPI = () => `${baseURL}${JobResponsibilityGetBySearch}`;
export const JobBenefitGetBySearchAPI = () => `${baseURL}${JobBenefitGetBySearch}`;
export const SectorGetBySearchAPI = () => `${baseURL}${SectorGetBySearch}`;
export const CompanyTypeGetBySearchAPI = () => `${baseURL}${CompanyTypeGetBySearch}`;




// Job Description APIs By Search

const jobDescriptionRegister = "/recruiterApis/jobDescriptionRegister"
const educationJobDescriptionRegister = "/recruiterApis/educationJobDescriptionRegister"
const educationFieldJobDescriptionRegister = "/recruiterApis/educationFieldJobDescriptionRegister"
const technicalskillsJobDescriptionRegister = "/recruiterApis/technicalskillsJobDescriptionRegister"
const softskillsJobDescriptionRegister = "/recruiterApis/softskillsJobDescriptionRegister"
const customjobDescriptionResponsibilityRegister = "/recruiterApis/customjobDescriptionResponsibilityRegister"
const jobDescriptionResponsibilityRegister = "/recruiterApis/jobDescriptionResponsibilityRegister"
const customjobDescriptionRequirementRegister = "/recruiterApis/customjobDescriptionRequirementRegister"
const customjobDescriptionBenefitRegister = "/recruiterApis/customjobDescriptionBenefitRegister"
const jobDescriptionBenefitRegister = "/recruiterApis/jobDescriptionBenefitRegister"
const jobDescriptioncompanyLocationDetailRegister = "/recruiterApis/jobDescriptioncompanyLocationDetailRegister"
const jobDescriptionEmploymentTypeDetailRegister = "/recruiterApis/jobDescriptionEmploymentTypeDetailRegister"
const nationalityJobDescriptionRegister = "/recruiterApis/nationalityJobDescriptionRegister"
const genderJobDescriptionRegister = "/recruiterApis/genderJobDescriptionRegister"
const workPlaceJobDescriptionRegister = "/recruiterApis/workPlaceJobDescriptionRegister"
const languageJobDescriptionRegister = "/recruiterApis/languageJobDescriptionRegister"
const joiningperiodJobDescriptionRegister = "/recruiterApis/joiningperiodJobDescriptionRegister"
const jobDescriptionDelete = "/recruiterApis/jobDescriptionDelete"

export const jobDescriptionRegisterAPI = () => `${baseURL}${jobDescriptionRegister}`;
export const educationJobDescriptionRegisterAPI = () => `${baseURL}${educationJobDescriptionRegister}`;
export const educationFieldJobDescriptionRegisterAPI = () => `${baseURL}${educationFieldJobDescriptionRegister}`;
export const technicalskillsJobDescriptionRegisterAPI = () => `${baseURL}${technicalskillsJobDescriptionRegister}`;
export const softskillsJobDescriptionRegisterAPI = () => `${baseURL}${softskillsJobDescriptionRegister}`;
export const customjobDescriptionResponsibilityRegisterAPI = () => `${baseURL}${customjobDescriptionResponsibilityRegister}`;
export const jobDescriptionResponsibilityRegisterAPI = () => `${baseURL}${jobDescriptionResponsibilityRegister}`;
export const customjobDescriptionRequirementRegisterAPI = () => `${baseURL}${customjobDescriptionRequirementRegister}`;
export const customjobDescriptionBenefitRegisterAPI = () => `${baseURL}${customjobDescriptionBenefitRegister}`;
export const jobDescriptionBenefitRegisterAPI = () => `${baseURL}${jobDescriptionBenefitRegister}`;
export const jobDescriptioncompanyLocationDetailRegisterAPI = () => `${baseURL}${jobDescriptioncompanyLocationDetailRegister}`;
export const jobDescriptionEmploymentTypeDetailRegisterAPI = () => `${baseURL}${jobDescriptionEmploymentTypeDetailRegister}`;
export const nationalityJobDescriptionRegisterAPI = () => `${baseURL}${nationalityJobDescriptionRegister}`;
export const genderJobDescriptionRegisterAPI = () => `${baseURL}${genderJobDescriptionRegister}`;
export const workPlaceJobDescriptionRegisterAPI = () => `${baseURL}${workPlaceJobDescriptionRegister}`;
export const languageJobDescriptionRegisterAPI = () => `${baseURL}${languageJobDescriptionRegister}`;
export const joiningperiodJobDescriptionRegisterAPI = () => `${baseURL}${joiningperiodJobDescriptionRegister}`;

export const jobDescriptionDeleteAPI = () => `${baseURL}${jobDescriptionDelete}`;




const autoJobDescription = "/recruiterApis/autoJobDescription"

export const autoJobDescriptionAPI = () => `${baseURL}${autoJobDescription}`;


const jobDescriptionGet = "/recruiterApis/jobDescriptionGet"
const jobDescriptionGetOne = "/recruiterApis/jobDescriptionGetOne"
const jobDescriptionGetUser = "/recruiterApis/jobDescriptionGetUser"
const alljobdescriptionGet = "/recruiterApis/alljobdescriptionGet"

export const jobDescriptionGetAPI = () => `${baseURL}${jobDescriptionGet}`;
export const jobDescriptionGetOneAPI = () => `${baseURL}${jobDescriptionGetOne}`;
export const jobDescriptionGetUserAPI = () => `${baseURL}${jobDescriptionGetUser}`;
export const alljobdescriptionGetAPI = () => `${baseURL}${alljobdescriptionGet}`;


//New Job Description API
const jobDescriptionUpload = "/recruiterApis/jobDescriptionUpload"
export const jobDescriptionUploadAPI = () => `${baseURL}${jobDescriptionUpload}`;




// Company Register APIs


const recruiterCompanyRegister = "/recruiterApis/companyDetailRegister"
const recruiterCompanyUpdate = "/recruiterApis/companyDetailsUpdate"

export const recruiterCompanyRegisterAPI = () => `${baseURL}${recruiterCompanyRegister}`;
export const recruiterCompanyUpdateAPI = () => `${baseURL}${recruiterCompanyUpdate}`;



// User Company APIs


const userCompany = "/recruiterApis/userCompanyRegister"
const CompanyDetailsGetOneByUser = "/recruiterApis/CompanyDetailsGetOneByUser"
const userCompanyUpdate = "/recruiterApis/companyDetailsUpdate"




export const userCompanyAPI = () => `${baseURL}${userCompany}`;
export const CompanyDetailsGetOneByUserAPI = () => `${baseURL}${CompanyDetailsGetOneByUser}`;
export const userCompanyUpdateAPI = () => `${baseURL}${userCompanyUpdate}`;




// Data analysis 


const MainEducationDashboard = "/DataAnalysisApis/MainEducationDashboard"
const AllCandidateListBasedOnJobDescription = "/DataAnalysisApis/AllCandidateListBasedOnJobDescription"
const TechnicalSkillDashboard = "/DataAnalysisApis/TechnicalSkillDashboard"
const TotalSoftSkillPreference = "/DataAnalysisApis/TotalSoftSkillPreference"
const WorkPlaceDashboard = "/DataAnalysisApis/WorkPlaceDashboard"
const JoiningPeriodDashboard = "/DataAnalysisApis/JoiningPeriodDashboard"
const JobDescriptionTotalCandidateList = "/DataAnalysisApis/JobDescriptionTotalCandidateList"
const JobPositionOnTimeBasis = "/DataAnalysisApis/JobPositionOnTimeBasis"
const JobPositionLevelLastSixMonths = "/DataAnalysisApis/JobPositionLevelLastSixMonths"
const TotalLanguage =  "/DataAnalysisApis/TotalLanguage"
const Nationality =  "/DataAnalysisApis/Nationality"
const EducationFieldDashboard =  "/DataAnalysisApis/EducationFieldDashboard"
const EducationDashboard =  "/DataAnalysisApis/EducationDashboard"
const EmployTypePref =  "/DataAnalysisApis/EmployTypePref"
const ProjectDurationDashboard =  "/DataAnalysisApis/ProjectDurationDashboard"
const ExperienceDurationDashboard =  "/DataAnalysisApis/ExperienceDurationDashboard"



export const MainEducationDashboardAPI = () => `${baseURL}${MainEducationDashboard}`;
export const AllCandidateListBasedOnJobDescriptionAPI = () => `${baseURL}${AllCandidateListBasedOnJobDescription}`;
export const TechnicalSkillDashboardAPI = () => `${baseURL}${TechnicalSkillDashboard}`;
export const TotalSoftSkillPreferenceAPI = () => `${baseURL}${TotalSoftSkillPreference}`;
export const WorkPlaceDashboardAPI = () => `${baseURL}${WorkPlaceDashboard}`;
export const JoiningPeriodDashboardAPI = () => `${baseURL}${JoiningPeriodDashboard}`;
export const JobDescriptionTotalCandidateListAPI = () => `${baseURL}${JobDescriptionTotalCandidateList}`;
export const JobPositionOnTimeBasisAPI = () => `${baseURL}${JobPositionOnTimeBasis}`;
export const JobPositionLevelLastSixMonthsAPI = () => `${baseURL}${JobPositionLevelLastSixMonths}`;
export const TotalLanguageAPI = () => `${baseURL}${TotalLanguage}`;
export const NationalityAPI = () => `${baseURL}${Nationality}`;
export const EducationFieldDashboardAPI = () => `${baseURL}${EducationFieldDashboard}`;
export const EducationDashboardAPI = () => `${baseURL}${EducationDashboard}`;
export const EmployTypePrefAPI = () => `${baseURL}${EmployTypePref}`;
export const ProjectDurationDashboardAPI = () => `${baseURL}${ProjectDurationDashboard}`;
export const ExperienceDurationDashboardAPI = () => `${baseURL}${ExperienceDurationDashboard}`;




// View candidate list


const autoCompareCandidateJobDescripList = "/recruiterApis/autoCompareCandidateJobDescripList"
const autoCompareCandidateJobDescripDetails = "/recruiterApis/autoCompareCandidateJobDescrip"

export const autoCompareCandidateJobDescripListAPI = () => `${baseURL}${autoCompareCandidateJobDescripList}`;
export const autoCompareCandidateJobDescripDetailsAPI = () => `${baseURL}${autoCompareCandidateJobDescripDetails}`;




// Bulk Resume

const RecruiterBulkResumeUpload = "/recruiterApis/RecruiterBulkResumeUpload"
const RecruiterResumeJobDescriptionCompare = "/recruiterApis/RecruiterResumeJobDescriptionCompare"
const BulkResumeAnalysis = "/recruiterApis/RecruiterBulkResumeAnalysis"
const BulkResumeAnalysisData = "/recruiterApis/RecruiterBulkResumeAnalysisAllData"

export const RecruiterBulkResumeUploadAPI = () => `${baseURL}${RecruiterBulkResumeUpload}`;
export const RecruiterResumeJobDescriptionCompareAPI = () => `${baseURL}${RecruiterResumeJobDescriptionCompare}`;
export const BulkResumeAnalysisAPI = () => `${baseURL}${BulkResumeAnalysis}`;
export const BulkResumeAnalysisDataAPI = () => `${baseURL}${BulkResumeAnalysisData}`;


export const GetFetchAPI = async (apiLink:string, fetchType:string) => {
  const res = await Axios({
    url: apiLink,
    method: fetchType,
  })
    .then((response) => response)
    .catch((err) => err.response);

  const data = await res?.data;

  return { res, data };
};


export const FetchAPI = async (apiLink:string, fetchType:string, sentData: object) => {


    const res = await Axios({
      url: apiLink,
      method: fetchType,
      data: sentData,
      
    })
      .then((response) => response)
      .catch((err) => err.response);
  
    const data = await res?.data;
  
    return { res, data };
  };

  
export const TokenBaseFetchApi = async (
    apiLink: string,
    fetchType: string,
    sentData: object,
    token: string
  ) => {
  
    const res = await Axios({
      url: apiLink,
      method: fetchType,
      data: sentData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response)
      .catch((err) => err.response);
  
    const data = await res?.data;
  
    return { res, data };
  };



