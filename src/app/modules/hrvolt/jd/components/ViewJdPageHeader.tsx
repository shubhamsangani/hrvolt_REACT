import React from 'react'
// import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
// import {Dropdown1} from '../../../../../_metronic/partials'
import {useLocation} from 'react-router'

import { useTranslation } from 'react-i18next';

// import Select from 'react-select'

const ViewJdPageHeader: React.FC = () => {
  const location = useLocation()
  const { t, i18n } = useTranslation(); 

  // const options = [
  //   { value: 'option 1', label: 'Option 1' },
  //   { value: 'option 2', label: 'Option 2' },
  //   { value: 'option 3', label: 'Option 3' },
  //   { value: 'option 4', label: 'Option 4' },
  //   { value: 'option 5', label: 'Option 5' },
  // ]

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>

            {/* <div className='row mb-4'>
              <div className='col-lg-6 fv-row'>
                  <h6> Job Position: </h6>
                  <div className='me-2'>
                      <Select
                          className='react-select-styled react-select-solid'
                          classNamePrefix='react-select'
                          options={options}
                          placeholder='Select an option'
                          isMulti
                      />
                    </div>
              </div>
              <div className='col-lg-6 fv-row'>
              <h6> Job Level: </h6>
              <div className='me-2'>
                  <Select
                      className='react-select-styled react-select-solid'
                      classNamePrefix='react-select'
                      options={options}
                      placeholder='Select an option'
                      isMulti
                  />
                
                </div>
              </div>
            </div> */}
          

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
             {/* <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/hrvolt/jd/view-job-description-details/view-job-post-all' && 'active')
                  }
                  to='/hrvolt/jd/view-job-description-details/view-job-post-all'
                >
                  All
                </Link>
              </li> */}
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/hrvolt/jd/view-job-description-details/view-job-post-active' && 'active')
                  }
                  to='/hrvolt/jd/view-job-description-details/view-job-post-active'
                >
                  {t('translation:active')}
                </Link>
              </li>
              {/* <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/hrvolt/jd/view-job-description-details/view-job-post-deactive' && 'active')
                  }
                  to='/hrvolt/jd/view-job-description-details/view-job-post-deactive'
                >
                  {t('translation:deactive')}
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export {ViewJdPageHeader}