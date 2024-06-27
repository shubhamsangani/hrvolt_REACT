// import {useState, useEffect, PureComponent} from 'react'

import {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import axios from "axios";



// import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';

import { PieChart, Pie, Tooltip } from "recharts";


import {
  ListsWidget4,
  ListsWidget6,
  ChartsWidget1,
  ChartsWidget2,
  // MixedWidget1,
  MixedWidget3,
  // MixedWidget9,
  // MixedWidget11,
  // StatisticsWidget4,
  StatisticsWidget5,
  // TopJobPosition,
  LanguageChart,
  EducationChart,
  EducationFieldChart,
  NationalityChart,
  ChartWorkplace,
  ChartJoiningPeriod,
  ProjectDashboard,
  ExpChart,
  EmptypeChart
  
} from '../../../_metronic/partials/widgets'


import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form';

import { infiniteScrollApiCall, getUniqueRec } from '../../common/inifinitescroll'
import { setDropdownOptions } from '../../actions/userAction'
import { useDispatch, useSelector } from "react-redux";

import { jobPositionBySearchAPI, jobLevelBySearchAPI, MainEducationDashboardAPI, TechnicalSkillDashboardAPI, TotalSoftSkillPreferenceAPI, WorkPlaceDashboardAPI, JoiningPeriodDashboardAPI, jobDescriptionGetUserAPI, JobDescriptionTotalCandidateListAPI, JobPositionLevelLastSixMonthsAPI, TotalLanguageAPI, NationalityAPI, EducationDashboardAPI, EducationFieldDashboardAPI, EmployTypePrefAPI, ProjectDurationDashboardAPI , ExperienceDurationDashboardAPI} from '../../../app/api' 


import useAuth from '../../../app/hooks/useAuth';


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const dashboardBreadCrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  },
]

type jobPie = {
  name: string;
  value: number;
};

type jobPieList = jobPie[];



interface OptionType {
  label: string;
  value: string;
}

interface RootState {
  userDetail: {
    options: {
      jobPos: Array<{ label: string; value: string }>;
      jobLev: Array<{ label: string; value: string }>;
    };
  };
}


type JobPositionTimeWise = {
  result: {
    year: number;
    month: string;
    total_job_positions: number;
    total_job_levels: number;
    job_positions: Record<string, number>;
    job_levels: Record<string, number>;
  }[];
  yearly_counts: Record<string, number>;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  current_year_count: number;
  last_year_count: number;
  top_job_positions: Record<string, number>;
  top_job_levels: Record<string, number>;
  top_job_positions_pie: { name: string; value: number }[];
  top_job_levels_pie: { name: string; value: number }[];
}

const limit = 10;


const DashboardPage = () => {
  const { userDetail, initialUserDetail, authTokens  } = useAuth();

  useEffect(() => {
    document.getElementById('kt_layout_toolbar')?.classList.remove('d-none')
    return () => {
      document.getElementById('kt_layout_toolbar')?.classList.add('d-none')
    }
  }, [])

  const dispatch = useDispatch();

  // const [mainloader, setMainLoader ] = useState(false);
  
  const [selectedJobPosition, setselectedJobPosition] = useState<Array<OptionType> | null>(null);
  const [selectedjobLevel, setselectedjobLevel] = useState<Array<OptionType> | null>(null);

  const sel_options = useSelector((state: RootState) => state?.userDetail?.options);

  const [currrentJobPositionPage, setCurrrentJobPositionPage ] = useState(1)
  const [totalJobPositionPage, setTotalJobPositionPage ] = useState()
  const [searchJobPositionPage, setSearchJobPositionPage ] = useState("")

  const [currrentJobLevelPage, setCurrrentJobLevelPage ] = useState(1)
  const [totalJobLevelPage, setTotalJobLevelPage ] = useState()
  const [searchJobLevelPage, setSearchJobLevelPage ] = useState("")

  const [degrees, setDegrees ] = useState({});
  const [degreesLoading, setDegreesLoading ] = useState(false);

  const [techskills, setTechSkills ] = useState({});
  const [techSkillsLoading, setTechSkillsLoading ] = useState(false);

  const [softskills, setSoftSkills ] = useState({});
  const [softskillsLoading, setSoftSkillsLoading ] = useState(false);

  const [workplace, setWorkplace ] = useState({});
  const [workplaceLoading, setworkplaceLoading ] = useState(false);

  const [joiningPeriod, setJoiningPeriod ] = useState({});
  const [joiningPeriodLoading, setjoiningPeriodLoading ] = useState(false);

  const [universities, setUniversities ] = useState({});
  const [universitiesLoading, setUniversitiesLoading ] = useState(false);

  const [jobpost, setJobPost ] = useState(0);
  const [jobPostLoading, setJobPostLoading ] = useState(false);

  const [candidates, setCandidates ] = useState(0);
  const [candidatesLoading, setCandidatesLoading ] = useState(false);

  const [jobpositiontimewise, setJobPositionTimeWise ] = useState<JobPositionTimeWise | null>(null);
  const [jobpositiontimewiseLoading, setjobpositiontimewiseLoading ] = useState(false);

  // const [topJobposition, setTopJobPositions ] = useState({})setTopJobPositionsPie;
  // const [topJobpositionLoading, setTopJobPositionsLoading ] = useState(false);

  const [topJobpositionpie, setTopJobPositionsPie ] = useState<jobPieList | null>(null);
  const [topJobpositionLoadingpie, setTopJobPositionsLoadingPie ] = useState(false);

  const [topJobplevelpie, setTopJobLevelsPie ] = useState<jobPieList | null>(null);
  const [topJoblevelLoadingpie, setTopJobLevelsLoadingPie ] = useState(false);

  const [lang, setLang ] = useState({});
  const [langloader, setLangLoader ] = useState(false);

  const [nation, setNationality ] = useState({});
  const [nationloader, setNationalityLoader ] = useState(false);

  const [educationdata, setEdu ] = useState({});
  const [eduloader, setEduLoader ] = useState(false);

  const [edufield, setEduField ] = useState({});
  const [edufieldloader, setEduFieldLoader ] = useState(false);

  const [empType, setEmpType ] = useState({});
  const [empTypeLoader, setEmpTypeLoader ] = useState(false);


  const [projectdata, setProject ] = useState({});
  const [totalprojects, setTotalProject ] = useState(Number);
  const [projectloader, ssetProjectLoader ] = useState(false);


  const [exptotalyears, setExpTotalYears] = useState({});
  const [exploader, setExpLoader ] = useState(false);


  const defaultValues = {
    jobPosition: { value: "", label: "Select Job Position" },
    jobLevel: { value: "", label: "Select Job Level" },
  };



  const {
    control,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues,
  });

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
        console.log("🚀 ~ jobPositionFun ~ response:", response)

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


  /* Job Level Filtering */



  const mainEducationDash = async (job_level : string = "", job_position: string = "") => {
    try {
      // setMainLoader(true);
        if(userDetail && initialUserDetail && authTokens){
        const inpData = {
          "job_level_id": job_level,
          "job_position_id":  job_position,
        };

        const jobData = {
          "user_id": userDetail.id || initialUserDetail.id,
          "job_description_action": "active"
        }
      
        const apiUrl = MainEducationDashboardAPI();
        const techapiUrl = TechnicalSkillDashboardAPI();
        const softapiUrl = TotalSoftSkillPreferenceAPI();
        const workplaceUrl = WorkPlaceDashboardAPI();
        const joiningPeriodUrl = JoiningPeriodDashboardAPI(); 
        const jobPostUserUrl = jobDescriptionGetUserAPI();
        const candidatesUrl = JobDescriptionTotalCandidateListAPI();
        const jobpositionTimeUrl = JobPositionLevelLastSixMonthsAPI();
        const languageUrl = TotalLanguageAPI();
        const nationalityUrl = NationalityAPI();
        const educationUrl = EducationDashboardAPI();
        const educationFieldUrl = EducationFieldDashboardAPI();
        const emptypeUrl = EmployTypePrefAPI();
        const projectUrl = ProjectDurationDashboardAPI();
        const expUrl = ExperienceDurationDashboardAPI();

      // setMainLoader(true);

      const [response, techresponse, softresponse, workresponse, joiningperiodresponse, jobpostresponse, candidatesresponse, jobpositiontimeresponse, languageresponse, nationalityresponse, educationresponse, educationfieldresponse, emptyperesponse, projectresponse, expresponse] = await Promise.all([
        axios.post(apiUrl, inpData),
        axios.post(techapiUrl, inpData),
        axios.post(softapiUrl),
        axios.post(workplaceUrl, inpData),
        axios.post(joiningPeriodUrl, inpData),
        axios.post(jobPostUserUrl, jobData),
        axios.post(candidatesUrl),
        axios.post(jobpositionTimeUrl),
        axios.post(languageUrl, inpData),
        axios.post(nationalityUrl, inpData),
        axios.post(educationUrl, inpData),
        axios.post(educationFieldUrl, inpData),
        axios.post(emptypeUrl, inpData),
        axios.post(projectUrl, inpData),
        axios.post(expUrl, inpData),
      ]);

      if (expresponse.data && expresponse.data) {
        setExpTotalYears(expresponse.data.DurationData.total_years);
        setExpLoader(true);
      } else {
        console.log("No data received from the API");
      }
      
      if (projectresponse.data && projectresponse.data) {
        setProject(projectresponse.data.DurationData);
        setTotalProject(projectresponse.data.total_proj_count);
        ssetProjectLoader(true);
      } else {
        console.log("No data received from the API");
      }

      if (emptyperesponse.data && emptyperesponse.data) {
        setEmpType(emptyperesponse.data.TotalEmploymentTypeCounts);
        setEmpTypeLoader(true);
      } else {
        console.log("No data received from the API");
      }

      if (educationresponse.data && educationresponse.data) {
        setEdu(educationresponse.data.Total_Education_Counts);
        setEduLoader(true);
      } else {
        console.log("No data received from the API");
      }

      if (educationfieldresponse.data && educationfieldresponse.data.Data) {
        setEduField(educationfieldresponse.data.TotalEduFieldCounts);
        setEduFieldLoader(true);
      } else {
        console.log("No data received from the API");
      }
             
      if (response.data && response.data.Data) {
        setDegrees(response.data.TotalDegreeCounts);
        setUniversities(response.data.TotalUniversityCounts);
        setDegreesLoading(true);
        setUniversitiesLoading(true);
      } else {
        console.log("No data received from the API");
      }

      if (techresponse.data && techresponse.data.Data) {
        setTechSkills(techresponse.data.tech_count);
        setTechSkillsLoading(true);
      } else {
        console.log("No data received from the API");
      }

      if (softresponse){
        setSoftSkills(softresponse.data.soft_skills_counts);
        setSoftSkillsLoading(true);
      }else{
        console.log("No data received from the API");
      }

      if (workresponse.data && workresponse.data.Data) {
        setWorkplace(workresponse.data.workPlace_counts);
        setworkplaceLoading(true);
      } else {
        console.log("No data received from the API");
      }

      if (joiningperiodresponse.data && joiningperiodresponse.data.Data) {
        setJoiningPeriod(joiningperiodresponse.data.joinPeriod_counts);
        setjoiningPeriodLoading(true);
      } else {
        console.log("No data received from the API");
      }

      if (jobpostresponse.data) {
        console.log(jobpostresponse.data, "jobpostresponse")
        setJobPost(jobpostresponse.data.Total_job_posts);
        setJobPostLoading(true);

        if (selectedJobPosition && selectedjobLevel) {
          const filteredJobPost: number = jobpostresponse.data.Data.filter(
              (el: { job_position_name: string, job_level_name: String }) => el.job_position_name === selectedJobPosition[0].label && el.job_level_name === selectedjobLevel[0].label).length;
          setJobPost(filteredJobPost);
        }
      } else {
        console.log("No data received from the API");
      }

      if (candidatesresponse.data) {
        setCandidates(candidatesresponse.data.Total_candidates);
        setCandidatesLoading(true);
      } else {
        console.log("No data received from the API");
      }

      if (jobpositiontimeresponse.data) {
        setJobPositionTimeWise(jobpositiontimeresponse.data.Data);
        setjobpositiontimewiseLoading(true);

        // setTopJobPositions(jobpositiontimeresponse.data.Data.top_job_positions);
        // setTopJobPositionsLoading(true);

        setTopJobPositionsPie(jobpositiontimeresponse.data.Data.top_job_positions_pie);
        setTopJobPositionsLoadingPie(true);

        setTopJobLevelsPie(jobpositiontimeresponse.data.Data.top_job_levels_pie);
        setTopJobLevelsLoadingPie(true);
      } else {
        console.log("No data received from the API");
      } 

      if (languageresponse.data) {
        setLang(languageresponse.data.Top_Five_Languages);
        setLangLoader(true);
      } else {
        console.log("No data received from the API");
      }

      if (nationalityresponse.data) {
        setNationality(nationalityresponse.data.TopFiveNationalities);
        setNationalityLoader(true);
      } else {
        console.log("No data received from the API");
      }
      }
      // setMainLoader(false);
    } catch (error) {
      console.log("API request error:", error);
    } 
  };

  useEffect(() => {
    mainEducationDash();
    // const timeoutId = setTimeout(() => {
    //   mainEducationDash();
    // }, Math.floor(Math.random() * 6000) + 1000);
    // return () => clearTimeout(timeoutId);
  }, [selectedJobPosition, selectedjobLevel]);


  const jobLevelFilter = (joblevel: OptionType | null) => {
    if (joblevel) {
      setselectedjobLevel([joblevel]);
      setValue("jobLevel", joblevel);
    } else {
      setselectedjobLevel(null);
    }

    if (joblevel) {
    if(selectedJobPosition != null){
      mainEducationDash(joblevel.value , selectedJobPosition[0]["value"]);
    }else{
      mainEducationDash(joblevel.value , "");
    }
  }
  };

  const jobPositionFilter = (jobPosition: OptionType | null) => {
     if (jobPosition) {
        setselectedJobPosition([jobPosition]);
        setValue("jobPosition", jobPosition);
      } else {
        setselectedJobPosition(null);
      }

      if(jobPosition){
        if(selectedjobLevel != null){
          mainEducationDash(selectedjobLevel[0]["value"], jobPosition.value);
        }else{
          mainEducationDash("", jobPosition.value);
        }
      }
  };



  return (
    <>
      <div className='row g-5 g-xl-8'>

        <div className='col-xl-4'>

          <br></br>

        <div className='mb-10'>

          <Controller
            name="jobPosition"
            rules={{ required: "Job position is required" }}
            control={control}  
            render={({ field }) => (
              <Select
                {...field}

                onChange={(selectedOption) => jobPositionFilter(selectedOption)}


                value={selectedJobPosition}
                options={sel_options?.jobPos}
                isClearable
                isSearchable
                placeholder="Select Job Position..."
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

        </div>

        <div className='mb-10'>

          <Controller
            name="jobLevel"
            rules={{ required: "Job level is required" }}
            control={control}  
            defaultValue={defaultValues.jobLevel}
            render={({ field }) => (
              <Select
                {...field}
                // onChange={(selectedOption) => {
                //   if (selectedOption) {
                //     setselectedjobLevel([selectedOption]);
                //     setValue("jobLevel", selectedOption);
                //   } else {
                //     setselectedjobLevel(null);
                //   }
                // }}
                onChange={(selectedOption) => jobLevelFilter(selectedOption)}
                
                value={selectedjobLevel}
                options={sel_options?.jobLev}
                isClearable
                isSearchable
                placeholder="Select Job Level..."
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


        </div>

          
        </div>

        <div className='col-xl-4'>

        { jobPostLoading ? (
          <StatisticsWidget5
            className='card-xl-stretch mb-xl-8'
            svgIcon='cheque'
            color='info'
            iconColor='white'
            title= 'Job Posts'
            titleColor='white'
            description='Active'
            descriptionColor='white'
            stats = {jobpost}

          />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}
        </div>

        <div className='col-xl-4'>

        { candidatesLoading ? (

          <StatisticsWidget5
            className='card-xl-stretch mb-5 mb-xl-8'
            svgIcon='chart-simple-3'
            color='danger'
            iconColor='white'
            title='Candidates'
            titleColor='white'
            description='Active'
            descriptionColor='white'
            stats = {candidates}
          />
         ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8'/></>
          )}
        </div>
        
      </div>
     
      
      <div className='row gy-5 g-xl-8'>

        <div className='col-xxl-12'>

        { jobpositiontimewiseLoading && jobpositiontimewise ? (
          <MixedWidget3
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='250px'
            jobpositiontimewise = {jobpositiontimewise}
          />

          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}

        </div>

        {/* <div className='col-xl-6'>
          { topJobpositionLoading ? (


            <TopJobPosition className='card-xl-stretch mb-xl-8' topJobposition={topJobposition} />
            ) : (
              <> Loading ....</>
            )}
        </div> */}

      </div>

      
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>

          { topJobpositionLoadingpie && topJobpositionpie ? (

              <div className="card card-xl-stretch mb-xl-8">

                <div className='card-header border-0 pt-5'>
                
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Demanded Jobs</span>

                    <span className='text-muted fw-semibold fs-7'>Among candidates at last six months</span>
                  </h3>

                </div>

                <div className='card-body'>

                <PieChart width={1000} height={400}>
              
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={topJobpositionpie}
                      cx={200}
                      cy={200}
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />

                    <Tooltip />

                  </PieChart>

                </div> 

              </div>

            

            ) : (
              <> <Skeleton count={5} className="card card-xl-stretch mb-xl-8" /></>
            )}

        </div>

        <div className='col-xl-6'>

        { topJoblevelLoadingpie && topJobplevelpie ? (

            <div className="card card-xl-stretch mb-xl-8">

              <div className='card-header border-0 pt-5'>
              
                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label fw-bold fs-3 mb-1'>Demanded Job Levels</span>

                  <span className='text-muted fw-semibold fs-7'>Among candidates at last six months</span>
                </h3>

              </div>

              <div className='card-body'>

              <PieChart width={1000} height={400}>
            
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={topJobplevelpie}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#f1ab5e"
                    label
                  />

                  <Tooltip />

                </PieChart>

               </div> 

            </div>

          

          ) : (
            <> <Skeleton count={5} className="card card-xl-stretch mb-xl-8"/></>
          )}
        
        </div>
        
      </div>

      
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
        { degreesLoading ? (
          <ChartsWidget1 className='card-xl-stretch mb-xl-8' degrees={degrees} />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}

        </div>
        <div className='col-xl-6'>
        { universitiesLoading ? (
          <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' universities={universities} />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-5 mb-xl-8' /></>
          )}

        </div>
      </div>


      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
        { workplaceLoading ? (
          <ChartWorkplace className='card-xl-stretch mb-xl-8' workplace={workplace} />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}

        </div>
        <div className='col-xl-6'>
        { joiningPeriodLoading ? (
          <ChartJoiningPeriod className='card-xl-stretch mb-5 mb-xl-8' joiningPeriod={joiningPeriod} />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-5 mb-xl-8' /></>
          )}

        </div>
      </div>


      
      <div className='row g-5 g-xl-8'>

        <div className='col-xl-4'>
        { techSkillsLoading ? (

          <ListsWidget4 className='card-xl-stretch mb-xl-8' techskills={techskills} />

          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}

        </div>
   

        <div className='col-xxl-4'>

        { langloader ? (

          <LanguageChart
            className='card-xxl-stretch-50 mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='250px'
            lang = {lang}
          />

          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}


          
          { nationloader ? (

          <NationalityChart
            className='card-xxl-stretch-50 mb-5 mb-xl-8'
            chartColor='warning'
            chartHeight='250px'
            nation = {nation}
          />

          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-5 mb-xl-8' /></>
          )}



         
        </div>

        { softskillsLoading
         ? (
        
        <div className='col-xl-4'>
          <ListsWidget6 className='card-xl-stretch mb-5 mb-xl-8' softskills={softskills} />
        </div>

          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-5 mb-xl-8' /></>
          )}
      </div>


      <div className='row g-5 g-xl-8'>
        <div className='col-xl-8'>

        { eduloader ? (
          <EducationChart className='card-xl-stretch mb-xl-8' educationdata={educationdata} />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}

        </div>
        <div className='col-xl-4'>
        { edufieldloader ? (
          <EducationFieldChart className='card-xl-stretch mb-5 mb-xl-8' edufield={edufield} />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-5 mb-xl-8' /></>
          )}

        </div>
      </div>


      
      <div className='row g-5 g-xl-8'>

        <div className='col-xl-6'>

          { projectloader ? (

          <ProjectDashboard className='card-xl-stretch mb-xl-8' color='primary' projectdata={projectdata} totalprojects={totalprojects} />

          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}

        </div>

        <div className='col-xl-6'>

          { empTypeLoader ? (
            <EmptypeChart className='card-xl-stretch mb-xl-8' empType={empType} />

            ) : (
              <> <Skeleton count={5} className='card-xl-stretch mb-xl-8'/></>
            )}

        </div>

      </div>


      <div className='row g-5 g-xl-8'>

        
        <div className='col-xl-12'>

        { exploader ? (
          <ExpChart className='card-xl-stretch mb-xl-8' exptotalyears={exptotalyears}  />
          ) : (
            <> <Skeleton count={5} className='card-xl-stretch mb-xl-8' /></>
          )}

        </div>
       
      </div>
     

    </>

  

  );


}

const DashboardWrapperHrvolt = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={dashboardBreadCrumbs}>
        {intl.formatMessage({id: 'MENU.DASHBOARD'})}
      </PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapperHrvolt}
