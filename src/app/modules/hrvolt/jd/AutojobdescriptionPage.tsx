import { Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'

import { AutoJdPage } from './components/AutoJdPage'

// import { ViewJdPage } from './components/ViewJdPage'

// import { CandidatePage } from './components/CandidatePage'

import { BulkResume } from './components/BulkResume'

import { ComparisionReportPage } from './components/ComparisionReportPage'

import { CompanyDetailPage } from './components/CompanyDetailPage'

import { ViewJdDetailPage } from './components/ViewJdDetailPage'

// import { CandidatePageDetail } from './components/CandidatePageDetail'

import { CandidatePageContainer } from './components/CandidatePageContainer'

import { JobPostViewDetailPage } from './components/JobPostViewDetailPage'

import { useTranslation } from 'react-i18next';

import {JobPostPage} from './components/JobPostPage'
import { NewBulkResume } from './components/NewBulkResume'
import { CandidatesResume } from './components/CandidatesResumes'


const AutoJobDescription = () => {

  const jobDescriptionBreadCrumbs: Array<PageLink> = [
    {
      title: 'Job Description',
      path: 'hrvolt/jd/auto-job-description',
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
  const jobDescBreadCrumbs: Array<PageLink> = [
    {
      title: 'Job Description',
      path: 'hrvolt/jd/job-description',
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

  const { t,  } = useTranslation(); 

  return (

  <Routes>

    <Route element={<Outlet />}>

    <Route
        path='company-details/*'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:company_detail')}</PageTitle>
            <CompanyDetailPage />
          </>
        }
      />
      
      <Route
        path='auto-job-description'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:auto_job_desc')}</PageTitle>
            <AutoJdPage />
          </>
        }
      />

      <Route
        path='job-description'
        element={
          <>
            <PageTitle breadcrumbs={jobDescBreadCrumbs}>{t('translation:job_desc')}</PageTitle>
            <JobPostPage />
          </>
        }
      />

      <Route
        path='view-job-description-details/*'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:view_job_post')}</PageTitle>
            {/* <ViewJdPage className='mb-5 mb-xl-8' /> */}
            <ViewJdDetailPage/>
          </>
        }
      />

      <Route
        path='candidate-list-details/*'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:candidate_list')}</PageTitle>
            {/* <CandidatePage
             className='card-xl-stretch mb-xl-8'
             chartColor='primary'
            chartHeight='200px' />
             */}

             {/* <CandidatePageDetail /> */}

             <CandidatePageContainer />
          </>
        }
      />
      
      {/* <Route
        path='bulk-resumes'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:bulk_resume')}</PageTitle>
            <BulkResume className='mb-5 mb-xl-8' />
          </>
        }
      /> */}

      <Route
        path='new-bulk-resumes'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:bulk_resume')}</PageTitle>
            <NewBulkResume className='mb-5 mb-xl-8' />
          </>
        }
      />

      <Route
        path='candidates-resumes'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:candidate_resume')}</PageTitle>
            <CandidatesResume className='mb-5 mb-xl-8' />
          </>
        }
      />

      <Route
        path='comparision-report/:userId/:recruiterId/:jdId'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:comparision_report')}</PageTitle>

            <ComparisionReportPageWrapper />
          </>
        }
      />

<Route
        path='job-post-details/*'
        element={
          <>
            <PageTitle breadcrumbs={jobDescriptionBreadCrumbs}>{t('translation:job_post_details')}</PageTitle>
            <JobPostViewDetailPage />
          </>
        }
      />
      
    </Route>
  </Routes>

  )

}

const ComparisionReportPageWrapper = () => {
  const { userId, recruiterId, jdId } = useParams();

  return <ComparisionReportPage userId={userId} recruiterId={recruiterId} jdId={jdId} />;
};

export default AutoJobDescription
