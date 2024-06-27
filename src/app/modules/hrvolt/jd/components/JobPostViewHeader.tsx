import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'

import { alljobdescriptionGetAPI } from '../../../../../app/api'
import useAuth from '../../../../../app/hooks/useAuth'
import axios from "axios";

// import { empType, workType, viewJobPost } from './AutoJdModel'

import { empType, workType } from './AutoJdModel'


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


const JobPostViewHeader: React.FC = () => {

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
              
               console.log(response.data);
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
    (jobloader && jobpostData ? (
    <>
      <div className='card mb-5 mb-xl-12'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={toAbsoluteUrl('media/avatars/blank.png')} alt='Job Post' />
              </div>
            </div>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <h4 className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>

                    {jobpostData.jobDescription.length > 0 ? jobpostData.jobDescription[0].job_tilte.charAt(0).toUpperCase() + jobpostData.jobDescription[0].job_tilte.slice(1)  : '--'}
                    </h4>
                  </div>
                  <div className='d-flex flex-wrap fw-bold fs-4 mb-4 pe-2'>
                    <h4 className='d-flex align-items-center text-gray-500 text-hover-primary me-10 mb-2'>
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      {jobpostData.jobDescription.length > 0 ? jobpostData.jobDescription[0].job_position_name.charAt(0).toUpperCase() + jobpostData.jobDescription[0].job_position_name.slice(1) : '--'}
                    </h4>
                    <h4 className='d-flex align-items-center text-gray-500 text-hover-primary me-10 mb-2'>
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      {jobpostData.jobDescription.length > 0 ? jobpostData.jobDescription[0].job_level_name.charAt(0).toUpperCase() + jobpostData.jobDescription[0].job_level_name.slice(1) : '--'}
                    </h4>
                  </div>
                  <div className='d-flex flex-wrap fw-bold fs-5 mb-4 pe-2'>
                    <div className='col-lg-12 fv-row'>
                      <div className='row mb-5'>
                        <label className='col-lg-3 fw-bold fs-5 text-muted'>Employment Type:</label>
                        <div className='col-lg-9 fv-row'>

                        {jobpostData.jobEmploymentType && jobpostData.jobEmploymentType.length > 0 ? (
                                jobpostData.jobEmploymentType.map((emp : empType, index: number) => (
                                    <span key={index} className="badge badge-light fs-6 me-2 mb-2"> {emp.employment_type_name.charAt(0).toUpperCase() + emp.employment_type_name.slice(1)} </span>
                                ))
                              ) : (
                                  <>
                                    --
                                  </>
                        )} 
                          
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-12 fv-row'>
                      <div className='row mb-5'>
                        <label className='col-lg-3 fw-bold fs-5 text-muted'>Work Place:</label>
                        <div className='col-lg-9 fv-row'>
                        {jobpostData.WorkPlace && jobpostData.WorkPlace.length > 0 ? (
                                jobpostData.WorkPlace.map((work : workType, index: number) => (
                                    <span key={index} className="badge badge-light fs-6 me-2 mb-2"> {work.work_place_name.charAt(0).toUpperCase() + work.work_place_name.slice(1)} </span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    ) : <> <Skeleton count={5} className="card mb-5 mb-xl-12" /> </>)
  )
}
export {JobPostViewHeader}