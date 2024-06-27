import React, { createContext, useState, useEffect, ReactNode } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import {
    TokenBaseFetchApi,
    loginUserAPI,
    logoutUserAPI,
    loggedinUserAPI,
    FetchAPI,
    generateTokenAPI,
    refreshTokenAPI
   } from "../api"


import {
    getUserDetails,
    clearDetails
  } from "../actions/userAction";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  
  interface UserDetail {
    email: string;
    password: string;
    user_id: string;
    user_is_loggedin: boolean;
  }

  interface UserDetailLogin {
    email: string;
    password: string;
  }


  interface DecodedToken {
    user_id: string;
  }
  

  interface UserLogin {
    username : string;
    password : string
  }
  
  interface AuthContextType {
    authTokens: { access: string; refresh: string } | null;
    user: DecodedToken | null; 
    isLoggedIn: boolean;
    isRecruiter: boolean;
    userDetail: { id: string; email: string } | null; 
    loginUser: (data: UserDetailLogin ) => void;
    logoutUser: () => void;
    loggedinUser: (data: UserDetail) => void;
    initialUserDetail: { id: string; email: string } | null; 
    loginerrormessage: string
  }

  interface AuthProviderProps {
    children: ReactNode;
  }

  
const AuthContext = createContext<AuthContextType>({
    authTokens: null,
    user: null,
    isLoggedIn: false,
    isRecruiter: false,
    userDetail: null,
    loginUser: () => {},
    logoutUser: () => {},
    loggedinUser: () => {},
    initialUserDetail: null,
    loginerrormessage: ""
  });

  AuthContext.displayName = "userContext";

  export default AuthContext;


export const AuthProvider = ({ children }: AuthProviderProps) => {

    const dispatch = useDispatch();

    const initLoggedIn = localStorage.getItem("authTokens") !== null ? true : false;

  
      const initialToken = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!) as string
      : null;
    
  
    const initialUser = localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens")!) as DecodedToken
      : null;

    const authTokensV = localStorage.getItem("authTokens");
       
    const initialUserDetail = authTokensV && typeof authTokensV === 'string'
      ? {
          id: (jwtDecode(authTokensV) as DecodedToken).user_id,
          email: (jwtDecode(authTokensV) as DecodedToken).user_id.split("_")[1].concat("@gmail.com"),
          }
      : null;    
      

    // TODO: states

    const [isLoggedIn, setIsLoggedIn] = useState(() => initLoggedIn);
    const [loginerrormessage, setLoginerrorMessage] = useState("");

    
    const [isRecruiter, setIsRecruiter] = useState(() => {
      return localStorage.getItem("authTokens") !== null ? true : false;
    });

    const [authTokens, setAuthTokens] = useState(() => initialToken);
    const [user, setUser] = useState(() => initialUser);
    const [userDetail, setUserDetail] = useState(() => initialUserDetail);
    const [initialLoad, setInitialLoad] = useState(true);
  

  
    // TODO: functions
    const getUserData = (userID : string, token : string) => {

      dispatch(getUserDetails({ id: userID }, token));

    };

    // TODO GeneratingToken and saving to backend
    const generateToken = async (e : UserLogin) => {

        const { data } = await FetchAPI(generateTokenAPI(), "POST", e);    
        if (data) {
          console.log("fffff",data)
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
        } else {
          console.log("Something Wrong! while calling Token Apis");
        }

        return data;
      };
  
    const loggedinUser = async (DATA: UserDetail) => {
      
      const tokenJson = {
        username: DATA.email.split("@")[0].toLowerCase(),
        password: DATA.password,
      };

      const generated_token = await generateToken(tokenJson);
  
      if (generated_token) {
        console.log("9999999999999999999999999999999999999")
        setAuthTokens(generated_token);
        setUser(jwt_decode(generated_token.access));
      } else {
        console.log("msg");
        return;
      }
  
    
      const { data } = await TokenBaseFetchApi(
        loggedinUserAPI(),
        "PATCH",
        {
          user_id: DATA.user_id,
          user_is_loggedin: DATA.user_is_loggedin
        },
        generated_token.access
      );
  
       if (data.Message == "User loggedIn is updated") {

        console.log("msg");
        console.log("888888888888888888888")
        setAuthTokens(generated_token);
        setUser(jwt_decode(generated_token.access));  
  
        setUserDetail(() => (data.Data ? data.Data : data));
        setIsLoggedIn(true);
        setIsRecruiter(data.Data.user_is_recruiter);

        localStorage.setItem("authTokens", JSON.stringify(generated_token));
        console.log("msg");

        
        const authTokensString: string | null = localStorage.getItem("authTokens");

        if (authTokensString !== null) {
        const decodedToken: DecodedToken = jwtDecode(generated_token.access);
        const localID = decodedToken.user_id;

        getUserData(localID, generated_token.access);
        

        } else {
        console.error("authTokens not found in localStorage");
        }

  
      } 
  
    }
  
  
    //TODO loginUser
    const loginUser = async (DATA : UserDetailLogin) => {
      
        const tokenJson = {
            username: DATA.email.split("@")[0].toLowerCase(),
            password: DATA.password,
        };
    
        const generated_token = await generateToken(tokenJson);
    
        if (generated_token) {
          console.log("generated_token",generated_token)
            // setAuthTokens(generated_token);
            setUser(jwt_decode(generated_token.access));
        } else {
            console.log("msg");
            return;
        }
    
    
        const { data } = await TokenBaseFetchApi(
            loginUserAPI(),
            "POST",
            DATA,
            generated_token.access
        );

        if (
            data.message === "You are successfully login"
        ) {
            const storedAuthTokens = localStorage.getItem("authTokens");

            setAuthTokens(storedAuthTokens);
            setUser(jwt_decode(generated_token.access));
            setUserDetail(() => (data.Data ? data.Data : data));
            setIsLoggedIn(true);


            if(data.user_is_recruiter != undefined){

              setIsRecruiter(data["user_is_recruiter"][0]);

            }else {

              if(data.Data.user_is_recruiter){
                setIsRecruiter(true);
              }else{
                setIsRecruiter(false);
              }
            
            }

            localStorage.setItem("authTokens", JSON.stringify(generated_token));
        
            const authTokenString : string | null = localStorage.getItem("authTokens");


            if (authTokenString) {

                const accessToken = authTokenString ? JSON.parse(authTokenString) : {};
                const decodedToken:DecodedToken = jwtDecode(accessToken.access);

                if (decodedToken && decodedToken.user_id) {

                const localID = decodedToken.user_id;
                const storedAuthTokens = localStorage.getItem("authTokens");

                setAuthTokens(storedAuthTokens);
                setUser(jwt_decode(generated_token.access));
                setUserDetail(() => (data.Data ? data.Data : data));

                setIsLoggedIn(true)
                // setIsRecruiter(data.Data.user_is_recruiter)
                
                localStorage.setItem("authTokens", JSON.stringify(generated_token));
            
                getUserData(localID, generated_token.access);
            
                
                } else {
                console.log("msg");
                }
                
            } else {
                console.log("msg");
            }

        }

        else if(data.message === "Already logged in" || data["errorMsg"][0] === "Already logged in" ){
          // setLoginerrorMessage("You are already loggedin in other device. Kindly logout from that device. ")
          toast.error('You are already loggedin in other device. Kindly logout from that device.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        else{

          setIsLoggedIn(false);
          setIsRecruiter(false);

        }

        return data
        

    }

    const logoutUser = async () => {

      const getAccess = localStorage.getItem("authTokens");
      const accessToken = getAccess ? JSON.parse(getAccess) : {};
  

      const logoutJSON = {
        id: userDetail ?.id,
      };

      await TokenBaseFetchApi(
        logoutUserAPI(),
        "PATCH",
        logoutJSON,
        accessToken.access
      );

      dispatch(clearDetails());

      setAuthTokens(null);
      setUser(null);
      setUserDetail(null);
      setIsLoggedIn(false);
      setIsRecruiter(false);
      localStorage.removeItem("authTokens");
      console.log("msg");

    };
    
  
    // TODO UpdateToken
    const updateToken = async () => {

        const storeRefresh = localStorage.getItem("authTokens");
        const newLocalObjectR = storeRefresh ? JSON.parse(storeRefresh) : {};
        

        const refreshJSON = {
            refresh: newLocalObjectR.refresh ,
        };
        

      const { data } = await FetchAPI(refreshTokenAPI(), "POST", refreshJSON);

      
      if (data?.access) {

        // setAuthTokens((prev) => {
        //   return { ...prev, access: data.access };
        // });
  
        // setAuthTokens(data);

        setUser(jwt_decode(data.access));
  
        const storedAuthTokens = localStorage.getItem("authTokens");
        setAuthTokens(storedAuthTokens)

        const newLocalObject = storedAuthTokens ? JSON.parse(storedAuthTokens) : {};
        newLocalObject.access = data.access;

        localStorage.setItem("authTokens", JSON.stringify(newLocalObject));
  
        return data.access;

      } else {

        console.log("Access token is not valid")
      }

    };
  
 
    // TODO: DATA that will be passed to all the app components
  
    const contextData = {
      authTokens:
        authTokens && typeof authTokens === 'string'
        ? {
            access: JSON.parse(authTokens).access,
            refresh: JSON.parse(authTokens).refresh,
            }
      : null,
      user,
      isLoggedIn,
      userDetail,
      loginUser,
      loggedinUser,
      logoutUser,
      initialUserDetail,
      isRecruiter,
      loginerrormessage
    };

  
    useEffect(() => {
      
      let intervalID :  number | undefined = undefined;

        initialLoad && authTokens
      
        ? (async () => {
        
            const newAccessToken = await updateToken();
          
            if (userDetail) {
                getUserData(userDetail.id, newAccessToken);
              }
  
            setInitialLoad(false);
          })()
        : setInitialLoad(false),

        (intervalID = setInterval(() => {
          if (authTokens) {
            updateToken();
            console.log("Token Updated");
          }
        }, 1000 * 60 * 5));

      return () => clearInterval(intervalID);
    }, [authTokens, initialLoad]);
  
  
    return (
      <AuthContext.Provider value={contextData}>
        {initialLoad ? null : children}
      </AuthContext.Provider>
    );

};
  
