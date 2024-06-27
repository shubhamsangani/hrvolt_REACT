
import React, {useEffect, useState} from 'react'
import axios from "axios";

import { 
  MixedWidget7,
  
 } from '../../../../../_metronic/partials/widgets'

 import { autoCompareCandidateJobDescripDetailsAPI } from '../../../../../app/api'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  userId?: string;
  recruiterId?: string;
  jdId?: string;
}

type CandidateDetail = {
  user_id: string;
  user_name: string;
  job_description_id: string;
  job_pos: string;
  recruiter_user_id: string;
  not_match_dict: Record<string, number>;
  match_dict: Record<string, number>;
  candidateDetails: string;
  recruiterDetails: string;
  AI_Comparision_Percentage: number;
  Preference_Percentage: number;
  Final_Percentage: number;
}


type AnalysisCandidateDetail = {
  "Education": number;
  "Education Field": number;
  "Employment Type": number;
  "Joining Period": number;
  "Soft Skills": number;
  "Nationality": number;
  "Project": number;
  "Hackathon": number;
  "Contribution": number;
  "Workshop": number;
  "Competition": number;
  "Certificate": number;
  "Work Place": number;
  "Language": number;
  "Gender": number;
  "Technical Skills": number;
};

import { useTranslation } from 'react-i18next';

const ComparisionReportPage: React.FC<Props> = ({userId, recruiterId, jdId}) => {

  const { t } = useTranslation(); 


  const [candidateDetail, setCandidateDetails] = useState<CandidateDetail | null>(null);

  const [matchcandidateDetail, setMatchCandidateDetails] = useState<AnalysisCandidateDetail | null>(null);
  const [notmatchcandidateDetail, setNotMatchCandidateDetails] = useState<AnalysisCandidateDetail | null>(null);

  const [loading, setLoading] = useState(false);

  
  const candidateDetails = async () => {


    const inpData = {
        "user_id": userId,
        "job_description_id": jdId,
        "recruiter_user_id": recruiterId
    }

      const apiUrl = autoCompareCandidateJobDescripDetailsAPI();

      try {

        const response = await axios.post(apiUrl, inpData);


        if (response.data && response.data.Data) {

          console.log("matched: ", response.data.Data.match_dict)
          console.log("not matched: ", response.data.Data.not_match_dict)

          
          setCandidateDetails(response.data.Data);
          setMatchCandidateDetails(response.data.Data.match_dict);
          setNotMatchCandidateDetails(response.data.Data.not_match_dict);
          setLoading(true);


        } else {
          console.log("No data received from the API");
        }

      } catch (error) {
        console.log("API request error:", error);
      } 
    
  };

  useEffect(() => {
    
    try {

        candidateDetails();

    } catch (error) {
      console.log("Error: ", error);
    } finally {
      
      console.log("Candidate details: ");

    }

  }, []);


  return (
        
      <div className='card mb-5 mb-xl-10'>

        <div className='row g-5 g-xl-8'>

          <div className='col-xl-12'>

            { loading && candidateDetail ? ( 

            <MixedWidget7
              className='card-xl-stretch mb-xl-4'
              chartColor='primary'
              chartHeight='200px'
              candidateDetail = {candidateDetail}
            />

            ) : (
              <> <Skeleton count={5} className='card-xl-stretch mb-xl-4' /> </>
            )}
          
          </div>

        </div>

      
        <div className='row g-5 g-xl-8'>

          <div className='col-xl-12'>
            {/* <TablesWidget2 className='card-xl-stretch mb-5 mb-xl-4' /> */}
            <div className='card card-xl-stretch mb-5 mb-xl-4'>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>{t('translation:match_found')}</span>
              </h3>
              <div className='card-toolbar'>
                {/* end::Menu 1 */}
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
              {/* begin::Table container */}

              { loading ? ( 

              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gs-5 gy-9'>
                  {/* begin::Table head */}
                  <thead>
                    <tr>
                      <th className='p-0 w-200px'></th>
                      <th className='p-0 min-w-150px'></th>
                      
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>

              
                  {matchcandidateDetail  && Object.entries(matchcandidateDetail).map(([category, percentage]) => (
                    <tr>
                      <td key={category}>
                        <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        {category}
                        </a>
                        
                      </td>
                      <td>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-muted me-2 fs-7 fw-semibold'>{percentage} %</span>
                          </div>
                          <div className='progress h-6px w-100'>
                            <div
                              className='progress-bar bg-primary'
                              role='progressbar'
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>

                  ))}
                  
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>

                ) : (
                  <> <Skeleton count={5} className='card-xl-stretch mb-xl-4' /> </>
                )}

              {/* end::Table container */}
          </div>
          </div>
          </div>

        </div>

        <div className='row g-5 g-xl-8'>

          <div className='col-xl-12'>
            
            <div className='card card-xl-stretch mb-xl-4'>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>{t('translation:match_not_found')}</span>
              </h3>
              <div className='card-toolbar'>
                {/* end::Menu 1 */}
                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
              {/* begin::Table container */}

              { loading ? ( 

              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gs-5 gy-9'>
                  {/* begin::Table head */}
                  <thead>
                    <tr>
                      <th className='p-0 w-200px'></th>
                      <th className='p-0 min-w-150px'></th>
                      
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>

                  {notmatchcandidateDetail && Object.entries(notmatchcandidateDetail).map(([category, percentage]) => (
                    
                    <tr key={category}>
                      <td>
                        <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                            {category}
                        </a>
                        
                      </td>
                      <td>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-muted me-2 fs-7 fw-semibold'>{percentage} %</span>
                          </div>
                          <div className='progress h-6px w-100'>
                            <div
                              className='progress-bar bg-danger'
                              role='progressbar'
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                    
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>

              ) : (
                <> <Skeleton count={5} className='card-xl-stretch mb-xl-4' /> </>
              )}


              {/* end::Table container */}
            </div>
            </div>

          </div>

        </div>

      </div>
      
  )

}


export {ComparisionReportPage}