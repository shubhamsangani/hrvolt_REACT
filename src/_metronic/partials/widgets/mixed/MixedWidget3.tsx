
import {useEffect, useRef, FC} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
// import {KTIcon} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
// import {Dropdown1} from '../../content/dropdown/Dropdown1'
// import clsx from 'clsx'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'

type JobPositionTimeWise = {
  result: {
    year: number;
    month: string;
    total_job_positions: number;
    total_job_levels: number;
    job_positions: Record<string, number>;
    job_levels: Record<string, number>;
  }[];
  yearly_counts: Record<string, number>;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  current_year_count: number;
  last_year_count: number;
  top_job_positions: Record<string, number>;
  top_job_levels: Record<string, number>;
  top_job_positions_pie: { name: string; value: number }[];
  top_job_levels_pie: { name: string; value: number }[];
}


type Props = {
  className: string;
  chartColor: string;
  chartHeight: string;
  jobpositiontimewise: JobPositionTimeWise; 
}

const MixedWidget3: FC<Props> = ({className, chartColor, chartHeight, jobpositiontimewise}) => {

  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const refreshChart = () => {
    if (!chartRef.current) { 
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight, jobpositiontimewise))
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
      {/* begin::Header  */}
      <div className={`card-header border-0 bg-${chartColor} py-5`}>
        <h3 className='card-title fw-bold text-white'>Job Demands in Last Six Months</h3>

        {/* <div className='card-toolbar'>
          <button
            type='button'
            className={clsx(
              'btn btn-sm btn-icon btn-color-white btn-active-white',
              `btn-active-color-${chartColor}`,
              'border-0 me-n3'
            )}
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          <Dropdown1 />
        </div> */}
      </div>
      {/* end::Header  */}

      {/* begin::Body  */}
      <div className='card-body p-0'>
        {/* begin::Chart  */}
        <div
          ref={chartRef}
          className={`mixed-widget-12-chart card-rounded-bottom bg-${chartColor}`}
        ></div>
        {/* end::Chart  */}

        {/* begin::Stats  */}
        <div className='card-rounded bg-body mt-n10 position-relative card-px py-15'>
          {/* begin::Row  */}
          <div className='row g-0 mb-7'>
            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-500'>Current Year</div>
              <div className='fs-2 fw-bold text-gray-800'>{jobpositiontimewise.current_year_count}</div>
            </div>
            {/* end::Col  */}

            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-500'>Last Year</div>
              <div className='fs-2 fw-bold text-gray-800'>{jobpositiontimewise.last_year_count}</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}

          {/* begin::Row  */}
          <div className='row g-0'>
            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-500'>Current Quarter</div>
              <div className='fs-2 fw-bold text-gray-800'>{jobpositiontimewise.q1}</div>
            </div>
            {/* end::Col  */}

            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-500'>Last Quarter</div>
              <div className='fs-2 fw-bold text-gray-800'>{jobpositiontimewise.q2}</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}
        </div>
        {/* end::Stats  */}
      </div>
      {/* end::Body  */}
    </div>
  )
}

const chartOptions = (chartHeight: string, jobpositiontimewise: JobPositionTimeWise): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')

  const totalJobPositionsList = jobpositiontimewise.result.map(data => data.total_job_positions);
  const totalJobLevelsList = jobpositiontimewise.result.map(data => data.total_job_levels);
  const yearMonthList = jobpositiontimewise.result.map(data => `${data.year} - ${data.month}`);

  return {
    series: [
      {
        name: 'Job Position',
        data: totalJobPositionsList,
      },
      {
        name: 'Job Level',
        data: totalJobLevelsList,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: yearMonthList,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: ['solid', 'solid'],
      opacity: [0.25, 1],
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + ' Jobs'
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['#ffffff', '#ffffff'],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 20,
        right: 20,
      },
    },
  }
}

export {MixedWidget3}
