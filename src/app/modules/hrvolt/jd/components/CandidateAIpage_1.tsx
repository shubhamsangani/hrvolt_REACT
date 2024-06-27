
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'

import Modal from 'react-bootstrap/Modal';

import { useThemeMode } from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { getCSSVariableValue } from '../../../../../_metronic/assets/ts/_utils'

// import { ComparisionReportPage } from './ComparisionReportPage'


// import { Dropdown1 } from '../../../../../_metronic/partials/content/dropdown/Dropdown1'



// type Props = {
//   className: string
// }

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

interface ComparisionReportModalProps {
  show: boolean;
  onHide: () => void;
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
        {/* <ComparisionReportPage/> */}
      </Modal.Body>
     
    </Modal>
  );
}


const CandidateAIpage: React.FC<Props> = ({className, chartColor, chartHeight}) => {

  const [modalShow, setModalShow] = React.useState(false);


  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

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


  useEffect(() => {

    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [chartRef, mode])

  return (

      <div className={`card ${className}`}>

         {/* begin::Header */}
         <div className='card-header border-0'>
            <h3 className='card-title fw-bold text-gray-900'>Candidates</h3>
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
          <div className='card-body pt-2'>
            {/* begin::Item */}
            <div className='d-flex align-items-center mb-7'>

            <div className='flex-grow-1'>
              <div ref={chartRef} className='mixed-widget-4-chart' style={{ width: '50%', height: '50%' }}></div>
            </div>

              {/* begin::Avatar */}
              <div className='symbol symbol-50px me-5'>
                <img src={toAbsoluteUrl('media/avatars/300-6.jpg')} className='' alt='' />
              </div>
              {/* end::Avatar */}

              {/* begin::Text */}
              <div className='flex-grow-1'>
                <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                  Yash Patel
                </a>
                <span className='text-muted d-block fw-semibold'>Data Scientist</span>
              </div>
              {/* end::Text */}
              


              {/* begin::Text */}
              <div className='flex-grow-1'>
                <span className='text-gray-900 d-block fw-semibold'>HTML, Python, Java Script, CSS</span>
              </div>
              {/* end::Text */}

            <div className='flex-grow-1'>
              <a href="#" className="btn btn-icon btn-primary" onClick={() => setModalShow(true)}><i className="fa-solid fa-chart-simple"></i></a>&nbsp;
              
              <a href="#" className="btn btn-icon btn-primary"><i className="fa-solid fa-file"></i></a> 
            </div>

            

            <div className='flex-grow-1'>
              <div className='card-toolbar'>
                {/* begin::Menu */}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  <KTIcon iconName='category' className='fs-2' />
                </button>
                {/* begin::Menu 2 */}
                <div
                  className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
                  data-kt-menu='true'
                >
                  {/* begin::Menu item */}
                  <div className='menu-item px-3'>
                    <div className='menu-content fs-6 text-gray-900 fw-bold px-3 py-4'>Quick Actions</div>
                  </div>
                  {/* end::Menu item */}
                  {/* begin::Menu separator */}
                  <div className='separator mb-3 opacity-75'></div>
                  {/* end::Menu separator */}
                  {/* begin::Menu item */}
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
                {/* end::Menu 2 */}
                {/* end::Menu */}
              </div>
            </div>



              
            </div>
            {/* end::Item */}
            
          </div>
          {/* end::Body */}

          <ComparisionReportModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

      </div>    

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