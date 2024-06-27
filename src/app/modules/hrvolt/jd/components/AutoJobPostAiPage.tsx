import {FC} from 'react'
import Select from 'react-select'

import { Controller, useForm } from 'react-hook-form';
import React, {useState, useEffect} from 'react'
import axios from "axios";

// import { KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'

import { infiniteScrollApiCall, getUniqueRec } from '../../../../common/inifinitescroll'

import { setDropdownOptions } from '../../../../actions/userAction'

import { useDispatch, useSelector } from "react-redux";

import useAuth from '../../../../../app/hooks/useAuth'



import { jobPositionBySearchAPI, jobLevelBySearchAPI,autoJobDescriptionAPI } from '../../../../../app/api'
// import { IProfileDetailsAI, AiJobDesType, JobDescriptionResponse } from './AutoJdModel';

// import { IProfileDetailsAI, JobDescriptionResponse } from './AutoJdModel';

import { JobDescriptionResponse } from './AutoJdModel';



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


type JobDetails = {
  jobPosition: {
      value: string;
      label: string;
  };
  jobLevel: {
      value: string;
      label: string;
  };
};


interface AutoJobPostAiPageProps {
  onJobDescription: (jobDescription: JobDescriptionResponse) => void;
}

const limit = 10

import { useTranslation } from 'react-i18next';

const AutoJobPostAiPage: FC<AutoJobPostAiPageProps> = ({ onJobDescription }) => {

  const { t } = useTranslation();


  const { userDetail, initialUserDetail, authTokens  } = useAuth();


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)

  const sel_options = useSelector((state: RootState) => state?.userDetail?.options);

  const [selectedJobPosition, setselectedJobPosition] = useState<Array<OptionType> | null>(null);
  const [selectedjobLevel, setselectedjobLevel] = useState<Array<OptionType> | null>(null);

  const [currrentJobPositionPage, setCurrrentJobPositionPage ] = useState(1)
  const [totalJobPositionPage, setTotalJobPositionPage ] = useState()
  const [searchJobPositionPage, setSearchJobPositionPage ] = useState("")

  const [currrentJobLevelPage, setCurrrentJobLevelPage ] = useState(1)
  const [totalJobLevelPage, setTotalJobLevelPage ] = useState()
  const [searchJobLevelPage, setSearchJobLevelPage ] = useState("")

  // const [autoDescription,setAutoJobDescription] = useState([]);

  // const [autoJobDescription, setAutoJobDescription] = useState<AiJobDesType[]>([]);


  const defaultValues: JobDetails = {
    jobPosition: { value: "", label: "" },
    jobLevel: { value: "", label: "" }, 
  }

  const {
    // register,
    control,
    handleSubmit,
    formState: { errors },
    setValue
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

  const handleJobPostPage = async (data: JobDetails) => {
    console.log("new data: ", data)
    setLoading(true);
    try {
      
      if (userDetail && initialUserDetail && authTokens) {

        const reportGen = async () => {
          const inpData = {
            "user_id": userDetail.id || initialUserDetail.id,
            "job_level_id": data.jobLevel.value,
            "job_position_id": data.jobPosition.value
          };
  
          const apiUrl = autoJobDescriptionAPI();
  
          const headers = {
            Authorization: `Bearer ${authTokens.access}`,
          };
          
          try {
            // setLoading(true);
            const response = await axios.post(apiUrl, inpData, { headers });
  
            if (response.data && response.data.Data) {
              
              // setAutoJobDescription(response.data.Data);

              const timeoutId = setTimeout(() => {
                onJobDescription(response.data.Data);
              }, Math.floor(Math.random() * 6000) + 5000);

              return () => clearTimeout(timeoutId);

              

            } else {
              console.log("No data received from the API");
              setLoading(false);
            }
          } catch (error) {
            console.log("API request error:", error);
            setLoading(false);
          } 
          // finally {
          //   setLoading(false);
          // }
        };
  
        await reportGen();
      }

    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    } 
    // finally {
    //   setLoading(false);
    // }
    
  };

  return (
  
    <div className='card mb-5 mb-xl-10'>

      <form onSubmit={handleSubmit((data) => handleJobPostPage(data))} noValidate className='form'>

        <div className='card-body border-top p-9'>
          
          {/* 

          <div className='row mb-6'>
            
            <div className='row'>
              <div className='col-lg-12 fv-row'>

              <h5> Job Title: </h5>

                <input
                  {...register("jobTitle", {
                    required: "Job Title is Required"
                  })}
                  name="jobTitle"
                  type="text"
                  placeholder="Enter job Title"
                  id="jobTitle"
                  required
                />

                  {errors.jobTitle && (
                    <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{errors.jobTitle.message}</div>
                  </div>
                  )}

              
              </div>

            </div>
            
          </div> */}

          <div className='row mb-6'>
                <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <h5>{t('translation:job_position')}:</h5>
                      <Controller
                        name="jobPosition"
                        rules={{ required: t('translation:job_position_required') }}
                        control={control}  
                        defaultValue={defaultValues.jobPosition}
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
                      <h5>{t('translation:job_level')}:</h5>
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

        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && t('translation:generate')}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {t('translation:generating')}{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
        </div>
        
      </form>


    </div>      
  )

}

export {AutoJobPostAiPage}