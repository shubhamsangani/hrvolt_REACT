import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'

import { ViewJdPageHeader } from './ViewJdPageHeader'

// import { } from './CompanyDetailSettings_11'
import { ViewJdPageAll } from './ViewJdPageAll'

import { ViewJdPageDeactive } from './ViewJdPageDeactive'
import { ViewJdPageActive } from './ViewJdPageActive'

const accountBreadCrumbs: Array<PageLink> = [
    {
      title: 'Job Post',
      path: 'view-job-post-all/*',
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

const ViewJdDetailPage: React.FC = () => {
 

  return (
    <Routes>
      <Route
        element={
          <>
            <ViewJdPageHeader />
            <Outlet />
          </>
        }
      >

        <Route
          path='view-job-post-all'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>All Job Posts</PageTitle>
              <ViewJdPageAll className='mb-5 mb-xl-8'/>
            </>
          }
        />
        
        <Route
          path='view-job-post-active'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Active Job Posts</PageTitle>
              <ViewJdPageActive className='mb-5 mb-xl-8'/>
            </>
          }
        />
        <Route
          path='view-job-post-deactive'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Deactive Job Posts</PageTitle>
              <ViewJdPageDeactive className='mb-5 mb-xl-8'/>
            </>
          }
        />
        <Route index element={<Navigate to='view-job-post-active' />} />
      </Route>
    </Routes>
  )
}

export {ViewJdDetailPage}