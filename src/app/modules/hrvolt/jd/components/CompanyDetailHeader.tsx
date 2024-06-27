import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'

import React, {useState, useEffect} from 'react'
import axios from "axios";
import { CompanyDetailsGetOneByUserAPI } from '../../../../../app/api'
import useAuth from '../../../../../app/hooks/useAuth'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface CompanyDetailHeaderProps {
  companyupdate: boolean;
}


type CompanyDetails = {
  company_info_id: string;
  company_name: string;
  company_description: string;
  company_established_year: string;
  contact_number: string;
  company_email: string;
  company_googlelink: string;
  company_linkdinlink: string;
  company_team_member: string;
  company_twitter_link: string;
  company_facebook_link: string;
  sector_id: string;
  sector_name: string;
  location_id: string;
  location_name: string;
  company_type_id: string;
  company_type_name: string;
  company_action: string;
  company_registration_date: string;
};


import { useTranslation } from 'react-i18next';

const CompanyDetailHeader: React.FC<CompanyDetailHeaderProps> = ({ companyupdate }) => {

  const location = useLocation()
  const { t } = useTranslation(); 

  
  const { userDetail, initialUserDetail, authTokens  } = useAuth();

  const [companydetails, setCompanyDetails] = useState<CompanyDetails>();
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    
    const viewCompany = async () => {

      if (userDetail && initialUserDetail && authTokens) {
  
      const inpData = {
        "user_id": userDetail.id || initialUserDetail.id,
      };
    
  
      const apiUrl = CompanyDetailsGetOneByUserAPI();
  
      const headers = {
        Authorization: `Bearer ${authTokens.access}`,
      };
  

      try {
        const response = await axios.post(apiUrl, inpData, { headers });
  
        if (response.data && response.data.Data) {

         setCompanyDetails(response.data.Data);
                     
        } else {
          console.log("No data received from the API");
        }
      } catch (error) {
        console.log("API request error:", error);
      } finally {
        setLoading(true);
      }
  
      }
    };

    viewCompany();

  }, [companyupdate]);


  return (
    <>
    {loading ? (
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={toAbsoluteUrl('media/avatars/company.png')} alt='BroaderAI' />
               
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>

                    {/* <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {companydetails?.company_name.charAt(0).toUpperCase() + companydetails.company_name.slice(1) || "--"} -  {companydetails?.company_type_name.charAt(0).toUpperCase() + companydetails.company_type_name.slice(1) || "--"}
                    </a> */}
                    
                    {companydetails && (
                      <>
                        <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                          {companydetails.company_name?.charAt(0).toUpperCase() + companydetails.company_name?.slice(1) || "--"} -  {companydetails.company_type_name?.charAt(0).toUpperCase() + companydetails.company_type_name?.slice(1) || "--"}
                        </a>
                        {/* Other parts of your JSX code */}
                      </>
                    )}

                    
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>

                  {companydetails && (
                      <>

                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      {companydetails?.sector_name.charAt(0).toUpperCase() + companydetails.sector_name.slice(1) || "--"}
                    </a>

                    </>
                    )}

                    {companydetails && (
                      <>

                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='geolocation' className='fs-4 me-1' />
                      {companydetails?.location_name.charAt(0).toUpperCase() + companydetails.location_name.slice(1) || "--"}
                    </a>


                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-500 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {companydetails?.company_email.charAt(0).toUpperCase() + companydetails.company_email.slice(1) || "--"}
                    </a>

                    </>
                    )}

                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>

                  {companydetails && (
                      <>

                    <div className='col-lg-8 fv-row'>
                      <span className='fw-bold fs-6'>{companydetails?.company_established_year.charAt(0).toUpperCase() + companydetails.company_established_year.slice(1) || "--"}</span>
                    </div>

                    <div className='col-lg-8 fv-row'>
                      <span className='fw-bold fs-6'>{companydetails?.company_team_member.charAt(0).toUpperCase() + companydetails.company_team_member.slice(1) || "--"}</span>
                    </div>

                    </>
                    )}

                  </div>

                  
                </div>

                
              </div>

          
            </div>
          </div>

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/hrvolt/jd/company-details/company-detail-overview' && 'active')
                  }
                  to='/hrvolt/jd/company-details/company-detail-overview'
                >
                  {t('translation:overview')}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/hrvolt/jd/company-details/company-detail-settings' && 'active')
                  }
                  to='/hrvolt/jd/company-details/company-detail-settings'
                >
                  {t('translation:edit_pro')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    ) : (
      <>  <Skeleton count={5} className="card mb-5 mb-xl-10" /> </>
    )}
    </>
  )
}

export {CompanyDetailHeader}