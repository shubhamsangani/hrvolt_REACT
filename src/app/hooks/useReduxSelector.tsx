import { useSelector } from "react-redux";
import { UserData, UserEmailVerificationData, CompanyData, SectorData, CompanyType, UserCompanyData, CompanyDetailRegister } from "../types";


interface RootState {
    userDetail: {
        userRegisterData: {
            data: UserData[]
        };
        userEmailVerificationData: {
            data: UserEmailVerificationData[]
        };
        companyDetailsData: {
            data: CompanyData[]
        };
        userCompanyData: {
            data: UserCompanyData[]
        };
        details: {
            data: {
                userDetails:  UserData[]
            }
        };
        company: CompanyDetailRegister,
        sector : SectorData[],
        company_type : CompanyType[],



        isUserRegisterUpdating: boolean;
        isUserEmailVerificationUpdating: boolean;
        isCompanyRegisterUpdating: boolean;
        isCompanyUserRegisterUpdating: boolean;

    };
}

const useReduxSelector = () => {

    const userRegisterData = useSelector(
        (state: RootState) => state.userDetail.userRegisterData.data
    );

    const userInfo = useSelector((state: RootState) => state.userDetail.details);


    const isUserRegisterUpdating = useSelector(
        (state: RootState) => state.userDetail.isUserRegisterUpdating
    );


    const userEmailVerificationData = useSelector(
        (state: RootState) => state.userDetail.userEmailVerificationData.data
    );

    const isUserEmailVerificationUpdating = useSelector(
        (state: RootState) => state.userDetail.isUserEmailVerificationUpdating
    );


    const companyDetailsData = useSelector(
        (state: RootState) => state.userDetail.companyDetailsData.data
    );

    const isCompanyRegisterUpdating = useSelector(
        (state: RootState) => state.userDetail.isCompanyRegisterUpdating
    );

    const userCompanyData = useSelector(
        (state: RootState) => state.userDetail.userCompanyData.data
    );

    const isCompanyUserRegisterUpdating = useSelector(
        (state: RootState) => state.userDetail.isCompanyUserRegisterUpdating
    );

    const sectorData = useSelector(
        (state: RootState) => state.userDetail.sector
    );

    
    const companyTypeData = useSelector(
        (state: RootState) => state.userDetail.company_type
    );
    
    return {

        userRegisterData,
        userInfo,
        isUserRegisterUpdating,
        
        userEmailVerificationData,
        isUserEmailVerificationUpdating,

        companyDetailsData,
        isCompanyRegisterUpdating,

        userCompanyData,
        isCompanyUserRegisterUpdating,
        
        sectorData,
        companyTypeData

    }
}

export default useReduxSelector;
