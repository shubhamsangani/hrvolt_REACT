
import React, {useEffect, useRef, useState} from 'react'

import ApexCharts, {ApexOptions} from 'apexcharts'

// import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'


import { useThemeMode } from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

import { getCSSVariableValue } from '../../../../../_metronic/assets/ts/_utils'

import { AllCandidateListBasedOnJobDescriptionAPI } from '../../../../../app/api'


import axios from "axios";

import { Document, Page } from 'react-pdf';

import Modal from 'react-bootstrap/Modal';


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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

    user_id: string
    user_name: string
    user_position: string
    user_level: string
    user_tech: string
    user_resume: string

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


const CandidatePage: React.FC<Props> = ({className, chartColor, chartHeight, selectedJobPost}) => {

  
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const [candidates, setCandidates] = useState<Array<candidateType> | null>(null);
  console.log("🚀 ~ candidates:", candidates)

  const [searchCandidates, setSearchCandidates] = useState<string>('');
  const [filteredCandidates, setFilteredCandidates] = useState<Array<candidateType> | null>(null);

  const [active, setActive] = useState<number>(1);

  const [modalShowResume, setModalShowResume] = React.useState(false);
  const [resumepath, setResumepath] = useState("");

  const [loading, setLoading] = useState(false);
  const [initloading, setinitLoading] = useState(true);

    
  type Event = React.ChangeEvent<HTMLInputElement>;

  const handleSearch = (event: Event): void => {
    const query = event.target.value.toLowerCase();
    setSearchCandidates(query);
    setActive(1);

    if(query){
      const filtered = candidates?.filter((row) =>
        row.user_name.toLowerCase().includes(query)
      ) || null;
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidates);
    }
  };

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

    if(selectedJobPost){

      const inpData = {
        "job_description_id": selectedJobPost.value
      };

      const apiUrl = AllCandidateListBasedOnJobDescriptionAPI();

      try {
        const response = await axios.post(apiUrl, inpData);


        if (response.data && response.data.Data) {
          
          setCandidates(response.data.Data);
          setFilteredCandidates(response.data.Data);
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

  const resumeModelFun = (resume_path: string) => {
    setResumepath(resume_path)
    setModalShowResume(true)
  }

   // Calculate the total page for pagination button display
  const totalItems: number  = candidates?.length ?? 0 ;
  const itemsPerPage: number = 2;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  // Calculate the index range of candidates to display based on the current page
  const indexOfLastCandidate = active * itemsPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
  const currentCandidates = filteredCandidates?.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  //Pagination
  const getItemProps = (index: number) => ({
    variant: active === index ? "filled" : "text",
    className: active === index ? "btn btn-primary mx-2" : "mx-2 btn btn-secondary",
    onClick: () => setActive(index),
  } as any);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} {...getItemProps(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    (loading  ? (
    <>
      <div className={`card ${className}`}>

         {/* begin::Header */}
         <div className='card-header border-0 pt-5'>
           <div>
           <input
              type="text"
              placeholder= 'Search by Candidate Name'
              className = "form-control"
              value={searchCandidates}
              onChange={handleSearch}
            />
            </div>
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
                      currentCandidates?.map((resp, index) => (

                        <tr key={index}>
                          
                          <td>

                            <div className='d-flex align-items-center mb-17'>
                              

                            {/* begin::Avatar */}
                              <div className='symbol symbol-50px me-20'>
                                <img src={toAbsoluteUrl('media/avatars/pro.png')} className='' alt='' />
                              </div>
                              {/* end::Avatar */}

                              {/* begin::Text */}
                              <div className='flex-grow-1 me-20'>
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
                              <div className='flex-grow-1 me-20'>
                                <span className='text-gray-900 d-block fw-semibold'>
                                  {resp.user_tech != "" ? resp.user_tech : "---" }</span>
                              </div>
                              {/* end::Text */}

                              {/* <div className='flex-grow-1'>
                                <a href="#" className="btn btn-icon btn-primary me-2"><i className="fa-solid fa-chart-simple"></i></a>
                              </div> */}

                            {/* <div className='flex-grow-1'>
                              <div className='card-toolbar'>
                              
                                <button
                                  type='button'
                                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                                  data-kt-menu-trigger='click'
                                  data-kt-menu-placement='bottom-end'
                                  data-kt-menu-flip='top-end'
                                >
                                  <KTIcon iconName='category' className='fs-2' />
                                </button>
                                <div
                                  className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
                                  data-kt-menu='true'
                                >
                                  
                                  <div className='menu-item px-3'>
                                    <div className='menu-content fs-6 text-gray-900 fw-bold px-3 py-4'>Quick Actions</div>
                                  </div>
                                  <div className='separator mb-3 opacity-75'></div>
                                
                                  <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                      Approved
                                    </a>
                                  </div>

                                  <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                      Rejected
                                    </a>
                                  </div>

                                </div>
                                </div>
                            </div> */}
                            
                          </div>
                          </td>

                          
                          <td>
                              <div className='flex-grow-1 me-20'>
                              
                              

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

                {(currentCandidates?.length ?? 0) >= itemsPerPage && (
                <div className='text-center'>
                  <button className='p-3 btn btn-primary me-2' onClick={prev} disabled={active === 1}>Prev</button>
                  <div className="d-inline-block">{renderPageButtons()}</div>
                  <button className='p-3 btn btn-primary ms-2' onClick={next} disabled={active === totalPages}>Next</button>
                </div>
                )}
              </table>
              {/* end::table */}


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


export {CandidatePage}