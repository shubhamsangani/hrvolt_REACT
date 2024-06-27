import React, {useState} from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'

import { CompanyDetailOverview } from './CompanyDetailOverview'

import { CompanyDetailSettings} from './CompanyDetailSettings'

import { CompanyDetailHeader } from './CompanyDetailHeader'

const accountBreadCrumbs: Array<PageLink> = [
    {
      title: 'Company',
      path: 'company-detail-overview/*',
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


import { useTranslation } from 'react-i18next';

const CompanyDetailPage: React.FC = () => {

  const { t } = useTranslation(); 

  const [companyupdate, setCompanyUpdate] = useState(false);

  const handleCompanyUpdate = (companyUp = false) => {
    setCompanyUpdate(companyUp);
  };
 
  return (
    <Routes>
      <Route
        element={
          <>
            <CompanyDetailHeader companyupdate={companyupdate}/>
            <Outlet />
          </>
        }
      >
        <Route
          path='company-detail-overview/*'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>{t('translation:company_detail_overview')}</PageTitle>
              <CompanyDetailOverview companyupdate={companyupdate} />
            </>
          }
        />
        <Route
          path='company-detail-settings'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>{t('translation:company_detail_settings')}</PageTitle>
              <CompanyDetailSettings onhandleCompanyUpdate = {handleCompanyUpdate}/>
            </>
          }
        />
        <Route index element={<Navigate to='company-detail-overview' />} />
      </Route>
    </Routes>
  )
}

export {CompanyDetailPage}