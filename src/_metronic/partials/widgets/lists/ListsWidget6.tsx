
import { FC } from 'react'
import {KTIcon} from '../../../helpers'
// import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
  softskills: Record<string, number>
}

const ListsWidget6: FC<Props> = ({softskills}) => {
  
  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-900'>Trends</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Trending soft skills</span>
        </h3>
        
      </div>
      
      <br></br>


      <div className='card-body pt-0'>

      {Object.entries(softskills).map(([skill, count]) => ( 


        <div key= {skill} className='d-flex align-items-center bg-light-warning rounded p-5 mb-7'>
      
          <span className=' text-warning me-5'>
            <KTIcon iconName='abstract-26' className='text-warning fs-1 me-5' />
          </span>
         
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
            {skill}
            </a>
            <span className='text-muted fw-semibold d-block'>{count}</span>
          </div>

        </div>
      
       

        ))}
        
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget6}
