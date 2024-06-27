/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

// import React, {useState, useEffect} from 'react'
// import axios from "axios";
// import { viewUserProfileAPI } from '../../app/api'

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage} from '../modules/auth'
import {App} from '../App'

import useAuth from "../hooks/useAuth";




const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {

  const {isLoggedIn, isRecruiter} = useAuth()

// const {userDetail, initialUserDetail, authTokens, isLoggedIn, isRecruiter} = useAuth()
// const [loading, setLoading] = useState(false);
// const [userloggedin, setUserLoggedin] = useState(false);
// const [userRecruiter, setUserRecruiter] = useState(false);


// const viewCandidate = async () => {

//   if (userDetail && initialUserDetail && authTokens) {

//   const inpData = {
//     "id": userDetail.id || initialUserDetail.id,
//   };


//   const apiUrl = viewUserProfileAPI();

//   const headers = {
//     Authorization: `Bearer ${authTokens.access}`,
//   };



//   try {
//     const response = await axios.post(apiUrl, inpData, { headers });

//     if (response.data && response.data.userDetails) {
      
//         setUserLoggedin(response.data.userDetails.user_is_loggedin);
//         setUserRecruiter(response.data.userDetails.user_is_recruiter);

//     } else {
//       console.log("No data received from the API");
//     }
//   } catch (error) {
//     console.log("API request error:", error);
//   } finally {
//     setLoading(false);
//   }

//   }

//   else {

//     console.log(isLoggedIn, isRecruiter, "uaaaaaa");

//     setUserLoggedin(false);
//     setUserRecruiter(false);

//   }
// };


// useEffect(() => {

//   setLoading(true);

  
//   try {

//     if (userDetail && initialUserDetail && authTokens) {

//       viewCandidate();
//     }

//   } catch (error) {
//     console.log("Error: ", error);
//   } finally {
//     setLoading(false);
//   }

// }, []);

  

  return (
    <BrowserRouter basename={BASE_URL}>

      <Routes>

        <Route element={<App />}>

          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />

          {isLoggedIn  && isRecruiter  ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='/*' element={<AuthPage />} />
              {/* <Route path='*' element={<Navigate to='/' />} /> */}

            </>
          )}
          
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  )

}

export {AppRoutes}
