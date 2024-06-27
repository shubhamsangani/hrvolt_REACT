
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'

// import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'

import { toAbsoluteUrl } from '../../../../../_metronic/helpers'


import useAuth from '../../../../../app/hooks/useAuth'

import { useThemeMode } from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

import { getCSSVariableValue } from '../../../../../_metronic/assets/ts/_utils'

import { autoCompareCandidateJobDescripListAPI } from '../../../../../app/api'

import axios from "axios";

import { ComparisionReportPage } from './ComparisionReportPage'


import { Document, Page } from 'react-pdf';
import Modal from 'react-bootstrap/Modal';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// import { Dropdown1 } from '../../../../../_metronic/partials/content/dropdown/Dropdown1'

// type Props = {
//   className: string
// }


type Props = {
  className: string
  chartColor: string
  chartHeight: string
  selectedJobPost: {
    value: string,
    label: string
  }
}

type candidateType = {

  user_id: string,
  user_name: string,
  user_position: string,
  user_level: string,
  user_tech: string,
  job_description_id: string,
  recruiter_user_id: string,
  AI_Comparision_Percentage: number,
  Preference_Percentage: number,
  Final_Percentage: number,
  user_resume: string

}

interface ComparisionReportPageProps {
  userId: string;
  recruiterId: string;
  jdId: string;
}

interface ComparisionReportModalProps extends ComparisionReportPageProps {
  show: boolean;
  onHide: () => void;
}


interface ResumeModalProps {
  show: boolean;
  onHide: () => void;
  resume_path: string;
}



function ResumeViewModal(props: ResumeModalProps) {

  const [numPages, setNumPages] = useState<number>();
  // const [pageNumber, setPageNumber] = useState<number>(1);

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



function ComparisionReportModal(props: ComparisionReportModalProps) {

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
          <Modal.Title>Comparision Report</Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <ComparisionReportPage
          userId={props.userId}
          recruiterId={props.recruiterId}
          jdId={props.jdId}
         />
      </Modal.Body>
     
    </Modal>
  );
}



const CandidateAIpage: React.FC<Props> = ({className, chartColor, chartHeight, selectedJobPost}) => {


  const [modalShow, setModalShow] = React.useState(false);

  const [modalData, setModalData] = useState({
    userId: '',
    recruiterId: '',
    jdId: '',
  });

  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const [candidates, setCandidates] = useState<Array<candidateType> | null>(null);

  const { userDetail, initialUserDetail, authTokens  } = useAuth();

  const [modalShowResume, setModalShowResume] = React.useState(false);
  const [resumepath, setResumepath] = useState("");

  const [loading, setLoading] = useState(false);

  const [initloading, setinitLoading] = useState(true);



  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight))
  
    if (chart) {
      chart.render()
    }

    return chart
  }

  const viewCandidates = async () => {

    if (userDetail && initialUserDetail && authTokens) {

      if(selectedJobPost){

        const inpData = {
          "job_description_id": selectedJobPost.value,
          "recruiter_user_id": userDetail.id || initialUserDetail.id
        };

        const apiUrl = autoCompareCandidateJobDescripListAPI();

        try {

          const response = await axios.post(apiUrl, inpData);


          if (response.data && response.data.Data) {
            
            setCandidates(response.data.Data);
            setLoading(true);


          } else {
            console.log("No data received from the API");
          }

        } catch (error) {
          console.log("API request error:", error);
        } finally {
          console.log("Candidate API");

        }
      }
    }
  };

  useEffect(() => {
    
    try {

      setLoading(false);

      if(selectedJobPost["value"] != ""){
        setinitLoading(false);
      }else{
        setinitLoading(true);
      }

      viewCandidates();

    } catch (error) {

      console.log("Error: ", error);

    } finally {
      
      console.log("Candidate details: ");

    }

  }, [selectedJobPost]);


  useEffect(() => {

    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [chartRef, mode])


  const handleModal = (userId: string, recruiterId: string, jdId: string ) => {

    setModalShow(true)

    setModalData({
      userId,
      recruiterId,
      jdId,
    });

  }


  const resumeModelFun = (resume_path: string) => {

    setResumepath(resume_path)
    setModalShowResume(true)

  }


  return (

  (loading  ? (

    <>

    <div className={`card ${className}`}>

       {/* begin::Header */}
       <div className='card-header border-0 pt-5'>
          {/* <h3 className='card-title align-items-star flex-column'>Candidates</h3> */}
          {/* <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTIcon iconName='category' className='fs-2' />
            </button>
            <Dropdown1 />
          </div> */}
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className='card-body pt-2 pb-0'>
          {/* begin::Table container */}
          <div className='table-responsive'>

            {/* begin::Table */}

            <table className='table align-middle gs-0 gy-4'>
              {/* begin::Table body */}
              <tbody>

              {candidates && candidates.length > 0 ? (

                    candidates.map((resp, index) => (

                      <tr key={index}>
      
                        <td>

                          <div className='d-flex align-items-center mb-17'>

                          {/* <div className='flex-grow-1 me-15'>
                              <div ref={chartRef} className='mixed-widget-4-chart' style={{ width: '50%', height: '90%' }}></div>
                          </div> */}
                            

                          {/* begin::Avatar */}
                            <div className='symbol symbol-50px me-20'>
                              <img src={toAbsoluteUrl('media/avatars/pro.png')} className='' alt='' /> 

                               {/* begin::Text */}
                              <div className='flex-grow-1 me-10'>
                              &nbsp;<br></br>
                                <span className='text-gray-900 fw-bold text-hover-primary fs-6'>
                                  {resp.Final_Percentage} %
                                </span>
                                
                              </div>
                           {/* end::Text */}
                            </div>
                            {/* end::Avatar */}

                            

                            {/* begin::Text */}
                            <div className='flex-grow-1 me-10'>
                              <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                               {resp.user_name.charAt(0).toUpperCase() + resp.user_name.slice(1)}
                              </a>
                              <span className='text-muted d-block fw-semibold'>
                               {resp.user_level.charAt(0).toUpperCase() + resp.user_level.slice(1)}
                                &nbsp;{resp.user_position.charAt(0).toUpperCase() + resp.user_position.slice(1)}
                                </span>
                            </div>
                            {/* end::Text */}

                            {/* begin::Text */}
                            <div className='flex-grow-1 '>
                              <span className='text-gray-900 d-block fw-semibold'>
                                {resp.user_tech != "" ? resp.user_tech : "---" }</span>
                            </div>
                            {/* end::Text */}

                        
                          
                        </div>
                        </td>

                        <td>
                              <div className='flex-grow-1 me-20'>

                              
                              {/* <a href="#" className="btn btn-icon btn-primary me-1" onClick={() => setModalShow(true)}><i className="fa fa-line-chart"></i></a>  */}

                              <a href="#" className="btn btn-icon btn-primary me-1" onClick={() => handleModal(resp.user_id, resp.recruiter_user_id, resp.job_description_id)}><i className="fa fa-line-chart"></i></a> 
                              
                              </div>
                          </td>


                        <td>
                            <div className='flex-grow-1'>
                            
                            <a href="#" className="btn btn-icon btn-primary me-1" onClick={() => resumeModelFun(resp.user_resume)}><i className="fa-solid fa-file" ></i></a> 
                            </div>
                        </td>

                      </tr>

                    
                      )
                    )

              ) : (
                <>

                </>
              )
              } 
          
              </tbody>
              {/* end::Table body */}

            </table>
            {/* end::table */}

            <ComparisionReportModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              userId={modalData.userId}
              recruiterId={modalData.recruiterId}
              jdId={modalData.jdId}
              />
          </div>
         {/* end::container */}
          
        </div>
        {/* end::Body */}

    </div>   
    

    <ResumeViewModal
          show={modalShowResume}
          onHide={() => setModalShowResume(false)}
          resume_path={resumepath}
        />
   
   </>

    ) : 
    
    (
      ( initloading ? (

       <></>

     ) : ( 

       <Skeleton count={5} className={`card ${className}`} /> 

      )
     )
    
   
    )
    
    )

  )

}



const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  const lightColor = getCSSVariableValue('--bs-' + chartColor + '-light')
  const labelColor = getCSSVariableValue('--bs-gray-700')

  return {
    series: [74],
    chart: {
      fontFamily: 'inherit',
      height: chartHeight,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '65%',
        },
        dataLabels: {
          name: {
            show: false,
            fontWeight: '700',
          },
          value: {
            color: labelColor,
            fontSize: '30px',
            fontWeight: '700',
            offsetY: 12,
            show: true,
            formatter: function (val) {
              return val + '%'
            },
          },
        },
        track: {
          background: lightColor,
          strokeWidth: '100%',
        },
      },
    },
    colors: [baseColor],
    stroke: {
      lineCap: 'round',
    },
    labels: ['Progress'],
  }
}


export {CandidateAIpage}