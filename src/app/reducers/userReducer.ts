interface UserAction {
    type: string;
    payload?: object;
    key?: string;
}

const initState = {
  details: {},
  userRegister : { isUserRegisterUpdating: false, data: [] },
  userEmailVerification : { isUserEmailVerificationUpdating: false, data: [] },
  companyDetails : { isCompanyUpdating: false, data: [] },
  companyUserDetails : { isCompanyUserRegisterUpdating: false, data: [] },
  options : {}
  
}

const userReducer = (state = initState, action: UserAction) => {

    switch (action.type) {

        case "CL_DETAIL":
        return { ...initState };
        
        case "ADDED_MAIN_USER":
        return {
            ...state,
            userRegister: {
            ...state.userRegister,
            isUserRegisterUpdating: false,
            },
        };

        case "GET_USER_DETAIL":
        return {
            ...state,
            details: action.payload,
            isLoading: false,
            isUserUpdating: false,
        };


        case "ADDED_USER_VERIFICATION":
        return {
            ...state,
            userEmailVerification: {
            ...state.userEmailVerification,
            isUserEmailVerificationUpdating: false,
            },
        };


        case "ADDED_COMPANY":
        return {
            ...state,
            companyDetails: {
            ...state.companyDetails,
            isCompanyRegisterUpdating: false,
            },
        };


        case "ADDED_USER_COMPANY":
        return {
            ...state,
            companyUserDetails: {
            ...state.companyUserDetails,
            isCompanyUserRegisterUpdating: false,
            },
        };




        case "GET_SECTOR":
        return {
            ...state,
            sector: action.payload,
            isLoading: false,
            isSectorUpdating: false,
        };


        case "GET_COMPANY_TYPE":
            return {
                ...state,
                company_type: action.payload,
                isLoading: false,
                isCompanyUpdating: false,
            };

        case "GET_JOBLEVEL":
            return {
                ...state,
                joblevel: action.payload,
                isLoading: false,
                isUserUpdating: false,
            };

        case "GET_JOBPOSITION":
            return {
                ...state,
                jobposition: action.payload,
                isLoading: false,
                isPositionUpdating: false,
            };

        
        case "GET_NATIONALITY":
            return {
                ...state,
                nationality: action.payload,
                isLoading: false,
                isNationUpdating: false,
            };

        
        case "UPDATING_JOB_REGISTER":
            return {
                ...state,
                nationality: action.payload,
                isLoading: false,
                isNationUpdating: false,
            };
              
            
        case "SET_OPTIONS":
            if (action.key) {
                return {
                    ...state,
                    options: { ...(state?.options || {}), [action.key]: action.payload },
                };
            } else {
                return state
            }

        default:
          return state;
    }

};


export default userReducer;