import React, { useState, useEffect } from 'react'
// import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'

import { toAbsoluteUrl } from '../../../../../_metronic/helpers'

// import {Card4} from '../../../../../_metronic/partials/content/cards/Card4'
import Select from 'react-select'

import "./BulkResume.css"

import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';

import { ComparisionReportPage } from './ComparisionReportPage'

import useAuth from '../../../../../app/hooks/useAuth'
import axios from "axios";

// import LoaderPage from '../../../../../_metronic/helpers/LoaderPage';

// import { useDispatch } from "react-redux";

// import {Link} from 'react-router-dom'

import {
  jobDescriptionGetUserAPI
} from '../../../../../app/api'


import { bulkResumeRegister } from '../../../../actions/userAction'

import { Document, Page } from 'react-pdf';

import { useTranslation } from 'react-i18next';


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



type JobApplication = {
  jobPost: {
      value: string;
      label: string;
  };
  resumeUpload: FileList;
};


// type ResumeData = {
//   resume_file_path: string;
//   text: string;
//   candidate_name: string;
//   aiCompPercentageScore: number;
// };

// type ResumeList = ResumeData[];


type Props = {
  className: string
}


interface ComparisionReportModalProps {
  show: boolean;
  onHide: () => void;
}

interface OptionType {
  label: string;
  value: string;
}

// interface formDataType {
//   resumeUpload: string;
//   jobPost: { value: string, label: string };
// }

interface ResumeModalProps {
  show: boolean;
  onHide: () => void;
  resume_path: string;
}


function ComparisionReportModal(props: ComparisionReportModalProps) {
  const { t } = useTranslation(); 

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('translation:comparision_resport')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ComparisionReportPage />
      </Modal.Body>

    </Modal>
  );
}


function ResumeViewModal(props: ResumeModalProps) {

  const [numPages, setNumPages] = useState<number>();
  //  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Document file={props.resume_path} onLoadSuccess={onDocumentLoadSuccess}>
            {
             [...Array(numPages).keys()].map((page) => (
              <Page key={page + 1} pageNumber={page + 1} renderTextLayer={false} renderAnnotationLayer={false} />
            ))
            }

     </Document>


    </Modal>
  );

}


const validateFileType = (value: FileList) => {

  // console.log("file val", value)
  
  if (!value[0]) {
    return "Please select a file.";
  }

  if (value[0].size > 5242880){
    return "File is too large. Max 5 MB.";
  }

  if (
    ![
      "application/x-zip-compressed",
    ].includes(value[0].type)
  ) {
    return "Only .zip is allowed.";
  }
};


const BulkResume: React.FC<Props> = ({ className }) => {

  const { t } = useTranslation(); 
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowResume, setModalShowResume] = React.useState(false);
  const [resumepath, setResumepath] = useState("");


  // const dispatch = useDispatch();

  const [selectedjobPost, setselectedjobPost] = useState<Array<OptionType> | null>(null);

  const [loading, setLoading] = useState(false);
  const [activePosts, setActivePosts] = useState([]);

  const [compareAnalysis, setcompareAnalysis] = useState<JobApplicationDetails | null>(null);
 
  const [ActivePostsloading, setActivePostsLoading] = useState(false);
  const [compareAnalysisloading, setcompareAnalysisLoading] = useState(false);

  const { userDetail, initialUserDetail, authTokens } = useAuth();

  const defaultValues = {
    jobPost: { value: "", label: "" },
    resumeUpload: new DataTransfer().files
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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


  const handleBulkResumePage = async (data: JobApplication) => {
    setLoading(true);
  
    try {
      if (userDetail && initialUserDetail && authTokens) {
        const formData = new FormData();
  
        formData.append("user_id", userDetail.id || initialUserDetail.id);
        formData.append("recruiter_bulk_resume_upload", data.resumeUpload[0]);
        formData.append("job_description_id", data.jobPost.value);
  
        // Call bulkResumeRegister and await its result
        const compareData = await bulkResumeRegister(formData, data.jobPost.value, userDetail.id || initialUserDetail.id, authTokens.access);
  
        console.log("compareData: ", compareData);
  
        // Assuming compareData is of type ResumeList
        setcompareAnalysis(compareData);
        setcompareAnalysisLoading(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  


  const resumeModelFun = (resume_path: string) => {

    setResumepath(resume_path)
    setModalShowResume(true)

  }



  return (
    <>


      <div>

        <div className={`card ${className}`}>

          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>

            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>{t('translation:aiRecommendation')}</span>
            </h3>

          </div>
          {/* end::Header */}

          {/* begin::Body */}

          <div className='card-body pt-2'>
            <div className="container">
              <form onSubmit={handleSubmit((data) => handleBulkResumePage(data))} noValidate className='form'>

                <div className="card">


                  <div className="drop_box">
                    <p>{t('translation:bulkresume_zip')}</p>
                      <input
                        {...register("resumeUpload", {
                          required: t('translation:bulk_resume_validation'),
                          validate: validateFileType,
                        })}
                        type="file"
                        accept=".zip"
                      />
                      {errors.resumeUpload && (
                        <span className="errorMsg">{errors.resumeUpload.message}</span>
                      )}
                    
                  </div>

                  <Controller
                    name="jobPost"
                    rules={{ required: t('translation:bulkresume_select') }}
                    control={control}
                    defaultValue={defaultValues.jobPost}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(selectedOption) => {
                          if (selectedOption) {
                            setselectedjobPost([selectedOption]);
                            setValue("jobPost", selectedOption);
                          } else {
                            setselectedjobPost(null);
                          }
                        }}

                        value={selectedjobPost}
                        options={activePosts.map((el: { job_description_id: string, job_tilte: string }) => ({
                          value: el.job_description_id,
                          label: el.job_tilte,
                        }))}
                        // options={sel_options?.jobPos}
                        isClearable
                        isSearchable
                        placeholder={t('translation:bulk_resume_job_post')}

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

                  {errors.jobPost && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.jobPost.message}</div>
                    </div>
                  )}



                  <br />

                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {!loading && t('translation:ai_analysis')}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        {t('translation:please_wait')}{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>

                  {/* <button type='submit' className='btn btn-primary'>
                    
                  </button> */}

                </div>

              </form>
            </div>
          </div>


          {/* begin::Body */}

        </div>



        {compareAnalysisloading ? (
          <>

            <div className='d-flex flex-wrap flex-stack mb-6'>
              <h3 className='fw-bolder my-2'>
              {t('translation:resumes_title')}
              </h3>

              {/* <div className='d-flex my-2'>
                <div className='d-flex align-items-center position-relative me-4'>
                  <KTIcon iconName='magnifier' className='fs-3 position-absolute ms-3' />
                  <input
                    type='text'
                    id='kt_filter_search'
                    className='form-control form-control-white form-control-sm w-150px ps-9'
                    placeholder='Search'
                  />
                </div>
              </div> */}
            </div>

            <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>

              

              {compareAnalysis && compareAnalysis.aiCompPercentageScore.map((analysis, index) => (

                <div key={index} className='col-12 col-sm-12 col-xl'>

                  <div className='card h-80'>
                    <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                      <a href='#' className='text-gray-800 text-hover-primary d-flex flex-column' onClick={() => resumeModelFun(analysis.resume_file_path)}>
                        <div className='symbol symbol-75px mb-6'>
                          <img src={toAbsoluteUrl('media/svg/files/pdf.svg')} alt='' />
                        </div>

                        <div className='fs-5 fw-bolder mb-2'>{analysis.aiCompPercentageScore} %</div>
                      </a>
                      <div className='fs-5 fw-bolder mb-2'></div>
                      {/* <div className='fs-7 fw-bold text-gray-500 mt-auto'>{analysis.candidate_name} </div>&nbsp; */}

                      {/* <a href="#"><i className="fa-solid fa-chart-simple" onClick={() => setModalShow(true)}></i></a>&nbsp; */}

                    </div>
                  </div>

                </div>
              ))}

            </div>
          </>

        ) :
          <></>
        }


        <ResumeViewModal
          show={modalShowResume}
          onHide={() => setModalShowResume(false)}
          resume_path={resumepath}
        />



        <ComparisionReportModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

      </div>


    </>
  )
}

export { BulkResume }