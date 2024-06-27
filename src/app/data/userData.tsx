import useReduxSelector from "../hooks/useReduxSelector";

import { UserData, UserEmailVerificationData, SectorData, CompanyType, CompanyData, UserCompanyData } from "../types";

const UserDataComponent = () => {

    const {
        userRegisterData,
        userEmailVerificationData,
        companyDetailsData,
        sectorData,
        companyTypeData,
        userCompanyData,
        userInfo

    } = useReduxSelector();


    return {
        
        userRegisterAllData: userRegisterData.map((data: UserData) => ({
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        user_is_recruiter: data.user_is_recruiter
        })),

        usergetInfo: userInfo,


        UserEmailVerificationAllData: userEmailVerificationData.map((data: UserEmailVerificationData) => ({
            id: data.id,
            email: data.email,
        })),


        companyDetailsAllData: companyDetailsData.map((data: CompanyData) => ({
            company_info_id: data.company_info_id,
            company_name: data.company_name,
            company_location: data.company_location,
            company_description: data.company_description,
            company_estanlised_year: data.company_estanlised_year,
            contact_number: data.contact_number,
            company_email: data.company_email,
            company_zipcode: data.company_zipcode,
            company_address: data.company_address,
            company_googlelink: data.company_googlelink,
            company_linkdinlink: data.company_linkdinlink,
            company_category: data.company_category,
            company_team_member: data.company_team_member,
            company_county: data.company_county,
            company_city: data.company_city
        })),

        userCompanyAllData: userCompanyData.map((data: UserCompanyData) => ({
            user_id: data.user_id,
            company_info_id: data.company_info_id,
        })),

        sectorAllData: sectorData.map((data: SectorData) => ({
            sector_id: data.sector_id,
            sector_name: data.sector_name,
            sector_name_arabic: data.sector_name_arabic,
            sector_action: data.sector_action,
            sector_registration_date: data.sector_registration_date
        })),


        CompanyTypeAllData: companyTypeData.map((data: CompanyType) => ({
            company_type_id: data.company_type_id,
            company_type_name: data.company_type_name,
            company_type_name_arabic: data.company_type_name_arabic,
            company_type_action: data.company_type_action,
            company_type_registration_date: data.company_type_registration_date
        })),
        
    }

};

export default UserDataComponent;