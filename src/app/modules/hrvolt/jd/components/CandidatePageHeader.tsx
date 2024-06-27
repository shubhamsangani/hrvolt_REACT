import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react'

import {useLocation} from 'react-router'

import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form';


import useAuth from '../../../../../app/hooks/useAuth'
import axios from "axios";


import {
  jobDescriptionGetUserAPI
 } from '../../../../../app/api'

import { useTranslation } from 'react-i18next';

interface OptionType {
  label: string;
  value: string;
}

interface CandidatePageHeaderProps {
  onJobPostChange: (jobPost: OptionType | null) => void;
}

const CandidatePageHeader: React.FC<CandidatePageHeaderProps> = ({ onJobPostChange }) => {

  const { t } = useTranslation(); 

  const location = useLocation()

  const [selectedjobPost, setselectedjobPost] = useState<Array<OptionType> | null>(null);
  const [activePosts, setActivePosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [ActivePostsloading, setActivePostsLoading] = useState(false);


  const { userDetail, initialUserDetail, authTokens  } = useAuth();


  const defaultValues = {
    jobPost: { value: "", label: "Select Job Post" },

  };

  console.log(loading, ActivePostsloading)

  const {
    control,
    setValue
  } = useForm({
    mode: "all",
    defaultValues,
  });

  useEffect(() => {

    setLoading(true);
    
    try {

      if (userDetail && initialUserDetail && authTokens) {

        const viewJobs = async () => {
          const inpData = {
            "user_id": userDetail.id || initialUserDetail.id,
            "job_description_action": "active",
          };
  
          const apiUrl = jobDescriptionGetUserAPI();
  
          const headers = {
            Authorization: `Bearer ${authTokens.access}`,
          };
  
          try {
            const response = await axios.post(apiUrl, inpData, { headers });
  
            if (response.data && response.data.Data) {
              
               setActivePosts(response.data.Data);
               setActivePostsLoading(true);
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


  const jobPostFilter = (jobPost: OptionType | null) => {

    if (jobPost) {

      setselectedjobPost([jobPost]);
      setValue("jobPost", jobPost);
      onJobPostChange(jobPost);
    } else {

      setselectedjobPost(null);

    }

  //  mainEducationDash();

 };

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='row mb-4'>
            <div className='col-lg-12 fv-row'>

                <h6>{t('translation:activeJobPost')}: </h6>
                
                <div className='me-2'>

                <Controller
                      name="jobPost"
                      rules={{ required: "Job Post is required" }}
                      control={control}  
                      defaultValue={defaultValues.jobPost}
                      render={({ field }) => (
                        <Select
                          {...field}

                          onChange={(selectedOption) => jobPostFilter(selectedOption)}

                          // onChange={(selectedOption) => {

                          //   if (selectedOption) {
                          //     setselectedjobPost([selectedOption]);
                          //     setValue("jobPost", selectedOption);
                          //   } else {
                          //     setselectedjobPost(null);
                          //   }
                          // }}
                          
                          value={selectedjobPost}
                          options={activePosts.map((el: { job_description_id: string, job_tilte: string }) => ({
                            value: el.job_description_id,
                            label: el.job_tilte,
                          }))}
                          // options={sel_options?.jobPos}
                          isClearable
                          isSearchable
                          placeholder={t('translation:selectJobPost')}
                          
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
                
                
            </div>
          

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/hrvolt/jd/candidate-list-details/candidate-list' && 'active')
                  }
                  to='/hrvolt/jd/candidate-list-details/candidate-list'
                >
                  {t('translation:candidates')}
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/hrvolt/jd/candidate-list-details/candidate-list-ai' && 'active')
                  }
                  to='/hrvolt/jd/candidate-list-details/candidate-list-ai'
                >
                  {t('translation:aiRecommendation')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export {CandidatePageHeader}