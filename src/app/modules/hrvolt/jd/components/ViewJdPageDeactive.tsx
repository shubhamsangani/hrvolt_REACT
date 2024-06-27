import React, {useState, useEffect} from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'

import useAuth from '../../../../../app/hooks/useAuth'
import axios from "axios";

// import {Link} from 'react-router-dom'

import {
  jobDescriptionGetUserAPI,
  jobDescriptionDeleteAPI
 } from '../../../../../app/api'

// import LoaderPage from '../../../../../_metronic/helpers/LoaderPage';

import {Link} from 'react-router-dom'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
  className: string
}


type jobDescription = {
  job_tilte : string
  job_position_name: string
  job_level_name: string
  number_of_vacancy: string
  job_description_id: string
}
const ViewJdPageDeactive: React.FC<Props> = ({className}) => {

  const [loading, setLoading] = useState(false);

  const [activePosts, setActivePosts] = useState([]);

  const [ActivePostsloading, setActivePostsLoading] = useState(false);

  
  const { userDetail, initialUserDetail, authTokens  } = useAuth();

  const viewJobs = async () => {

    if (userDetail && initialUserDetail && authTokens) {

    const inpData = {
      "user_id": userDetail.id || initialUserDetail.id,
      "job_description_action": "deactive",
    };
  

    const apiUrl = jobDescriptionGetUserAPI();

    const headers = {
      Authorization: `Bearer ${authTokens.access}`,
    };

  

    try {
      const response = await axios.post(apiUrl, inpData, { headers });

      if (response.data && response.data.Data) {
        
         console.log(response.data.Data);
         setActivePosts(response.data.Data);
         setActivePostsLoading(true);
      } else {
        console.log("No data received from the API");
      }
    } catch (error) {
      console.log("API request error:", error);
    } finally {
      setLoading(false);
    }

    }
  };

  useEffect(() => {

    setLoading(true);
    console.log(loading);
    console.log(ActivePostsloading);

    
    try {

      if (userDetail && initialUserDetail && authTokens) {

        viewJobs();
      }

    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }

  }, []);

  const handleTrashClick = (jobDescriptionId: string) => {

    console.log("Clicked on Trash button for job_description_id:", jobDescriptionId);

    try {

      if (userDetail && initialUserDetail && authTokens) {

        const deleteJobs = async () => {
          const inpData = {
            "user_id": userDetail.id || initialUserDetail.id,
            "job_description_id": jobDescriptionId,
          };

          console.log(inpData)
  
          const apiUrl = jobDescriptionDeleteAPI();
  
          const headers = {
            Authorization: `Bearer ${authTokens.access}`,
          };
  
          try {
            const response = await axios.delete(apiUrl, { data: inpData, headers } );

            console.log(response);
  
            if (response.status == 201) {
              
               console.log(response.data.Data);
               viewJobs();

            } else {
              console.log("No data received from the API");
            }
          } catch (error) {
            console.log("API request error:", error);
          } finally {
            setLoading(false);
          }
        };
  
        deleteJobs();
      }

    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }


  };


  return (
    (!loading  ? (

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
                <th className='min-w-200px'>Vacancies</th>

                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
            {activePosts.map((post : jobDescription, index) => (
              <tr key= {index}>
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
                         {post.job_tilte}
                      </a>
                      {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        Python, Django,Flask, HTML, CSS
                      </span> */}
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                  {post.job_position_name}
                  </a>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                  {post.job_level_name}
                  </a>
                </td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                  {post.number_of_vacancy}
                  </a>
                </td>

                
                <td className='text-end'>
                  <Link to={`/hrvolt/jd/job-post-details/job-post-details/${post.job_description_id}`} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                    <KTIcon iconName='switch' className='fs-3' />
                  </Link>
                  {/* <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTIcon iconName='pencil' className='fs-3' />
                  </a> */}
                  <a href='' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm' onClick={() => handleTrashClick(post.job_description_id)}>
                    <KTIcon iconName='trash' className='fs-3' />
                  </a>
                </td>
              </tr>
             ))}
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

    ) : <> <Skeleton count={5} className={`card ${className}`} /> </>)

  )
}

export {ViewJdPageDeactive} 