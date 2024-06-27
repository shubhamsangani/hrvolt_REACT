import {FC} from 'react'
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select'
import Modal from 'react-bootstrap/Modal';

import { Controller, useForm } from 'react-hook-form';

// import {IProfileDetails, AiJobDesType, JobDescriptionResponse } from './AutoJdModel'

import {IProfileDetails, JobDescriptionResponse } from './AutoJdModel'


import {useNavigate} from 'react-router-dom'

// import {useLocation} from "react-router-dom";

// import { JobPosition } from "../../../../types"


import useAuth from '../../../../../app/hooks/useAuth'

import { setDropdownOptions, jobDescriptionRegister } from '../../../../actions/userAction'

import { useDispatch, useSelector } from "react-redux";

// import { jobPositionBySearchAPI, jobLevelBySearchAPI, nationalityBySearchAPI, EmploymentTypeGetBySearchAPI, WorkPlaceGetBySearchAPI, LanguageGetBySearchAPI, LocationGetBySearchAPI, JoiningPeriodGetBySearchAPI, EducationGetBySearchAPI, EducationFieldGetBySearchAPI, JobResponsibilityGetBySearchAPI, JobBenefitGetBySearchAPI, UniqueTechnicalSkillsGetBySearchAPI, SoftSkillsGetBySearchAPI } from '../../../../../app/api'

import { jobPositionBySearchAPI, jobLevelBySearchAPI, nationalityBySearchAPI, EmploymentTypeGetBySearchAPI, WorkPlaceGetBySearchAPI, LanguageGetBySearchAPI, JoiningPeriodGetBySearchAPI, EducationGetBySearchAPI, EducationFieldGetBySearchAPI, JobResponsibilityGetBySearchAPI, JobBenefitGetBySearchAPI, UniqueTechnicalSkillsGetBySearchAPI, SoftSkillsGetBySearchAPI } from '../../../../../app/api'

import { infiniteScrollApiCall, getUniqueRec } from '../../../../common/inifinitescroll'

import { AutoJobPostAiPage } from './AutoJobPostAiPage';

import { useTranslation } from 'react-i18next';


interface RootState {
  userDetail: {
    options: {
      jobPos: Array<{ label: string; value: string }>;
      jobLev: Array<{ label: string; value: string }>;
      jobNation: Array<{ label: string; value: string }>;
      jobGen: Array<{ label: string; value: string }>;
      jobEmp: Array<{ label: string; value: string }>;
      jobWork: Array<{ label: string; value: string }>;
      jobLan: Array<{ label: string; value: string }>;
      // jobLoc: Array<{ label: string; value: string }>;
      jobJoin: Array<{ label: string; value: string }>;
      jobE: Array<{ label: string; value: string }>;
      jobEf: Array<{ label: string; value: string }>;
      jobR: Array<{ label: string; value: string }>;
      jobBen: Array<{ label: string; value: string }>;
      jobTech: Array<{ label: string; value: string }>;
      jobSoft: Array<{ label: string; value: string }>;

    };
  };
}

interface OptionType {
  label: string;
  value: string;
}

const genOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];

interface ComparisionReportModalProps {
  show: boolean;
  onHide: () => void;
}

interface GenerateJobDescriptionmodalProps extends ComparisionReportModalProps {
  // onJobDescription: (jobDescription: AiJobDesType[]) => void;
  onJobDescription: (response: JobDescriptionResponse) => void;
}
  
const limit = 10;


function GenerateJobDescriptionmodal(props: GenerateJobDescriptionmodalProps) {

  const { t } = useTranslation();
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
          <Modal.Title>{t('translation:jobPostGeneration')}</Modal.Title>
        </Modal.Header>
      <Modal.Body>
      <AutoJobPostAiPage onJobDescription={props.onJobDescription} />
      </Modal.Body>
     
    </Modal>
  );
}




const AutoJdPage: FC = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();


  const { userDetail, initialUserDetail, authTokens  } = useAuth();
  

  const [modalShow, setModalShow] = React.useState(false);

  // const [autoJobDescription, setAutoJobDescription] = useState<AiJobDesType[]>([]);


  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)


  const sel_options = useSelector((state: RootState) => state?.userDetail?.options);

  const [selectedJobPosition, setselectedJobPosition] = useState<Array<OptionType> | null>(null);
  const [selectedjobLevel, setselectedjobLevel] = useState<Array<OptionType> | null>(null);

  const [selectedJobNationality, setselectedNationality] = useState<Array<OptionType>>([]);

  const [selectedjobEmpType, setselectedEmpType] = useState<Array<OptionType>>([]);
  const [selectedjobWorkPlace, setselectedWorkPlace] = useState<Array<OptionType>>([]);
  const [selectedjobLang, setselectedLang] = useState<Array<OptionType>>([]);

  // const [selectedjobLocation, setselectedLocation] = useState<Array<OptionType>>([]);
  
  const [selectedjobJoinPeriod, setselectedJoinPeriod] = useState<Array<OptionType>>([]);
  const [selectedjobEducation, setselectedEducation] = useState<Array<OptionType>>([]);
  const [selectedjobEducationField, setselectedEducationField] = useState<Array<OptionType>>([]);
  const [selectedjobResp, setselectedResp] = useState<Array<OptionType>>([]);
  const [selectedjobBenefit, setselectedBenefit] = useState<Array<OptionType>>([]);
  const [selectedjobTech, setselectedTech] = useState<Array<OptionType>>([]);
  const [selectedjobSoft, setselectedSoft] = useState<Array<OptionType>>([]);

  const [selectedJobGender, setselectedGender] = useState<Array<OptionType>>([]);

  const [currrentJobPositionPage, setCurrrentJobPositionPage ] = useState(1)
  const [totalJobPositionPage, setTotalJobPositionPage ] = useState()
  const [searchJobPositionPage, setSearchJobPositionPage ] = useState("")

  const [currrentJobLevelPage, setCurrrentJobLevelPage ] = useState(1)
  const [totalJobLevelPage, setTotalJobLevelPage ] = useState()
  const [searchJobLevelPage, setSearchJobLevelPage ] = useState("")

  const [currrentJobNationalityPage, setCurrrentJobNationalityPage ] = useState(1)
  const [totalJobNationalityPage, setTotalJobNationalityPage ] = useState()
  const [searchJobNationalityPage, setSearchJobNationalityPage ] = useState("")

  const [currrentJobEmpTypePage, setCurrrentJobEmpTypePage ] = useState(1)
  const [totalJobEmpTypePage, setTotalJobEmpTypePage ] = useState()
  const [searchJobEmpTypePage, setSearchJobEmpTypePage ] = useState("")

  const [currrentJobWorkPlacePage, setCurrrentJobWorkPlacePage ] = useState(1)
  const [totalJobWorkPlacePage, setTotalJobWorkPlacePage ] = useState()
  const [searchJobWorkPlacePage, setSearchJobWorkPlacePage ] = useState("")

  const [currrentJobLangPage, setCurrrentJobLangPage ] = useState(1)
  const [totalJobLangPage, setTotalJobLangPage ] = useState()
  const [searchJobLangPage, setSearchJobLangPage ] = useState("")

  // const [currrentJobLocationPage, setCurrrentJobLocationPage ] = useState(1)
  // const [totalJobLocationPage, setTotalJobLocationPage ] = useState()
  // const [searchJobLocationPage, setSearchJobLocationPage ] = useState("")

  const [currrentJobJoinPeriodPage, setCurrrentJobJoinPeriodPage ] = useState(1)
  const [totalJobJoinPeriodPage, setTotalJobJoinPeriodPage ] = useState()
  const [searchJobJoinPeriodPage, setSearchJobJoinPeriodPage ] = useState("")
  
  const [currrentJobEducationPage, setCurrrentJobEducationPage ] = useState(1)
  const [totalJobEducationPage, setTotalJobEducationPage ] = useState()
  const [searchJobEducationPage, setSearchJobEducationPage ] = useState("")

  const [currrentJobEducationFieldPage, setCurrrentJobEducationFieldPage ] = useState(1)
  const [totalJobEducationFieldPage, setTotalJobEducationFieldPage ] = useState()
  const [searchJobEducationFieldPage, setSearchJobEducationFieldPage ] = useState("")

  const [currrentJobRespPage, setCurrrentJobRespPage ] = useState(1)
  const [totalJobRespPage, setTotalJobRespPage ] = useState()
  const [searchJobRespPage, setSearchJobRespPage ] = useState("")

  const [currrentJobBenefitPage, setCurrrentJobBenefitPage ] = useState(1)
  const [totalJobBenefitPage, setTotalJobBenefitPage ] = useState()
  const [searchJobBenefitPage, setSearchJobBenefitPage ] = useState("")

  const [currrentJobTechPage, setCurrrentJobTechPage ] = useState(1)
  const [totalJobTechPage, setTotalJobTechPage ] = useState()
  const [searchJobTechPage, setSearchJobTechPage ] = useState("")
  
  const [currrentJobSoftPage, setCurrrentJobSoftPage ] = useState(1)
  const [totalJobSoftPage, setTotalJobSoftPage ] = useState()
  const [searchJobSoftPage, setSearchJobSoftPage ] = useState("")

  const defaultValues = {
    jobPosition:  { value: "", label: "" },
    jobLevel:  { value: "", label: "" },
    jobNationality: [] as OptionType[],
    jobGender: [] as OptionType[],
    jobEmpType: [] as OptionType[],
    jobWorkPlace: [] as OptionType[],
    jobLang: [] as OptionType[],
    // jobLocation: [] as OptionType[],
    jobJoinPeriod: [] as OptionType[],
    JobEduation: [] as OptionType[],
    jobEduationField: [] as OptionType[],
    jobResp: [] as OptionType[],
    jobBenefit: [] as OptionType[],
    jobTechnicalSkills: [] as OptionType[],
    jobSoftSkills: [] as OptionType[],
    jobTitle : "",
    jobNumberVacancy: 1,
    jobMaxSalary: 0,
    jobMinsalary: 0,
    jobManualReq: "",
    jobManualBenefit: "",
    jobManualResp: "",
    jobPostStatus: true
  };
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    mode: "all",
    defaultValues,
  });

  const handleJobDescription = (response: JobDescriptionResponse) => {

    console.log("autoo job: ", response)

    // setAutoJobDescription(response);
    setModalShow(false);
    
    
    const job_position = {
      value: response.job_position_id,
      label: response.job_position_name
    }

    const job_level = {
      value: response.job_level_id,
      label: response.job_level_name
    }

    const gender =  response.gender.map((el) => ({
      value: el,
      label: el
    }))

    const soft_skills =  response.Soft_Skills.map((el) => ({
      value: el?.soft_skills_id,
      label: el?.soft_skills_name,
    }))

    const education =  response.Education.map((el) => ({
      value: el?.education_id,
      label: el?.education_name,
    }))
    
    const edu_field =  response.Education_Field.map((el) => ({
      value: el?.education_field_id,
      label: el?.education_field_name,
    }))

    const emp_type =  response.employment_type.map((el) => ({
      value: el?.employment_type_id,
      label: el?.employment_type_name,
    }))

    const joining_period =  response.Joining_Period.map((el) => ({
      value: el?.joining_period_id,
      label: el?.joining_period_name,
    }))

    const lang =  response.Languages.map((el) => ({
      value: el?.language_id,
      label: el?.language_name,
    }))

    const workplace =  response.Work_Place.map((el) => ({
      value: el?.work_place_id,
      label: el?.work_place_name,
    }))

    const benefit =  response.Benefits.map((el) => ({
      value: el?.job_benefit_id,
      label: el?.job_benefit_description,
    }))

    const res =  response.responsibility.map((el) => ({
      value: el?.job_responsibility_id,
      label: el?.job_responsibility_description,
    }))


    const nationality =  response.Nationality.map((el) => ({
      value: el?.nationality_id,
      label: el?.nationality_name,
    }))

    const technical_skills =  response.Technical_skills.map((el) => ({
      value: el?.technical_skill_id,
      label: el?.technical_skill_name,
    }))


    // const technical_skills = Object.entries(response.Technical_skills).map(([key, value]) => ({
    //   value: key,
    //   label: value,
    // }));
    

    setselectedJobPosition([job_position]);
    setselectedjobLevel([job_level]);
    setselectedSoft(soft_skills);
    setselectedGender(gender);
    setselectedEmpType(emp_type);
    setselectedWorkPlace(workplace);
    setselectedLang(lang);

    // setselectedLocation(loc);

    setselectedJoinPeriod(joining_period);
    setselectedEducation(education);
    setselectedEducationField(edu_field);
    
    setselectedTech(technical_skills);

    setselectedResp(res);
    setselectedBenefit(benefit);
    setselectedNationality(nationality);

    reset({
      jobNumberVacancy: response.number_of_vacancy,
      jobMaxSalary: response.max_salary,
      jobMinsalary: response.min_salary,
      jobNationality:nationality,
      jobResp:res,
      jobBenefit:benefit,
      jobWorkPlace:workplace,
      jobLang:lang,
      jobJoinPeriod:joining_period,
      jobEmpType:emp_type,
      jobEduationField:edu_field,
      JobEduation:education,
      jobSoftSkills:soft_skills,
      jobGender:gender,
      jobPosition:job_position,
      jobLevel:job_level,
      jobTechnicalSkills: technical_skills
    })

  };

  /* Job position  start */

  const jobPositionFun = async (search = "") =>  {

    try{

      const apiUrl = jobPositionBySearchAPI();
      const postData = {
        page: currrentJobPositionPage,
        limit,
        q: search,
      };

      if (!totalJobPositionPage || currrentJobPositionPage <= totalJobPositionPage) {

        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "job_position_name",
          value_key: "job_position_id",
        });

        if (response) {

          setTotalJobPositionPage(response?.TotalPages);

          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobPos || [], response?.Data),
              "jobPos"
            )
          );

        }

      }

          
    }
    catch (error) {
        console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobPositionFun(searchJobPositionPage);
  }, [currrentJobPositionPage, searchJobPositionPage]);

  const loadMoreJobPositionData = () => {
    setCurrrentJobPositionPage((prev) => prev + 1);
  };

  const handleJobPositionSearch = (searchJobPositionPage = "", action = "") => {
    if (action === "input-change")
      dispatch(setDropdownOptions([], "jobPos"));
      setSearchJobPositionPage(searchJobPositionPage);
      setCurrrentJobPositionPage(1);
  };

  /* Job position  end */


  /* Job level  start */
  
  const jobLevelFun = async (search = "") =>  {

    try{

      const apiUrl = jobLevelBySearchAPI();
      const postData = {
        page: currrentJobLevelPage,
        limit,
        q: search,
      };

      if (!totalJobLevelPage || currrentJobLevelPage <= totalJobLevelPage) {

        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "job_level_name",
          value_key: "job_level_id",
        });

        if (response) {

          setTotalJobLevelPage(response?.TotalPages);

          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobLev || [], response?.Data),
              "jobLev"
            )
          );

        }

      }

          
    }
    catch (error) {
        console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobLevelFun(searchJobLevelPage);
  }, [currrentJobLevelPage, searchJobLevelPage]);


  const loadMorejobLevelData = () => {
    setCurrrentJobLevelPage((prev) => prev + 1);
  };

  const handlejobLevelSearch = (searchJobLevelPage = "", action = "") => {
    if (action === "input-change")
      dispatch(setDropdownOptions([], "jobLev"));
      setSearchJobLevelPage(searchJobLevelPage);
      setCurrrentJobLevelPage(1)
  };

  /* Job level  end */



  /* Job Nationality  start */

  const jobNationalityFun = async (search = "") =>  {

    try{

      const apiUrl = nationalityBySearchAPI();
      const postData = {
        page: currrentJobNationalityPage,
        limit,
        q: search,
      };

      if (!totalJobNationalityPage || currrentJobNationalityPage <= totalJobNationalityPage) {

        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "nationality_name",
          value_key: "nationality_id",
        });

        if (response) {

          setTotalJobNationalityPage(response?.TotalPages);

          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobNation || [], response?.Data),
              "jobNation"
            )
          );

        }

      }

          
    }
    catch (error) {
        console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobNationalityFun(searchJobNationalityPage);
  }, [currrentJobNationalityPage, searchJobNationalityPage]);


  const loadMoreJobNationalityData = () => {
    setCurrrentJobNationalityPage((prev) => prev + 1);
  };

  const handleJobNationalitySearch = (searchJobNationalityPage = "", action = "") => {


    if (action === "input-change")
      dispatch(setDropdownOptions([], "jobNation"));
      setSearchJobNationalityPage(searchJobNationalityPage);
      setCurrrentJobNationalityPage(1);
  };

  /* Job Nationality  end */
  

   /* Job Employee Type  start */

   const jobEmpTypeFun = async (search = "") =>  {

    try{

      const apiUrl = EmploymentTypeGetBySearchAPI();
      const postData = {
        page: currrentJobEmpTypePage,
        limit,
        q: search,
      };

      if (!totalJobEmpTypePage || currrentJobEmpTypePage <= totalJobEmpTypePage) {

        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "employment_type_name",
          value_key: "employment_type_id",
        });

        if (response) {

          setTotalJobEmpTypePage(response?.TotalPages);

          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobEmp || [], response?.Data),
              "jobEmp"
            )
          );

        }

      }

          
    }
    catch (error) {
        console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobEmpTypeFun(searchJobEmpTypePage);
  }, [currrentJobEmpTypePage, searchJobEmpTypePage]);


  const loadMoreJobEmpTypeData = () => {
    setCurrrentJobEmpTypePage((prev) => prev + 1);
  };

  const handleJobEmpTypeSearch = (searchJobEmpTypePage = "", action = "") => {


    if (action === "input-change")
      dispatch(setDropdownOptions([], "jobEmp"));
      setSearchJobEmpTypePage(searchJobEmpTypePage);
      setCurrrentJobEmpTypePage(1);
  };

  /* Job Employee Type  end */


   /* Job Work Place  start */

   const jobWorkPlaceFun = async (search = "") =>  {

    try{

      const apiUrl = WorkPlaceGetBySearchAPI();
      const postData = {
        page: currrentJobWorkPlacePage,
        limit,
        q: search,
      };

      if (!totalJobWorkPlacePage || currrentJobWorkPlacePage <= totalJobWorkPlacePage) {

        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "work_place_name",
          value_key: "work_place_id",
        });

        if (response) {

          setTotalJobWorkPlacePage(response?.TotalPages);

          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobWork || [], response?.Data),
              "jobWork"
            )
          );

        }

      }

          
    }
    catch (error) {
        console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobWorkPlaceFun(searchJobWorkPlacePage);
  }, [currrentJobWorkPlacePage, searchJobWorkPlacePage]);


  const loadMoreWorkPlaceData = () => {
    setCurrrentJobWorkPlacePage((prev) => prev + 1);
  };

  const handleWorkPlaceSearch = (searchJobWorkPlacePage = "", action = "") => {

    
    if (action === "input-change")
      dispatch(setDropdownOptions([], "jobWork"));
      setSearchJobWorkPlacePage(searchJobWorkPlacePage);
      setCurrrentJobWorkPlacePage(1);
  };

  /* Job Work Place   end */


  /* Job Language  start */

  const jobLangFun = async (search = "") =>  {

    try{

      const apiUrl = LanguageGetBySearchAPI();
      const postData = {
        page: currrentJobLangPage,
        limit,
        q: search,
      };

      if (!totalJobLangPage || currrentJobLangPage <= totalJobLangPage) {

        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "language_name",
          value_key: "language_id",
        });

        if (response) {

          setTotalJobLangPage(response?.TotalPages);

          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobLan || [], response?.Data),
              "jobLan"
            )
          );

        }

      }

          
    }
    catch (error) {
        console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobLangFun(searchJobLangPage);
  }, [currrentJobLangPage, searchJobLangPage]);


  const loadMoreLangData = () => {
    setCurrrentJobLangPage((prev) => prev + 1);
  };

  const handleLangSearch = (searchJobLangPage = "", action = "") => {

    
    if (action === "input-change")
      dispatch(setDropdownOptions([], "jobLan"));
      setSearchJobLangPage(searchJobLangPage);
      setCurrrentJobLangPage(1);
  };

  /* Job Language  end */


  /* Job Location  start */

  // const jobLocationFun = async (search = "") =>  {

  //   try{

  //     const apiUrl = LocationGetBySearchAPI();
  //     const postData = {
  //       page: currrentJobLocationPage,
  //       limit,
  //       q: search,
  //     };

  //     if (!totalJobLocationPage || currrentJobLocationPage <= totalJobLocationPage) {

  //       const response = await infiniteScrollApiCall({
  //         apiEndpoint: apiUrl,
  //         payload: postData,
  //         label_key: "location_name",
  //         value_key: "location_id",
  //       });

  //       if (response) {

  //         setTotalJobLocationPage(response?.TotalPages);

  //         dispatch(
  //           setDropdownOptions(
  //             getUniqueRec(sel_options?.jobLoc || [], response?.Data),
  //             "jobLoc"
  //           )
  //         );

  //       }

  //     }

          
  //   }
  //   catch (error) {
  //       console.error("Error fetching sectors:", error);
  //   }
  // };

  // useEffect(() => {
  //   jobLocationFun(searchJobLocationPage);
  // }, [currrentJobLocationPage, searchJobLocationPage]);


  // const loadMorejobLocationData = () => {
  //   setCurrrentJobLocationPage((prev) => prev + 1);
  // };

  // const handlejobLocationSearch = (searchJobLocationPage = "", action = "") => {

    
  //   if (action === "input-change")
  //     dispatch(setDropdownOptions([], "jobLoc"));
  //     setSearchJobLocationPage(searchJobLocationPage);
  //     setCurrrentJobLocationPage(1);
  // };

  /* Job Location  end */



    /* Job Joining Period  start */

    const jobJoinPeriodFun = async (search = "") =>  {

      try{
  
        const apiUrl = JoiningPeriodGetBySearchAPI();
        const postData = {
          page: currrentJobJoinPeriodPage,
          limit,
          q: search,
        };
  
        if (!totalJobJoinPeriodPage || currrentJobJoinPeriodPage <= totalJobJoinPeriodPage) {
  
          const response = await infiniteScrollApiCall({
            apiEndpoint: apiUrl,
            payload: postData,
            label_key: "joining_period_name",
            value_key: "joining_period_id",
          });
  
          if (response) {
  
            setTotalJobJoinPeriodPage(response?.TotalPages);
  
            dispatch(
              setDropdownOptions(
                getUniqueRec(sel_options?.jobJoin || [], response?.Data),
                "jobJoin"
              )
            );
  
          }
  
        }
  
            
      }
      catch (error) {
          console.error("Error fetching sectors:", error);
      }
    };
  
    useEffect(() => {
      jobJoinPeriodFun(searchJobJoinPeriodPage);
    }, [currrentJobJoinPeriodPage, searchJobJoinPeriodPage]);
  
  
    const loadMorejobJoinPeriodData = () => {
      setCurrrentJobJoinPeriodPage((prev) => prev + 1);
    };
  
    const handlejobJoinPeriodSearch = (searchJobJoinPeriodPage = "", action = "") => {
  
      
      if (action === "input-change")
        dispatch(setDropdownOptions([], "jobLoc"));
        setSearchJobJoinPeriodPage(searchJobJoinPeriodPage);
        setCurrrentJobJoinPeriodPage(1);
    };
  
    /* Job Joining Period  end */



      /* Job Education  start */

      const jobEducationFun = async (search = "") =>  {

        try{
    
          const apiUrl = EducationGetBySearchAPI();
          const postData = {
            page: currrentJobEducationPage,
            limit,
            q: search,
          };
    
          if (!totalJobEducationPage || currrentJobEducationPage <= totalJobEducationPage) {
    
            const response = await infiniteScrollApiCall({
              apiEndpoint: apiUrl,
              payload: postData,
              label_key: "education_name",
              value_key: "education_id",
            });
    
            if (response) {
    
              setTotalJobEducationPage(response?.TotalPages);
    
              dispatch(
                setDropdownOptions(
                  getUniqueRec(sel_options?.jobE || [], response?.Data),
                  "jobE"
                )
              );
    
            }
    
          }
    
              
        }
        catch (error) {
            console.error("Error fetching sectors:", error);
        }
      };
    
      useEffect(() => {
        jobEducationFun(searchJobEducationPage);
      }, [currrentJobEducationPage, searchJobEducationPage]);
    
    
      const loadMorejobEducationData = () => {
        setCurrrentJobEducationPage((prev) => prev + 1);
      };
    
      const handlejobEducationSearch = (searchJobEducationPage = "", action = "") => {
    
        
        if (action === "input-change")
          dispatch(setDropdownOptions([], "jobLoc"));
          setSearchJobEducationPage(searchJobEducationPage);
          setCurrrentJobEducationPage(1);
      };
    
      /* Job Education  end */


      /* Job Education Field  start */

      const jobEducationFieldFun = async (search = "") =>  {

        try{
    
          const apiUrl = EducationFieldGetBySearchAPI();
          const postData = {
            page: currrentJobEducationFieldPage,
            limit,
            q: search,
          };
    
          if (!totalJobEducationFieldPage || currrentJobEducationFieldPage <= totalJobEducationFieldPage) {
    
            const response = await infiniteScrollApiCall({
              apiEndpoint: apiUrl,
              payload: postData,
              label_key: "education_field_name",
              value_key: "education_field_id",
            });
    
            if (response) {
    
              setTotalJobEducationFieldPage(response?.TotalPages);
    
              dispatch(
                setDropdownOptions(
                  getUniqueRec(sel_options?.jobEf || [], response?.Data),
                  "jobEf"
                )
              );
    
            }
    
          }
    
              
        }
        catch (error) {
            console.error("Error fetching sectors:", error);
        }
      };
    
      useEffect(() => {
        jobEducationFieldFun(searchJobEducationFieldPage);
      }, [currrentJobEducationFieldPage, searchJobEducationFieldPage]);
    
    
      const loadMorejobEducationFieldData = () => {
        setCurrrentJobEducationFieldPage((prev) => prev + 1);
      };
    
      const handlejobEducationFieldSearch = (searchJobEducationFieldPage = "", action = "") => {
    
        
        if (action === "input-change")
          dispatch(setDropdownOptions([], "jobLoc"));
          setSearchJobEducationFieldPage(searchJobEducationFieldPage);
          setCurrrentJobEducationFieldPage(1);
      };
    
      /* Job Education Field  end */


      /* Job Resp  start */

      const jobRespFun = async (search = "") =>  {

        try{
    
          const apiUrl = JobResponsibilityGetBySearchAPI();
          const postData = {
            page: currrentJobRespPage,
            limit,
            q: search,
          };
    
          if (!totalJobRespPage || currrentJobRespPage <= totalJobRespPage) {
    
            const response = await infiniteScrollApiCall({
              apiEndpoint: apiUrl,
              payload: postData,
              label_key: "job_responsibility_description",
              value_key: "job_responsibility_id",
            });
    
            if (response) {
    
              setTotalJobRespPage(response?.TotalPages);
    
              dispatch(
                setDropdownOptions(
                  getUniqueRec(sel_options?.jobR || [], response?.Data),
                  "jobR"
                )
              );
    
            }
    
          }
    
              
        }
        catch (error) {
            console.error("Error fetching sectors:", error);
        }
      };
    
      useEffect(() => {
        jobRespFun(searchJobRespPage);
      }, [currrentJobRespPage, searchJobRespPage]);
    
    
      const loadMorejobRespData = () => {
        setCurrrentJobRespPage((prev) => prev + 1);
      };
    
      const handlejobRespSearch = (searchJobRespPage = "", action = "") => {
    
        
        if (action === "input-change")
          dispatch(setDropdownOptions([], "jobR"));
          setSearchJobRespPage(searchJobRespPage);
          setCurrrentJobRespPage(1);
      };
    
      /* Job Resp  end */


      /* Job Benefit  start */

        const jobBenefitFun = async (search = "") =>  {

          try{
      
            const apiUrl = JobBenefitGetBySearchAPI();
            const postData = {
              page: currrentJobBenefitPage,
              limit,
              q: search,
            };
      
            if (!totalJobBenefitPage || currrentJobBenefitPage <= totalJobBenefitPage) {
      
              const response = await infiniteScrollApiCall({
                apiEndpoint: apiUrl,
                payload: postData,
                label_key: "job_benefit_description",
                value_key: "job_benefit_id",
              });
      
              if (response) {
      
                setTotalJobBenefitPage(response?.TotalPages);
      
                dispatch(
                  setDropdownOptions(
                    getUniqueRec(sel_options?.jobBen || [], response?.Data),
                    "jobBen"
                  )
                );
      
              }
      
            }
      
                
          }
          catch (error) {
              console.error("Error fetching sectors:", error);
          }
        };
      
        useEffect(() => {
          jobBenefitFun(searchJobBenefitPage);
        }, [currrentJobBenefitPage, searchJobBenefitPage]);
      
      
        const loadMorejobBenefitData = () => {
          setCurrrentJobBenefitPage((prev) => prev + 1);
        };
      
        const handlejobBenefitSearch = (searchJobBenefitPage = "", action = "") => {
      
          
          if (action === "input-change")
            dispatch(setDropdownOptions([], "jobLoc"));
            setSearchJobBenefitPage(searchJobBenefitPage);
            setCurrrentJobBenefitPage(1);
        };
      
      /* Job Benefit  end */


      /* Job Technical Skills  start */

      const jobTechFun = async (search = "") =>  {

        try{
    
          const apiUrl = UniqueTechnicalSkillsGetBySearchAPI();
          const postData = {
            page: currrentJobTechPage,
            limit,
            q: search,
          };
    
          if (!totalJobTechPage || currrentJobTechPage <= totalJobTechPage) {
    
            const response = await infiniteScrollApiCall({
              apiEndpoint: apiUrl,
              payload: postData,
              label_key: "unique_technical_skills_name",
              value_key: "unique_technical_skills_id",
            });
    
            if (response) {
    
              setTotalJobTechPage(response?.TotalPages);
    
              dispatch(
                setDropdownOptions(
                  getUniqueRec(sel_options?.jobTech || [], response?.Data),
                  "jobTech"
                )
              );
    
            }
    
          }
    
              
        }
        catch (error) {
            console.error("Error fetching sectors:", error);
        }
      };
    
      useEffect(() => {
        jobTechFun(searchJobTechPage);
      }, [currrentJobTechPage, searchJobTechPage]);
    
    
      const loadMorejobTechData = () => {
        setCurrrentJobTechPage((prev) => prev + 1);
      };
    
      const handlejobTechSearch = (searchJobTechPage = "", action = "") => {
    
        
      if (action === "input-change")
          dispatch(setDropdownOptions([], "jobLoc"));
          setSearchJobTechPage(searchJobTechPage);
          setCurrrentJobTechPage(1);
      };
    
    /* Job Technical Skills  end */


    /* Job Soft Skills  start */

    const jobSoftFun = async (search = "") =>  {

      try{
  
        const apiUrl = SoftSkillsGetBySearchAPI();
        const postData = {
          page: currrentJobSoftPage,
          limit,
          q: search,
        };
  
        if (!totalJobSoftPage || currrentJobSoftPage <= totalJobSoftPage) {
  
          const response = await infiniteScrollApiCall({
            apiEndpoint: apiUrl,
            payload: postData,
            label_key: "soft_skills_name",
            value_key: "soft_skills_id",
          });
  
          if (response) {
  
            setTotalJobSoftPage(response?.TotalPages);
  
            dispatch(
              setDropdownOptions(
                getUniqueRec(sel_options?.jobSoft || [], response?.Data),
                "jobSoft"
              )
            );
  
          }
  
        }
  
            
      }
      catch (error) {
          console.error("Error fetching sectors:", error);
      }
    };
  
    
    useEffect(() => {
      jobSoftFun(searchJobSoftPage);
    }, [currrentJobSoftPage, searchJobSoftPage]);
  
  
    const loadMorejobSoftData = () => {
      setCurrrentJobSoftPage((prev) => prev + 1);
    };
  
    const handlejobSoftSearch = (searchJobSoftPage = "", action = "") => {
  
      
      if (action === "input-change")
        dispatch(setDropdownOptions([], "jobSoft"));
        setSearchJobSoftPage(searchJobSoftPage);
        setCurrrentJobSoftPage(1);
    };
  
  /* Job Soft Skills  end */


  const handleJobPostPage = async (data: IProfileDetails) => {

    setLoading(true)

    try {
      
        if(userDetail && initialUserDetail && authTokens){

        const jobReg = await dispatch(
          jobDescriptionRegister(
              data,
              authTokens.access,
              userDetail.id || initialUserDetail.id
          )
        );

        if(jobReg == undefined){

          toast.error('Something wrong while creating job post.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });

        }else{

          toast.success('Job post is successfully created.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });

            
            navigate("/hrvolt/jd/view-job-description-details/view-job-post-active");

            // hrvolt/jd/view-job-description-details/view-job-post-all

            // navigate("/Recruterdasbord", {
            //   replace: true,
            //   state: {
            //       id: state.id,
            //       email: state.email,
            //       user_is_recruiter : state.user_is_recruiter, 
            //   },
            //   });

           
  
          }

        }        

        setLoading(false)

    } catch (error) {

      toast.error('Error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });

        console.log("errorr")

    } finally {
      setLoading(false)

    }

    
  }

  return (

    <div className='card mb-5 mb-xl-10'>

      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{t('translation:job_description_title')}</h3>
        </div>
        <a href="#" className='btn btn-primary align-self-center' onClick={() => setModalShow(true)}>
        {t('translation:generate_through_ai')}
        </a>

      </div>

      <div id='kt_account_profile_details' className='collapse show'>

        <form onSubmit={handleSubmit((data) => handleJobPostPage(data as IProfileDetails))} noValidate className='form'>

          <div className='card-body border-top p-9'>

            <div className='row mb-6'>
             
              <div className='row'>
                <div className='col-lg-12 fv-row'>

                <h5>{t('translation:job_title')}</h5>

                  <input
                    {...register("jobTitle", {
                      required: t('translation:job_title_required')
                    })}
                    name="jobTitle"
                    type="text"
                    placeholder= {t('translation:job_title_enter')}
                    id="jobTitle"
                    className = "form-control"
                    required
                  />

                    {errors.jobTitle && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.jobTitle.message}</div>
                    </div>
                    )}

                
                </div>

              </div>
              
            </div>

            <div className='row mb-6'>
                <div className='row'>
                    <div className='col-lg-6 fv-row'>

                      <h5>{t('translation:job_position')}:</h5>
                      
                      <Controller
                        name="jobPosition"
                        rules={{ required: t('translation:job_position_required') }}
                        control={control}  
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                setselectedJobPosition([selectedOption]);
                                setValue("jobPosition", selectedOption);
                              } else {
                                setselectedJobPosition(null);
                              }
                            }}
                            
                            value={selectedJobPosition}
                            options={sel_options?.jobPos}
                            isClearable
                            isSearchable
                            placeholder={t('translation:job_position_select')}
                            onMenuScrollToBottom={() => loadMoreJobPositionData()}
                            onInputChange={(value, { action }) =>
                            handleJobPositionSearch(value, action)
                            }
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: "calc(var(--size-100) + .15rem)",
                                background: "var(--clr-formInput)",
                                borderRadius: "var(--size-200)",
                                borderColor: state.isFocused
                                  ? "var(--clr-accent-400)"
                                  : "transparent",
                              }),
                            }}
                            
                          />
                        )}
                      />

                      {errors.jobPosition && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobPosition.message}</div>
                      </div>
                      )}

                      
                    </div>
              
                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_level')}</h5>
                      <Controller
                        name="jobLevel"
                        rules={{ required: t('translation:job_level_required') }}
                        control={control}  
                        defaultValue={defaultValues.jobLevel}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                setselectedjobLevel([selectedOption]);
                                setValue("jobLevel", selectedOption);
                              } else {
                                setselectedjobLevel(null);
                              }
                            }}
                            
                            value={selectedjobLevel}
                            options={sel_options?.jobLev}
                            isClearable
                            isSearchable
                            placeholder={t('translation:job_level_select')}
                            onMenuScrollToBottom={() => loadMorejobLevelData()}
                            onInputChange={(value, { action }) =>
                            handlejobLevelSearch(value, action)
                            }
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: "calc(var(--size-100) + .15rem)",
                                background: "var(--clr-formInput)",
                                borderRadius: "var(--size-200)",
                                borderColor: state.isFocused
                                  ? "var(--clr-accent-400)"
                                  : "transparent",
                              }),
                            }}
                            
                          />
                        )}
                      />

                      {errors.jobLevel && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobLevel.message}</div>
                      </div>
                      )}

                      
                    </div>
                </div>
            </div>

            <div className='row mb-6'>
                <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_nationality')}</h5>
                      <Controller
                          name="jobNationality"
                          rules={{ required: t('translation:job_nationality_required') }}
                          control={control}
                          defaultValue={defaultValues.jobNationality}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedNationality(mutableOptions);
                                setValue("jobNationality", mutableOptions);
                              }}
                              value={selectedJobNationality}
                              options={sel_options?.jobNation}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder={t('translation:job_nationality_select')}
                              onMenuScrollToBottom={() => loadMoreJobNationalityData()}
                              onInputChange={(value, { action }) => handleJobNationalitySearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobNationality && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobNationality.message}</div>
                      </div>
                      )}

                      
                    </div>

                    <div className='col-lg-6 fv-row'>
                    <h5>{t('translation:job_gender')}</h5>
                    <Controller
                        name="jobGender"
                        rules={{ required: t('translation:job_gender_required') }}
                        control={control}
                        defaultValue={defaultValues.jobGender}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(selectedOptions) => {
                              const mutableOptions = [...selectedOptions];
                              setselectedGender(mutableOptions);
                              setValue("jobGender", mutableOptions);
                            }}
                            value={selectedJobGender}
                            options={genOptions} // Use the genOptions array
                            isClearable
                            isSearchable
                            isMulti
                            placeholder={t('translation:job_gender_select')}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: "calc(var(--size-100) + .15rem)",
                                background: "var(--clr-formInput)",
                                borderRadius: "var(--size-200)",
                                borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                              }),
                            }}
                          />
                        )}
                      />

                        {errors.jobGender && (
                          <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{errors.jobGender.message}</div>
                        </div>
                        )}
                    
                    </div>
                </div>
            </div>

            <div className='row mb-6'>
                <div className='col-lg-4 fv-row'>

                  <h5>{t('translation:job_vacancies')} </h5>
                    <input
                      {...register("jobNumberVacancy", {
                        required: t('translation:job_vacancies_required') ,
                        min: { value: 1, message: "Minimum value is 1" },
                      })}
                      name="jobNumberVacancy"
                      type="number"
                      placeholder={t('translation:job_vacancies_select')}
                      id="jobNumberVacancy"
                      className = "form-control"
                      required
                    />

                      {errors.jobNumberVacancy && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobNumberVacancy.message}</div>
                      </div>
                      )}

                </div>

                <div className='col-lg-4 fv-row'>

                    <h5> {t('translation:job_minsalary')} </h5>

                    <input
                      {...register("jobMinsalary", {
                        required: t('translation:job_minsalary_required'),
                        min: { value: 0, message: "Minimum value is 0" },
                      })}
                      name="jobMinsalary"
                      type="number"
                      placeholder={t('translation:job_minsalary_select')}
                      id="jobMinsalary"
                      className = "form-control"
                      required
                    />


                      {errors.jobMinsalary && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobMinsalary.message}</div>
                      </div>
                      )}

                </div>

                <div className='col-lg-4 fv-row'>

                    <h5> {t('translation:job_maxsalary')} </h5>

                    <input
                      {...register("jobMaxSalary", {
                        required: t('translation:job_maxsalary_required'),
                        min: { value: 0, message: "Minimum value is 0" },
                      })}
                      name="jobMaxSalary"
                      type="number"
                      placeholder={t('translation:job_maxsalary')}
                      id="jobMaxSalary"
                      className = "form-control"
                      required
                    />

                      {errors.jobMaxSalary && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobMaxSalary.message}</div>
                      </div>
                      )}

                </div>
                
            </div>

            <div className='row mb-6'>
                <div className='row'>
              
                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_emp_type')}:</h5>
                      <Controller
                          name="jobEmpType"
                          rules={{ required: t('translation:job_emp_type_required') }}
                          control={control}
                          defaultValue={defaultValues.jobEmpType}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedEmpType(mutableOptions);
                                setValue("jobEmpType", mutableOptions);
                              }}
                              value={selectedjobEmpType}
                              options={sel_options?.jobEmp}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder={t('translation:job_emp_type_select')}
                              onMenuScrollToBottom={() => loadMoreJobEmpTypeData()}
                              onInputChange={(value, { action }) => handleJobEmpTypeSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobEmpType && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobEmpType.message}</div>
                      </div>
                      )}

                      
                    </div>

                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_work_place')}:</h5>
                      <Controller
                          name="jobWorkPlace"
                          rules={{ required: t('translation:job_work_place_required') }}
                          control={control}
                          defaultValue={defaultValues.jobWorkPlace}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedWorkPlace(mutableOptions);
                                setValue("jobWorkPlace", mutableOptions);
                              }}
                              value={selectedjobWorkPlace}
                              options={sel_options?.jobWork}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder={t('translation:job_work_place_select')}
                              onMenuScrollToBottom={() => loadMoreWorkPlaceData()}
                              onInputChange={(value, { action }) => handleWorkPlaceSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobWorkPlace && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobWorkPlace.message}</div>
                      </div>
                      )}

                      
                    </div>

                    {/* <div className='col-lg-4 fv-row'>
                      <h5>Language:</h5>
                      <Controller
                          name="jobLang"
                          rules={{ required: "Language is required" }}
                          control={control}
                          defaultValue={defaultValues.jobLang}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedLang(mutableOptions);
                                setValue("jobLang", mutableOptions);
                              }}
                              value={selectedjobLang}
                              options={sel_options?.jobLan}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder="Select Language..."
                              onMenuScrollToBottom={() => loadMoreLangData()}
                              onInputChange={(value, { action }) => handleLangSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobLang && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobLang.message}</div>
                      </div>
                      )}

                      
                    </div> */}

                    
                </div>
            </div>


            <div className='row mb-6'>
                <div className='row'>

                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_lang')}:</h5>
                      <Controller
                          name="jobLang"
                          rules={{ required: t('translation:job_lang_required') }}
                          control={control}
                          defaultValue={defaultValues.jobLang}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedLang(mutableOptions);
                                setValue("jobLang", mutableOptions);
                              }}
                              value={selectedjobLang}
                              options={sel_options?.jobLan}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder={t('translation:job_lang_select')}
                              onMenuScrollToBottom={() => loadMoreLangData()}
                              onInputChange={(value, { action }) => handleLangSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobLang && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobLang.message}</div>
                      </div>
                      )}

                      
                    </div>
              
                    {/* <div className='col-lg-6 fv-row'>
                      <h5>Location:</h5>
                      <Controller
                          name="jobLocation"
                          rules={{ required: "Location is required" }}
                          control={control}
                          defaultValue={defaultValues.jobLocation}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedLocation(mutableOptions);
                                setValue("jobLocation", mutableOptions);
                              }}
                              value={selectedjobLocation}
                              options={sel_options?.jobLoc}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder="Select Location..."
                              onMenuScrollToBottom={() => loadMorejobLocationData()}
                              onInputChange={(value, { action }) => handlejobLocationSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobLocation && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobLocation.message}</div>
                      </div>
                      )}

                      
                    </div> */}

                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_join_period')}:</h5>
                      <Controller
                          name="jobJoinPeriod"
                          rules={{ required: t('translation:job_join_period_required') }}
                          control={control}
                          defaultValue={defaultValues.jobJoinPeriod}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedJoinPeriod(mutableOptions);
                                setValue("jobJoinPeriod", mutableOptions);
                              }}
                              value={selectedjobJoinPeriod}
                              options={sel_options?.jobJoin}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder={t('translation:job_join_period_select')}
                              onMenuScrollToBottom={() => loadMorejobJoinPeriodData()}
                              onInputChange={(value, { action }) => handlejobJoinPeriodSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobJoinPeriod && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobJoinPeriod.message}</div>
                      </div>
                      )}

                      
                    </div>
                    
                </div>
            </div>


            <div className='row mb-6'>
                <div className='row'>
              
                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_education')} :</h5>
                      <Controller
                          name="JobEduation"
                          rules={{ required: t('translation:job_education_required') }}
                          control={control}
                          defaultValue={defaultValues.JobEduation}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedEducation(mutableOptions);
                                setValue("JobEduation", mutableOptions);
                              }}
                              value={selectedjobEducation}
                              options={sel_options?.jobE}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder={t('translation:job_education_select')}
                              onMenuScrollToBottom={() => loadMorejobEducationData()}
                              onInputChange={(value, { action }) => handlejobEducationSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.JobEduation && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.JobEduation.message}</div>
                      </div>
                      )}

                      
                    </div>

                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_education_field')}:</h5>
                      <Controller
                          name="jobEduationField"
                          rules={{ required: t('translation:job_education_field_required') }}
                          control={control}
                          defaultValue={defaultValues.jobEduationField}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(selectedOptions) => {
                                const mutableOptions = [...selectedOptions];
                                setselectedEducationField(mutableOptions);
                                setValue("jobEduationField", mutableOptions);
                              }}
                              value={selectedjobEducationField}
                              options={sel_options?.jobEf}
                              isClearable
                              isSearchable
                              isMulti  // Add this line for multi-select
                              placeholder={t('translation:job_education_field_select')}
                              onMenuScrollToBottom={() => loadMorejobEducationFieldData()}
                              onInputChange={(value, { action }) => handlejobEducationFieldSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.jobEduationField && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.jobEduationField.message}</div>
                      </div>
                      )}

                      
                    </div>
                    
                </div>
            </div>

            <div className='row mb-6'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <h5>{t('translation:job_technical_skills')} :</h5>
                    <Controller
                        name="jobTechnicalSkills"
                        rules={{ required: t('translation:job_technical_skills_required') }}
                        control={control}
                        defaultValue={defaultValues.jobTechnicalSkills}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(selectedOptions) => {
                              const mutableOptions = [...selectedOptions];
                              setselectedTech(mutableOptions);
                              setValue("jobTechnicalSkills", mutableOptions);
                            }}
                            value={selectedjobTech}
                            options={sel_options?.jobTech}
                            isClearable
                            isSearchable
                            isMulti  // Add this line for multi-select
                            placeholder={t('translation:job_technical_skills_select')}
                            onMenuScrollToBottom={() => loadMorejobTechData()}
                            onInputChange={(value, { action }) => handlejobTechSearch(value, action)}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: "calc(var(--size-100) + .15rem)",
                                background: "var(--clr-formInput)",
                                borderRadius: "var(--size-200)",
                                borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                              }),
                            }}
                          />
                        )}
                      />

                    {errors.jobTechnicalSkills && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.jobTechnicalSkills.message}</div>
                    </div>
                    )}

                    
                  </div>
                </div>
            </div>

            <div className='row mb-6'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <h5>{t('translation:job_soft_skills')}:</h5>
                    <Controller
                        name="jobSoftSkills"
                        rules={{ required: t('translation:job_soft_skills_required') }}
                        control={control}
                        // defaultValue={defaultValues.jobSoftSkills}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(selectedOptions) => {
                              const mutableOptions = [...selectedOptions];
                              setselectedSoft(mutableOptions);
                              setValue("jobSoftSkills", mutableOptions);
                            }}
                            value={selectedjobSoft}
                            options={sel_options?.jobSoft}
                            
                            isMulti  // Add this line for multi-select
                            placeholder={t('translation:job_soft_skills_select')}
                            onMenuScrollToBottom={() => loadMorejobSoftData()}
                            onInputChange={(value, { action }) => handlejobSoftSearch(value, action)}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: "calc(var(--size-100) + .15rem)",
                                background: "var(--clr-formInput)",
                                borderRadius: "var(--size-200)",
                                borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                              }),
                            }}
                          />
                        )}
                      />

                    {errors.jobSoftSkills && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.jobSoftSkills.message}</div>
                    </div>
                    )}

                    
                  </div>
                </div>
            </div>

            <div className='row mb-6'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <h5>{t('translation:job_resp')}:</h5>
                    <Controller
                        name="jobResp"
                        rules={{ required: t('translation:job_resp_required') }}
                        control={control}
                        defaultValue={defaultValues.jobResp}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(selectedOptions) => {
                              const mutableOptions = [...selectedOptions];
                              setselectedResp(mutableOptions);
                              setValue("jobResp", mutableOptions);
                            }}
                            value={selectedjobResp}
                            options={sel_options?.jobR}
                            isClearable
                            isSearchable
                            isMulti  // Add this line for multi-select
                            placeholder={t('translation:job_resp_select')}
                            onMenuScrollToBottom={() => loadMorejobRespData()}
                            onInputChange={(value, { action }) => handlejobRespSearch(value, action)}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: "calc(var(--size-100) + .15rem)",
                                background: "var(--clr-formInput)",
                                borderRadius: "var(--size-200)",
                                borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                              }),
                            }}
                          />
                        )}
                      />

                    {errors.jobResp && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.jobResp.message}</div>
                    </div>
                    )}

                    
                  </div>
                </div>
            </div>

            <div className='row mb-6'>
             
              <div className='row'>
                <div className='col-lg-12 fv-row'>

                <h5> {t('translation:job_manual_resp')}: </h5>
                
                <textarea
                  className='form-control form-control-solid mb-8'
                  rows={3}
                  placeholder={t('translation:job_manual_resp_placeholder')}
                  {...register("jobManualResp")}
                ></textarea>
                </div>

              </div>
              
            </div>

            <div className='row mb-6'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <h5>{t('translation:job_benefit')} :</h5>
                    <Controller
                        name="jobBenefit"
                        rules={{ required: t('translation:job_benefit_required') }}
                        control={control}
                        defaultValue={defaultValues.jobBenefit}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(selectedOptions) => {
                              const mutableOptions = [...selectedOptions];
                              setselectedBenefit(mutableOptions);
                              setValue("jobBenefit", mutableOptions);
                            }}
                            value={selectedjobBenefit}
                            options={sel_options?.jobBen}
                            isClearable
                            isSearchable
                            isMulti  // Add this line for multi-select
                            placeholder={t('translation:job_benefit_select')}
                            onMenuScrollToBottom={() => loadMorejobBenefitData()}
                            onInputChange={(value, { action }) => handlejobBenefitSearch(value, action)}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: "calc(var(--size-100) + .15rem)",
                                background: "var(--clr-formInput)",
                                borderRadius: "var(--size-200)",
                                borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                              }),
                            }}
                          />
                        )}
                      />

                    {errors.jobBenefit && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.jobBenefit.message}</div>
                    </div>
                    )}

                    
                  </div>
                </div>
            </div>

            <div className='row mb-6'>
             
              <div className='row'>
                <div className='col-lg-12 fv-row'>

                <h5> {t('translation:job_manual_benefit')}: </h5>


                <textarea
                  className='form-control form-control-solid mb-8'
                  rows={3}
                  placeholder={t('translation:job_manual_benefit_placeholder')}
                  {...register("jobManualBenefit")}
                ></textarea>
                
                </div>

              </div>
              
            </div>

            <div className='row mb-6'>
             
              <div className='row'>
                <div className='col-lg-12 fv-row'>

                <h5> {t('translation:job_manual_req')}: </h5>

                <textarea
                  className='form-control form-control-solid mb-8'
                  rows={3}
                  placeholder={t('translation:job_manual_req_placeholder')}
                  {...register("jobManualReq")}
                ></textarea>
                
                </div>

              </div>
              
            </div>

            <div className='row mb-6'>
             
              <div className='row'>
                <div className='col-lg-12 fv-row'>

                  
                  <div className="form-check form-switch form-check-custom form-check-solid me-10">
                    <input className="form-check-input h-30px w-50px" type="checkbox" value="" id="flexSwitchChecked" {...register("jobPostStatus")}/>
                    <label className="form-check-label" htmlFor="flexSwitchChecked">
                    {t('translation:job_post_status')}
                    </label>
                  </div>


                  
                </div>
              </div>

            </div>

          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && t('translation:publish')}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                   {t('translation:publishing')}{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* <GenerateJobDescriptionmodal
        show={modalShow}
        onHide={() => setModalShow(false)}
        /> */}

      <GenerateJobDescriptionmodal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onJobDescription={handleJobDescription}
      />

    </div>

        


  )

}

export {AutoJdPage}