import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
// import {KTIcon} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
// import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'

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


type Props = {
  className: string
  chartColor: string
  chartHeight: string
  candidateDetail : CandidateDetail
}

const MixedWidget7: React.FC<Props> = ({className, chartColor, chartHeight, candidateDetail}) => {


  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight, candidateDetail.Final_Percentage))
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
      {/* begin::Beader */}
      <div className='card-header border-0 py-5'>
        
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>{candidateDetail.user_name}</span>
          <span className='text-muted fw-semibold fs-7'>{candidateDetail.job_pos}</span>
        </h3>

      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body d-flex flex-column'>
        <div className='flex-grow-1'>
          <div ref={chartRef} className='mixed-widget-4-chart'></div>
        </div>

        {/* <div className='pt-5'>
          <p className='text-center fs-6 pb-5 '>
            <span className='badge badge-light-danger fs-8'>Comparision Report:</span>&nbsp; 
            <br />
            Job Post and Resume
          </p>

          <a href='#' className={`btn btn-${chartColor} w-100 py-3`}>
            Take Action
          </a>
        </div> */}
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (chartColor: string, chartHeight: string, percentage: number): ApexOptions => {
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  const lightColor = getCSSVariableValue('--bs-' + chartColor + '-light')
  const labelColor = getCSSVariableValue('--bs-gray-700')
  
  console.log("ppppp", percentage)

  return {
    series: [percentage],
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

export {MixedWidget7}
