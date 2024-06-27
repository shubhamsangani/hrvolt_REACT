import React from 'react'

// import {Navigate, Outlet, Route, Routes} from 'react-router-dom'

import {Navigate, Route, Routes} from 'react-router-dom'

import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'

// import { CandidatePageHeader } from './CandidatePageHeader'

import { CandidatePage } from './CandidatePage'

import { CandidateAIpage } from './CandidateAIpage'

interface OptionType {
  label: string;
  value: string;
}

interface CandidatePageHeaderProps {
  selectedJobPost: OptionType | null;
}

const accountBreadCrumbs: Array<PageLink> = [
    {
      title: 'Candidate List',
      path: 'candidate-list/*',
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

const CandidatePageDetail: React.FC<CandidatePageHeaderProps> = ({ selectedJobPost }) => {

  const jobPost = selectedJobPost || { label: "", value: "" };

  return (
    <Routes>
      
      <Route
        // element={
        //   <>
        //     <CandidatePageHeader />
        //     <Outlet />
        //   </>
        // }
      >

        <Route
          path='candidate-list'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs} >All Candidates</PageTitle>
              <CandidatePage className='card-xl-stretch mb-xl-8'
             chartColor='primary'
            chartHeight='200px'
            selectedJobPost = {jobPost}/>
            </>
          }
        />
        
        <Route
          path='candidate-list-ai'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>AI Recommended Candidates</PageTitle>
              <CandidateAIpage className='card-xl-stretch mb-xl-8'
             chartColor='primary'
            chartHeight='200px'
            selectedJobPost = {jobPost}/>
            </>
          }
        />
        
        <Route index element={<Navigate to='candidate-list' />} />
      </Route>
    </Routes>
  )
}

export {CandidatePageDetail}