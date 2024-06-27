
import { FC } from 'react'
// import {KTIcon, toAbsoluteUrl} from '../../../helpers'

import {toAbsoluteUrl} from '../../../helpers'

// import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
  items?: number
  techskills: Record<string, number>
}

const ListsWidget4: FC<Props> = ({items = 6, techskills}) => {

  return (
    <div className='card card-xl-stretch mb-xl-8'>

      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-900'>Trends</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Trending technical skills</span>
        </h3>
        
      </div>
      
      
      <div className='card-body pt-5'>

      {Object.entries(techskills).map(([skill, count]) => (

        <div key={skill} className='d-flex align-items-sm-center mb-7'>
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label'>
              <img
                src={toAbsoluteUrl('media/svg/brand-logos/plurk.svg')}
                className='h-50 align-self-center'
                alt=''
              />
            </span>
          </div>

          <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                {skill}
              </a>
              <span className='text-muted fw-semibold d-block fs-7 fw-bold'>{count}</span>
            </div>
          </div>

        </div>

      ))}
        
      </div>

    </div>
  )
}

export {ListsWidget4}
