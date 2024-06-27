import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import { alljobdescriptionGetAPI } from '../../../../../app/api'
import useAuth from '../../../../../app/hooks/useAuth'
import axios from "axios";

// import {educationType, educationFieldType, langType, genType, nationalityType, joiningPeriodType, softType, techType, benType, respType, viewJobPost } from './AutoJdModel'

import {educationType, educationFieldType, langType, genType, nationalityType, joiningPeriodType, softType, techType, benType, respType } from './AutoJdModel'



import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type JobPostData = {
  Message: string;
  jobDescription: {
    user_id: string;
    job_position_id: string;
    job_level_id: string;
    job_position_name: string;
    job_level_name: string;
    job_tilte: string;
    job_description_id: string;
    salary_min: string;
    salary_max: string;
    number_of_vacancy: string;
    job_description_action: string;
    job_description_registration_date: string;
  }[];
  jobEducation: {
    user_id: string;
    education_job_description_id: string;
    education_id: string;
    education_name: string;
    job_description_id: string;
    education_job_description_action: string;
    education_job_description_registration_date: string;
  }[];
  jobEducationField: {
    user_id: string;
    education_field_job_description_id: string;
    education_field_id: string;
    education_field_name: string;
    job_description_id: string;
    education_field_job_description_action: string;
    education_field_job_description_registration_date: string;
  }[];
  jobSoftSkills: {
    user_id: string;
    soft_skills_job_description_id: string;
    soft_skills_id: string;
    soft_skills_name: string;
    job_description_id: string;
    soft_skills_job_description_action: string;
    soft_skills_job_description_registration_date: string;
  }[];
  jobTechnicalSkills: {
    user_id: string;
    technical_skills_job_description_id: string;
    technical_skills_id: string;
    technical_skills_name: string;
    job_description_id: string;
    technical_skills_job_description_action: string;
    technical_skills_job_description_registration_date: string;
  }[];
  jobCustomResponsibilities: {
    responsibilities_description: string;
  }[];// Assuming this is an empty array

  jobCustomReq: {
    requirement_description: string;
  }[];// Assuming this is an empty array

  jobCustomBenefits: {
    benefit_description: string;
  }[];// Assuming this is an empty array  
  jobResponsibilities: {
    job_responsibility_id: string;
    job_responsibility_description: string;
  }[];
  jobRequirements: never[]; // Assuming this is an empty array
  jobBenefits: {
    job_benefit_id: string;
    job_benefit_description: string;
  }[];
  jobLocations: never[]; // Assuming this is an empty array
  jobEmploymentType: {
    employment_type_id: string;
    employment_type_name: string;
  }[];
  Nationality: {
    user_id: string;
    nationality_job_description_id: string;
    nationality_id: string;
    nationality_name: string;
    job_description_id: string;
    nationality_job_description_action: string;
    nationality_job_description_registration_date: string;
  }[];
  Gender: {
    user_id: string;
    gender_job_description_id: string;
    gender: string;
    job_description_id: string;
    gender_job_description_action: string;
    gender_job_description_registration_date: string;
  }[];
  WorkPlace: {
    user_id: string;
    work_place_job_description_id: string;
    work_place_id: string;
    work_place_name: string;
    job_description_id: string;
    work_place_job_description_action: string;
    work_place_job_description_registration_date: string;
  }[];
  language: {
    user_id: string;
    language_job_description_id: string;
    language_id: string;
    language_name: string;
    job_description_id: string;
    language_job_description_action: string;
    language_job_description_registration_date: string;
  }[];
  JoiningPeriod: {
    user_id: string;
    joining_period_job_description_id: string;
    joining_period_id: string;
    joining_period_name: string;
    job_description_id: string;
    joining_period_job_description_action: string;
    joining_period_job_description_registration_date: string;
  }[];
};


export function JobPostViewPage() {

  const [loading, setLoading] = useState(false);
  const [jobloader, setJobLoader] = useState(false);


  const [jobpostData, setJobPostData] = useState<JobPostData | null>(null);



  const { userDetail, initialUserDetail, authTokens  } = useAuth();

  const { postId } = useParams<{ postId: string }>();

  console.log(loading)


  useEffect(() => {
    
    try {

      if (userDetail && initialUserDetail && authTokens) {

        const viewJobs = async () => {

          const inpData = {
            "user_id": userDetail.id || initialUserDetail.id,
            "job_description_id": postId
          };
  
          const apiUrl = alljobdescriptionGetAPI();
  
          const headers = {
            Authorization: `Bearer ${authTokens.access}`,
          };
  
          try {
            const response = await axios.post(apiUrl, inpData, { headers });
  
            if (response.data) {
              
               console.log("job: ", response.data);
               setJobPostData(response.data);
               setJobLoader(true);

            } else {
              console.log("No data received from the API");
            }
          } catch (error) {
            console.log("API request error:", error);
          } finally {
            setLoading(false);
          }
        };
  
        viewJobs();
      }

    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }

  }, []);




  return (

    (jobloader  && jobpostData ? (
    <>
      <div className='card mb-6 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-3 fw-bold text-muted'>Education</label>
            <div className='col-lg-3'>
            
            {jobpostData.jobEducation && jobpostData.jobEducation.length > 0 ? (
                jobpostData.jobEducation.map((education : educationType, index: number) => (
                    <span key={index} className='fw-bold fs-6 text-gray-900'>
                        {education.education_name.charAt(0).toUpperCase() + education.education_name.slice(1)} <br></br>
                    </span>
                ))
            ) : (
                <>
                  --
                </>
            )}

            </div>
            <label className='col-lg-3 fw-bold text-muted'>Education Field</label>
            <div className='col-lg-3 fv-row'>

            {jobpostData.jobEducationField && jobpostData.jobEducationField.length > 0 ? (
                jobpostData.jobEducationField.map((educationfield : educationFieldType, index: number) => (
                    <span key={index} className='fw-bold fs-6'>
                        {educationfield.education_field_name.charAt(0).toUpperCase() + educationfield.education_field_name.slice(1)} <br></br>
                    </span>
                ))
            ) : (
                <>
                  --
                </>
            )}
              
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-3 fw-bold text-muted'>Vacancies</label>
            <div className='col-lg-3'>
              <span className='fw-bold fs-6 text-gray-900'>{jobpostData.jobDescription.length > 0 ? jobpostData.jobDescription[0].number_of_vacancy : '--'}</span>
            </div>
            <label className='col-lg-3 fw-bold text-muted'>Joining Period</label>
            <div className='col-lg-3 fv-row'>
              {jobpostData.JoiningPeriod && jobpostData.JoiningPeriod.length > 0 ? (
                  jobpostData.JoiningPeriod.map((joinperiod : joiningPeriodType, index: number) => (
                      <span key={index} className='fw-bold fs-6'>
                          {joinperiod.joining_period_name.charAt(0).toUpperCase() + joinperiod.joining_period_name.slice(1)} <br></br>
                      </span>
                  ))
              ) : (
                  <>
                    --
                  </>
              )}
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-3 fw-bold text-muted'>Minimum Salary(USD)</label>
            <div className='col-lg-3'>
              <span className='fw-bold fs-6 text-gray-900'>{jobpostData.jobDescription.length > 0 ? jobpostData.jobDescription[0].salary_min : '--'}</span>
            </div>
            <label className='col-lg-3 fw-bold text-muted'>Maximum Salary(USD)</label>
            <div className='col-lg-3 fv-row'>
              <span className='fw-bold fs-6'>{jobpostData.jobDescription.length > 0 ? jobpostData.jobDescription[0].salary_max : '--'}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-3 fw-bold text-muted'>Nationality</label>
            <div className='col-lg-3'>
              {jobpostData.Nationality && jobpostData.Nationality.length > 0 ? (
                  jobpostData.Nationality.map((nation : nationalityType, index: number) => (
                      <span key={index} className='fw-bold fs-6 text-gray-900'>
                          {nation.nationality_name.charAt(0).toUpperCase() + nation.nationality_name.slice(1)} <br></br>
                      </span>
                  ))
              ) : (
                  <>
                    --
                  </>
              )}
            </div>
          </div>
      </div>
      </div>
      <div className='card mb-6 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-body p-9'>

        <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Technical Skills</label>
            <div className='col-lg-8 fv-row'>
              <div className="d-flex">
                  {jobpostData.jobTechnicalSkills && jobpostData.jobTechnicalSkills.length > 0 ? (
                      jobpostData.jobTechnicalSkills.map((tech : techType, index: number) => (
                        <div key={index} className="d-flex align-items-center me-2">
                          <span  className='badge badge-primary fs-6 me-2 mb-2'>
                              {tech.technical_skills_name.charAt(0).toUpperCase() + tech.technical_skills_name.slice(1)} <br></br>
                          </span>
                          </div>
                      ))
                    ) : (
                        <>
                          --
                        </>
                    )}
              </div>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Soft Skills</label>
            <div className='col-lg-8 fv-row'>
              <div className="d-flex">
                  {jobpostData.jobSoftSkills && jobpostData.jobSoftSkills.length > 0 ? (
                      jobpostData.jobSoftSkills.map((soft : softType, index: number) => (
                        <div key={index} className="d-flex align-items-center me-2">
                          <span  className='badge badge-primary fs-6 me-2 mb-2'>
                              {soft.soft_skills_name.charAt(0).toUpperCase() + soft.soft_skills_name.slice(1)} <br></br>
                          </span>
                          </div>
                      ))
                    ) : (
                        <>
                          --
                        </>
                    )}
              </div>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Gender</label>
            <div className='col-lg-8 fv-row'>
              <div className="d-flex">

                {jobpostData.Gender && jobpostData.Gender.length > 0 ? (
                  jobpostData.Gender.map((gen : genType, index: number) => (
                    <div key={index} className="d-flex align-items-center me-2">
                      <span  className='badge badge-primary fs-6 me-2 mb-2'>
                          {gen.gender.charAt(0).toUpperCase() + gen.gender.slice(1)} <br></br>
                      </span>
                      </div>
                  ))
                ) : (
                    <>
                      --
                    </>
                )}

                </div>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Language</label>
            <div className='col-lg-8 fv-row'>
              <div className="d-flex">
                  {jobpostData.language && jobpostData.language.length > 0 ? (
                      jobpostData.language.map((lang : langType, index: number) => (
                        <div key={index} className="d-flex align-items-center me-2">
                          <span  className='badge badge-primary fs-6 me-2 mb-2'>
                              {lang.language_name.charAt(0).toUpperCase() + lang.language_name.slice(1)} <br></br>
                          </span>
                          </div>
                      ))
                    ) : (
                        <>
                          --
                        </>
                    )}
              </div>
            </div>
          </div>
          {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Location</label>
            <div className='col-lg-8 fv-row'>
              <div className="d-flex">
                <div className="d-flex align-items-center me-2">
                  <span className="badge badge-primary fs-6 me-2 mb-2">surat</span>
                </div>
                <div className="d-flex align-items-center me-2">
                  <span className="badge badge-primary fs-6 me-2 mb-2">saudi</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className='card mb-6 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Responsibilities</label>
            <div className='col-lg-8 fv-row'>
              <div className="d-flex flex-column">

            
              {jobpostData.jobResponsibilities && jobpostData.jobResponsibilities.length > 0 ? (
                      jobpostData.jobResponsibilities.map((resp : respType, index: number) => (
                        <li key={index} className="d-flex align-items-center py-2">
                          <span  className='bullet bullet-vertical me-5'></span> {resp.job_responsibility_description.charAt(0).toUpperCase() + resp.job_responsibility_description.slice(1)}
                        </li>
                      ))
                    ) : (
                        <>
                          --
                        </>
              )} 
              
              </div>
          </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Manual Responsibilities</label>
            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{jobpostData.jobCustomResponsibilities.length > 0 ? jobpostData.jobCustomResponsibilities[0].responsibilities_description.charAt(0).toUpperCase() + jobpostData.jobCustomResponsibilities[0].responsibilities_description.slice(1) : '--'}</span>
              
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Benefits</label>
            <div className='col-lg-8 fv-row'>
              <div className="d-flex flex-column">

              {jobpostData.jobBenefits && jobpostData.jobBenefits.length > 0 ? (
                      jobpostData.jobBenefits.map((ben : benType, index: number) => (
                        <li key={index} className="d-flex align-items-center py-2">
                          <span  className='bullet bullet-vertical me-5'></span> {ben.job_benefit_description.charAt(0).toUpperCase() + ben.job_benefit_description.slice(1)}
                        </li>
                      ))
                    ) : (
                        <>
                          --
                        </>
              )} 

              
              </div>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Manual Benefits</label>
            <div className='col-lg-8 fv-row'>
            <span className='fw-bold fs-6'>{jobpostData.jobCustomBenefits.length > 0 ? jobpostData.jobCustomBenefits[0].benefit_description.charAt(0).toUpperCase() + jobpostData.jobCustomBenefits[0].benefit_description.slice(1) : '--'}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Manual Requirements</label>
            <div className='col-lg-8 fv-row'>
            <span className='fw-bold fs-6'>{jobpostData.jobCustomReq.length > 0 ? jobpostData.jobCustomReq[0].requirement_description.charAt(0).toUpperCase() + jobpostData.jobCustomReq[0].requirement_description.slice(1) : '--'}</span>
            </div>
          </div>
        </div>
      </div>
    </>

    ) : <> <Skeleton count={5} className='card mb-6 mb-xl-10' /> </>)
  )
}