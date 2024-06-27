import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'

// import {Link} from 'react-router-dom'




type Props = {
  className: string
}

const ViewJdPageAll: React.FC<Props> = ({className}) => {
  

  return (
    <>
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          {/* <span className='card-label fw-bold fs-3 mb-1'>New Arrivals</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 new products</span> */}
        </h3>
        {/* <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary'>
            <KTIcon iconName='plus' className='fs-2' />
            New Member
          </a>
        </div> */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-0 pb-0'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}

            <thead>

              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>Job Post</th>
                <th className='min-w-200px'>Job Position</th>
                <th className='min-w-200px'>Job Level</th>
                {/* <th className='min-w-200px'>Candidates</th> */}

                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}

            <tbody>

              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('media/stock/600x400/img-26.jpg')}
                        className=''
                        alt=''
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        Looking for experience Python Developer
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        Python, Django,Flask, HTML, CSS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Python Developer
                  </a>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Senior
                  </a>
                </td>
                {/* <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                    50
                  </a>
                </td> */}

                
                <td className='text-end'>
                  {/* <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTIcon iconName='switch' className='fs-3' />
                  </a> */}
                  {/* <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTIcon iconName='pencil' className='fs-3' />
                  </a> */}
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTIcon iconName='trash' className='fs-3' />
                  </a>
                </td>
              </tr>
             
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
    </>
  )
}

export {ViewJdPageAll}