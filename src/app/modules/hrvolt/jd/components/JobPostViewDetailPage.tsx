import React from 'react'
import {Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'

import { JobPostViewHeader } from './JobPostViewHeader'

import { JobPostViewPage } from './JobPostViewPage'

// import { CandidateAIpage } from './CandidateAIpage'


const accountBreadCrumbs: Array<PageLink> = [
    {
      title: 'Job Post View',
      path: 'job-post-details/:postId',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

const JobPostViewDetailPage: React.FC = () => {
  

  return (
    <Routes>
      <Route
        element={
          <>
            <JobPostViewHeader />
            <Outlet />
          </>
        }
      >

        <Route
          path='job-post-details/:postId'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Job Post View</PageTitle>
              <JobPostViewPage/>
            </>
          }
        />
       
        
        <Route index element={<Navigate to='job-post-details' />} />
      </Route>
    </Routes>
  )
}

export {JobPostViewDetailPage}