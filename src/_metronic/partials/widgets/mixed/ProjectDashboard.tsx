
import { FC } from 'react'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {KTIcon} from '../../../helpers'

type Props = {
  className: string
  color: string
  projectdata:  Record<string, number>; 
  totalprojects: number
}

const ProjectDashboard: FC<Props> = ({className, color, projectdata, totalprojects}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>Project</h3>
            
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-semibold fs-7'>Total Projects</span>
            <span className='fw-bold fs-2x pt-1'>{totalprojects}</span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Items */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
          style={{marginTop: '-100px'}}
        >

        {Object.entries(projectdata).map(([key, value], index) => (

          <div key={index} className='d-flex align-items-center mb-6'>
           
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTIcon iconName='compass' className='fs-1' />
              </span>
            </div>
          
            <div className='d-flex align-items-center flex-wrap w-100'>
            
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bold'>
                  {key}
                </a>
                
              </div>
              
              <div className='d-flex align-items-center'>
                <div className='fw-bold fs-5 text-gray-800 pe-1'>{value}</div>
              </div>
              
            </div>
            
          </div>

         ))}
    
        </div>
    
      </div>

    </div>
  )
}

export {ProjectDashboard}
