
import React, {useState, useEffect} from 'react'
import axios from "axios";
import { CompanyDetailsGetOneByUserAPI } from '../../../../../app/api'
import useAuth from '../../../../../app/hooks/useAuth'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface CompanyDetails {
  company_name: string;
  sector_name: string;
  company_description: string;
  company_established_year: string;
  company_team_member: string;
  contact_number: string;
  company_email: string;
  company_type_name: string;
  location_name: string;
  company_twitter_link: string;
  company_facebook_link: string;
  company_googlelink: string;
  company_linkdinlink: string;
}

import { useTranslation } from 'react-i18next';

interface CompanyDetailProps {
  companyupdate: boolean;
}

export function CompanyDetailOverview({ companyupdate }: CompanyDetailProps) {


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
      
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>{t('translation:company_information')}</h3>
          </div>
        </div>

        {companydetails ? ( 

        <div className='card-body p-9'>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{t('translation:company_name')}</label>


            <div className='col-lg-8 mb-5'>
              <span className='fw-bold fs-6 text-gray-900'>{companydetails?.company_name.charAt(0).toUpperCase() + companydetails.company_name.slice(1) || "--"}</span>
            </div>
          
            <label className='col-lg-4 fw-bold text-muted'>{t('translation:company_category')}</label>

            <div className='col-lg-8 fv-row mb-5'>
              <span className='fw-bold fs-6 text-gray-900'>{companydetails?.sector_name.charAt(0).toUpperCase() + companydetails.sector_name.slice(1) || "--"}</span>
            </div>

            
            <label className='col-lg-4 fw-bold text-muted'>{t('translation:company_type')}</label>

            <div className='col-lg-8 fv-row mb-5'>
              <span className='fw-bold fs-6 text-gray-900'>{companydetails?.company_type_name.charAt(0).toUpperCase() + companydetails.company_type_name.slice(1) || "--"}</span>
            </div> 

            <label className='col-lg-4 fw-bold text-muted'>{t('translation:company_desc')}</label>

            <div className='col-lg-8 fv-row mb-5'>
              <span className='fw-bold fs-6 text-gray-900'>{companydetails?.company_description.charAt(0).toUpperCase() + companydetails.company_description.slice(1) || "--"}</span>
            </div>
          </div>


        </div>

        ): ( <></>)}

      </div>

    ) : (

      <>  <Skeleton count={5} className="card mb-5 mb-xl-10" /> </>
    )}


{loading ? ( 


      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>{t('translation:company_details')}</h3>
          </div>

          
        </div>


        {companydetails ? ( 


        <div className='card-body p-9'>

          <div className='row mb-7 mb-5'>
            
            <label className='col-lg-3 fw-bold text-muted'>{t('translation:establish_year')}</label>


            <div className='col-lg-3 mb-5'>
              <span className='fw-bold fs-6 text-gray-900'>{companydetails?.company_established_year.charAt(0).toUpperCase() + companydetails.company_established_year.slice(1) || "--"}</span>
            </div>

            <label className='col-lg-3 fw-bold text-muted'>{t('translation:employees')}</label>

                
            <div className='col-lg-3 fv-row mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.company_team_member.charAt(0).toUpperCase() + companydetails.company_team_member.slice(1) || "--"}</span>
            </div>

            <label className='col-lg-3 fw-bold text-muted'>{t('translation:contact_no')}</label>

            <div className='col-lg-3 fv-row mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.contact_number.charAt(0).toUpperCase() + companydetails.contact_number.slice(1) || "--"}</span>
            </div>

            <label className='col-lg-3 fw-bold text-muted'>{t('translation:email')}</label>

            <div className='col-lg-3 fv-row mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.company_email.charAt(0).toUpperCase() + companydetails.company_email.slice(1) || "--"}</span>
            </div>

          
            

            <label className='col-lg-3 fw-bold text-muted'>{t('translation:location')}</label>

            <div className='col-lg-3 fv-row mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.location_name.charAt(0).toUpperCase() + companydetails.location_name.slice(1) || "--"}</span>
            </div> 


            
          </div>

         

        </div>

        ): ( <></>)}

      </div>
  
  ) : (

    <>  <Skeleton count={5} className="card mb-5 mb-xl-10" /> </>
  )}
  

{loading ? ( 

      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>

        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>{t('translation:social_media')}</h3>
          </div>
         
        </div>

        {companydetails ? ( 

        <div className='card-body p-9'>

          <div className='row mb-7'>
            
            <label className='col-lg-3 fw-bold text-muted'>{t('translation:twitter')}</label>

            <div className='col-lg-3 mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.company_twitter_link.charAt(0).toUpperCase() + companydetails.company_twitter_link.slice(1) || "--"}</span>
            </div>

            <label className='col-lg-3 fw-bold text-muted'>{t('translation:facebook')}</label>

            <div className='col-lg-3 fv-row mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.company_facebook_link.charAt(0).toUpperCase() + companydetails.company_facebook_link.slice(1) || "--"}</span>
            </div>

            <label className='col-lg-3 fw-bold text-muted'>{t('translation:google')}</label>

            <div className='col-lg-3 fv-row mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.company_googlelink.charAt(0).toUpperCase() + companydetails.company_googlelink.slice(1) || "--"}</span>
            </div>

            <label className='col-lg-3 fw-bold text-muted'>{t('translation:linkedin')}</label>

            <div className='col-lg-3 fv-row mb-5'>
              <span className='fw-bold fs-6'>{companydetails?.company_linkdinlink.charAt(0).toUpperCase() + companydetails.company_linkdinlink.slice(1) || "--"}</span>
            </div>

          </div>
        </div>

        ): ( <></>)}

      </div>

) : (

  <>  <Skeleton count={5} className="card mb-5 mb-xl-10" /> </>
)}
      
    </>
  )
}
