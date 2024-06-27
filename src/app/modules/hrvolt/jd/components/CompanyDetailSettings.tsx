// import {FC} from 'react'
import React, {useState, useEffect} from 'react'

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select'
import axios from "axios";


import { Controller, useForm } from 'react-hook-form';

import useAuth from '../../../../../app/hooks/useAuth'

import { useDispatch, useSelector } from "react-redux";

import {CompanyDetails } from './CompanyDetailSettingModel'

// import { CompanyTypeGetBySearchAPI,  LocationGetBySearchAPI, SectorGetBySearchAPI } from '../../../../../app/api'

import { CompanyTypeGetBySearchAPI, SectorGetBySearchAPI, CompanyDetailsGetOneByUserAPI, LocationGetBySearchAPI} from '../../../../../app/api'


import { infiniteScrollApiCall, getUniqueRec } from '../../../../common/inifinitescroll'

import { setDropdownOptions, companyRegister } from '../../../../actions/userAction'

import GetYearOption from '../../../../../app/utils/GetYearOption';


interface OptionType {
  label: string;
  value: string;
}

interface RootState {
  userDetail: {
    options: {
      CompanyType: Array<{ label: string; value: string }>;
      CompanySector: Array<{ label: string; value: string }>;
      CompanyLocation: Array<{ label: string; value: string }>;
      


    };
  };
}

const limit = 10;


const emailValidation = (value: string) => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    return "Email address is required";
  } 
  
  if (!emailRegex.test(value)) {
    return "Invalid email address";
  }

};


const phoneValidation = (value: string) => {

  const phoneRegex = /^[0-9]{10}$/;

  if (!value) {
    return "Mobile number is required";
  }
  
  if (!phoneRegex.test(value)) {
    return "Invalid mobile number";
  }
};

const urlValidation = (value: string) => {

  const urlRegex = /^(ftp|http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;

  if (!value) {
    return "URL is required";
  } 
  
  if (!urlRegex.test(value)) {
    return "Invalid URL";
  } 

};


// const linkedinUrlValidation = (value) => {

//   const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[^\/?]+\/?$/;


//   if (!value) {
//     return "LinkedIn URL is required";
//   }
  
//   if (!linkedinRegex.test(value)) {
//     return "Invalid LinkedIn URL";
//   } 

// };


type CompanyData = {
  company_name: string;
  company_contact_no: string;
  company_twitter: string;
  company_facebook: string;
  company_linkedin: string;
  company_website: string;
  company_email: string;
  company_description: string;
  company_sector: {
      value: string;
      label: string;
  };
  company_type: {
      value: string;
      label: string;
  };
  establish_year: {
      value: string;
      label: string;
  };
  company_size: {
      value: string;
      label: string;
  };
  company_location: {
      value: string;
      label: string;
  };
};


import { useTranslation } from 'react-i18next';

interface CompanyDetailSettingsProps {
  onhandleCompanyUpdate: (companyUp: boolean) => void;
}

const CompanyDetailSettings: React.FC<CompanyDetailSettingsProps> = ({ onhandleCompanyUpdate }) => {

  const { t } = useTranslation(); 

  const dispatch = useDispatch();
  
  const { userDetail, initialUserDetail, authTokens  } = useAuth();


  const sel_options = useSelector((state: RootState) => state?.userDetail?.options);
  const [loading, setLoading] = useState(false)


  const [selectedCompanyType, setselectedCompanyType] = useState<Array<OptionType> | null>(null);
  const [selectedCompanySector, setselectedCompanySector] = useState<Array<OptionType> | null>(null);
  const [selectedCompanyLocation, setselectedCompanyLocation] = useState<Array<OptionType> | null>(null);
  const [selectedCompanySize, setselectedCompanySize] = useState({ value: "", label: "Select employees..." });
  const [selectedCompanyYear, setselectedCompanyYear] = useState({ value: "", label: "Select establish year..." });




  const [companyinfo, setCompanyInfo ] = useState("")



  const [currrentCompanyTypePage, setCurrrentCompanyTypePage ] = useState(1)
  const [totalcompanyTypePage, setTotalCompanyTypePage ] = useState()
  const [searchCompanyTypePage, setSearchCompanyTypePage ] = useState("")

  const [currrentCompanySectorPage, setCurrrentCompanySectorPage ] = useState(1)
  const [totalcompanySectorPage, setTotalCompanySectorPage ] = useState()
  const [searchCompanySectorPage, setSearchCompanySectorPage ] = useState("")

  const [currrentCompanyLocationPage, setCurrrentCompanyLocationPage ] = useState(1)
  const [totalcompanyLocationPage, setTotalCompanyLocationPage ] = useState()
  const [searchCompanyLocationPage, setSearchCompanyLocationPage ] = useState("")

  const GetEmployeesOption = [
    ({value : "1-20 employees", label : "1-20 Employees"}),
    ({value : "21-50 employees", label : "21-50 Employees"}),
    ({value : "51-100 employees", label : "51-100 Employees"}),
    ({value : "101-300 employees", label : "101-300 Employees"}),
    ({value : "More than 300 employees", label : "More than 300 Employees"})

  ]

  const defaultValues = {
    company_name: "",
    company_type: { value: "", label: "Select company type" },
    company_sector: { value: "", label: "Select company sector" },
    establish_year:{ value: "", label: "Select establish year" },
    company_size:{ value: "", label: "Select employees" },
    company_location:{ value: "", label: "Select company location" },
    company_contact_no: "",
    company_twitter: "",
    company_facebook: "",
    company_linkedin: "",
    company_website:"",
    company_email:"",
    company_description: ""


  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    mode: "all",
    defaultValues,
  });

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

          const jobSector = {
            value: response.data.Data.sector_id,
            label: response.data.Data.sector_name
          }

          const jobCompanyType = {
            value: response.data.Data.company_type_id,
            label: response.data.Data.company_type_name
          } 

          let establishYear = {
            value: "",
            label: ""
          };
          if (response.data.Data.company_established_year !== "") {
            establishYear = {
              value: response.data.Data.company_established_year,
              label: response.data.Data.company_established_year,
            };
          } else {

            establishYear = {
              value: "",
              label: "Select company establish year...",
            };
          }

       

          let teamMember = {
            value: "",
            label: ""
          };
          if (response.data.Data.company_team_member !== "") {
            teamMember = {
              value: response.data.Data.company_team_member,
              label: response.data.Data.company_team_member,
            };
          } else {
            teamMember = {
              value: "",
              label: "Select employees...",
            };
          }
          
          
          let Companylocation = {
            value: "",
            label: ""
          };

          if (response.data.Data.location_id !== "") {
            Companylocation = {
              value: response.data.Data.location_id,
              label: response.data.Data.location_name,
            };
          } else {
            Companylocation = {
              value: "",
              label: "Select company location...",
            };
          }
          

          setselectedCompanySector([jobSector]);
          setselectedCompanyType([jobCompanyType]);
          setselectedCompanyYear(establishYear);
          setselectedCompanySize(teamMember);

          setselectedCompanyLocation([Companylocation]);

          setCompanyInfo(response.data.Data.company_info_id);
           
           reset({
              company_name: response.data.Data.company_name,
              company_contact_no: response.data.Data.contact_number,
              company_twitter: response.data.Data.company_twitter_link,
              company_facebook: response.data.Data.company_facebook_link,
              company_linkedin: response.data.Data.company_linkdinlink,
              company_website:response.data.Data.company_googlelink,
              company_email:response.data.Data.company_email,
              company_description: response.data.Data.company_description,
              company_sector: jobSector,
              company_type: jobCompanyType,
              establish_year: establishYear,
              company_size:teamMember,
              company_location:Companylocation
            });

            onhandleCompanyUpdate(true);

           
            
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

    viewCompany();

  }, []);


     /* Company Type start */

     const companyTypeFun = async (search = "") =>  {

      try{
  
        const apiUrl = CompanyTypeGetBySearchAPI();
        const postData = {
          page: currrentCompanyTypePage,
          limit,
          q: search,
        };
  
        if (!totalcompanyTypePage || currrentCompanyTypePage <= totalcompanyTypePage) {
  
          const response = await infiniteScrollApiCall({
            apiEndpoint: apiUrl,
            payload: postData,
            label_key: "company_type_name",
            value_key: "company_type_id",
          });
  
          if (response) {
  
            setTotalCompanyTypePage(response?.TotalPages);
  
            dispatch(
              setDropdownOptions(
                getUniqueRec(sel_options?.CompanyType || [], response?.Data),
                "CompanyType"
              )
            );
  
          }
  
        }
  
            
      }
      catch (error) {
          console.error("Error fetching sectors:", error);
      }
    };
  
    useEffect(() => {
      companyTypeFun(searchCompanyTypePage);
    }, [currrentCompanyTypePage, searchCompanyTypePage]);
  
  
    const loadMoreComapnyTypeData = () => {
      setCurrrentCompanyTypePage((prev) => prev + 1);
    };
  
    const handleCompanyTypeeSearch = (searchCompanyTypePage = "", action = "") => {
  
  
      if (action === "input-change")
        dispatch(setDropdownOptions([], "CompanyType"));
        setSearchCompanyTypePage(searchCompanyTypePage);
        setCurrrentCompanyTypePage(1);
    };
  
    /* Company Type  end */


   /* Company Sector start */

    const companySectorFun = async (search = "") =>  {

      try{
  
        const apiUrl = SectorGetBySearchAPI();
        const postData = {
          page: currrentCompanySectorPage,
          limit,
          q: search,
        };
  
        if (!totalcompanySectorPage || currrentCompanySectorPage <= totalcompanySectorPage) {
  
          const response = await infiniteScrollApiCall({
            apiEndpoint: apiUrl,
            payload: postData,
            label_key: "sector_name",
            value_key: "sector_id",
          });
  
          if (response) {
  
            setTotalCompanySectorPage(response?.TotalPages);
  
            dispatch(
              setDropdownOptions(
                getUniqueRec(sel_options?.CompanySector || [], response?.Data),
                "CompanySector"
              )
            );
  
          }
  
        }
  
            
      }
      catch (error) {
          console.error("Error fetching sectors:", error);
      }
    };
  
    useEffect(() => {
      companySectorFun(searchCompanySectorPage);
    }, [currrentCompanySectorPage, searchCompanySectorPage]);
  
  
    const loadMoreComapnySectorData = () => {
      setCurrrentCompanySectorPage((prev) => prev + 1);
    };
  
    const handleCompanySectorSearch = (searchCompanySectorPage = "", action = "") => {
  
  
      if (action === "input-change")
        dispatch(setDropdownOptions([], "CompanySector"));
        setSearchCompanySectorPage(searchCompanySectorPage);
        setCurrrentCompanySectorPage(1);
    };
  
    /* Company Sector  end */
  

     /* Company Type start */

    const companyLocationFun = async (search = "") =>  {

      try{
  
        const apiUrl = LocationGetBySearchAPI();
        const postData = {
          page: currrentCompanyLocationPage,
          limit,
          q: search,
        };
  
        if (!totalcompanyLocationPage || currrentCompanyLocationPage <= totalcompanyLocationPage) {
  
          const response = await infiniteScrollApiCall({
            apiEndpoint: apiUrl,
            payload: postData,
            label_key: "location_name",
            value_key: "location_id",
          });
  
          if (response) {
  
            setTotalCompanyLocationPage(response?.TotalPages);
  
            dispatch(
              setDropdownOptions(
                getUniqueRec(sel_options?.CompanyLocation || [], response?.Data),
                "CompanyLocation"
              )
            );
  
          }
  
        }
  
            
      }
      catch (error) {
          console.error("Error fetching sectors:", error);
      }
    };
  
    useEffect(() => {
      companyLocationFun(searchCompanyLocationPage);
    }, [currrentCompanyLocationPage, searchCompanyLocationPage]);
  
  
    const loadMoreCompanyLocationData = () => {
      setCurrrentCompanyLocationPage((prev) => prev + 1);
    };
  
    const handleCompanyLocationeSearch = (searchCompanyLocationPage = "", action = "") => {
  
  
      if (action === "input-change")
        dispatch(setDropdownOptions([], "CompanyType"));
        setSearchCompanyLocationPage(searchCompanyLocationPage);
        setCurrrentCompanyLocationPage(1);
    };
  
    /* Company Type  end */

  const handleCompanyRegister = async (data : CompanyDetails) => {

    

    try{

      onhandleCompanyUpdate(true);
      setLoading(true);

      if(userDetail && initialUserDetail && authTokens){

        const inpData = {

          "user_id": userDetail.id || initialUserDetail.id,
          "company_info_id": companyinfo,
          "company_name": data.company_name, 
          "company_type_id": data.company_type.value,
          "location_id": data.company_location.value,
          "sector_id": data.company_sector.value,
          "company_description": data.company_description,
          "company_established_year":data.establish_year.value,
          "contact_number":data.company_contact_no,
          "company_email":data.company_email,
          "company_googlelink":data.company_website,
          "company_linkdinlink":data.company_linkedin,
          "company_team_member":data.company_size.value,
          "company_twitter_link":data.company_twitter,
          "company_facebook_link":data.company_facebook,
          "company_action":"active"

        }

        const companyReg = await dispatch(
          companyRegister(
            inpData
          )
        );

        if("company_info_id" in companyReg){

          toast.success('Company details are successfully updated.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });

        }else{

          toast.error('Something wrong while updating company details.', {
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

      }

    }catch {
      console.log("Error")
    } finally {

      setLoading(false);
      onhandleCompanyUpdate(false);

      // console.log("Somathing ")

    }

    

  };


  return (
    <>
    
    <div className='card mb-5 mb-xl-10'>
      
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{t('translation:company_information')}</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>

        <form onSubmit={handleSubmit((data) => handleCompanyRegister(data as CompanyData))} noValidate className='form'>
          

          <div className='card-body border-top p-9'>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:company_name')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <input
                    {...register("company_name", {
                      required: "Job Title is Required"
                    })}
                    name="company_name"
                    type="text"
                    placeholder="Enter company name"
                    id="company_name"
                    className = "form-control"
                    required
                  />

                    {errors.company_name && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_name.message}</div>
                    </div>
                    )}
                   
                  </div>

                 
                </div>
              </div>
              
            </div>

            <div className='row mb-6'>

              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:company_sector')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                      <Controller
                          name="company_sector"
                          rules={{ required: "Company Sector is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                            {...field}

                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}

                              onChange={(selectedOption) => {
                                if (selectedOption) {
                                  setselectedCompanySector([selectedOption]);
                                  setValue("company_sector", selectedOption);
                                } else {
                                  setselectedCompanySector(null);
                                }
                              }}
                              
                              value={selectedCompanySector}
                              options={sel_options?.CompanySector}
                              isClearable
                              isSearchable
                              placeholder="Select Company Sector..."
                              onMenuScrollToBottom={() => loadMoreComapnySectorData()}
                              onInputChange={(value, { action }) => handleCompanySectorSearch(value, action)}
                              
                            />
                          )}
                        />

                      {errors.company_sector && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.company_sector.message}</div>
                      </div>
                      )}

                  
                  </div>

                
                </div>
              </div>

            </div>
            
            <div className='row mb-6'>

              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:company_type')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                      <Controller
                          name="company_type"
                          rules={{ required: "Company Type is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}

                              onChange={(selectedOption) => {
                                if (selectedOption) {
                                  setselectedCompanyType([selectedOption]);
                                  setValue("company_type", selectedOption);
                                } else {
                                  setselectedCompanyType(null);
                                }
                              }}
                              
                              value={selectedCompanyType}
                              options={sel_options?.CompanyType}
                              isClearable
                              isSearchable
                              placeholder="Select Employment Type..."
                              onMenuScrollToBottom={() => loadMoreComapnyTypeData()}
                              onInputChange={(value, { action }) => handleCompanyTypeeSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.company_type && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.company_type.message}</div>
                      </div>
                      )}

                  
                  </div>

                
                </div>
              </div>

            </div>

            <div className='row mb-6'>

              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:establish_year')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <Controller
                    name="establish_year"
                    rules={{ 
                      required: "Establish year is required",
                     }}
                    control={control}
                    render={({ field }) => (
                    <Select
                    {...field}

                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        setselectedCompanyYear(selectedOption);
                        setValue("establish_year", selectedOption);
                      }
                    }}
                    value={selectedCompanyYear}
                    options={GetYearOption(100)}
                    placeholder="Select establish year..."
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: "calc(var(--size-100) + .15rem)",
                        background: "var(--clr-formInput)",
                        borderRadius: "var(--size-200)",
                        borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                      }),
                    }}
                      
                    />
                  )}
                />
                 {errors.establish_year && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.establish_year.message}</div>
                    </div>
                    )}

                  
                  </div>

                
                </div>
              </div>

            </div>

            <div className='row mb-6'>

            <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:company_desc')}</label>

              <div className='col-lg-8'>
             
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <textarea
                    className='form-control form-control-solid mb-8'
                    rows={3}
                    placeholder='Enter something about your company...'
                    {...register("company_description")}
                  ></textarea>
                  
                  </div>

                </div>
              
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:email')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <input
                    {...register("company_email", {
                      required: "Email address is Required",
                      validate: emailValidation,
                    })}
                    name="company_email"
                    type="email"
                    placeholder="Enter email address..."
                    id="company_email"
                    className = "form-control"
                    required
                  />

                    {errors.company_email && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_email.message}</div>
                    </div>
                    )}
                   
                  </div>

                 
                </div>
              </div>
              
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:contact_no')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <input
                    {...register("company_contact_no", {
                      required: "Contact No is Required",
                      validate: phoneValidation,
                    })}
                    name="company_contact_no"
                    type="text"
                    placeholder="Enter contact no..."
                    id="company_contact_no"
                    className = "form-control"
                    required
                  />

                    {errors.company_contact_no && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_contact_no.message}</div>
                    </div>
                    )}
                   
                  </div>

                 
                </div>
              </div>
              
            </div>

            <div className='row mb-6'>

              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:company_size')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <Controller
                    name="company_size"
                    rules={{ required: "Company size is required" }}
                    control={control}
                    render={({ field }) => (
                    <Select
                    {...field}

                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        setselectedCompanySize(selectedOption);
                        setValue("company_size", selectedOption);
                      }
                    }}

                    value={selectedCompanySize}
                    options={GetEmployeesOption}
                    placeholder="Select Employees..."
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: "calc(var(--size-100) + .15rem)",
                        background: "var(--clr-formInput)",
                        borderRadius: "var(--size-200)",
                        borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                      }),
                    }}
                      
                    />
                  )}
                />
                 {errors.company_size && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_size.message}</div>
                    </div>
                    )}

                  
                  </div>

                
                </div>
              </div>

            </div>

            <div className='row mb-6'>

              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:company_location')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                      <Controller
                          name="company_location"
                          rules={{ required: "Company Location is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}

                              onChange={(selectedOption) => {
                                if (selectedOption) {
                                  setselectedCompanyLocation([selectedOption]);
                                  setValue("company_location", selectedOption);
                                } else {
                                  setselectedCompanyLocation(null);
                                }
                              }}
                              
                              value={selectedCompanyLocation}
                              options={sel_options?.CompanyLocation}
                              isClearable
                              isSearchable
                              placeholder="Select Company Location..."
                              onMenuScrollToBottom={() => loadMoreCompanyLocationData()}
                              onInputChange={(value, { action }) => handleCompanyLocationeSearch(value, action)}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  padding: "calc(var(--size-100) + .15rem)",
                                  background: "var(--clr-formInput)",
                                  borderRadius: "var(--size-200)",
                                  borderColor: state.isFocused ? "var(--clr-accent-400)" : "transparent",
                                }),
                              }}
                            />
                          )}
                        />

                      {errors.company_location && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.company_location.message}</div>
                      </div>
                      )}

                  
                  </div>

                
                </div>
              </div>

            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:google')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <input
                    {...register("company_website", {
                      required: "Website is Required",
                      validate: urlValidation
                    })}
                    name="company_website"
                    type="text"
                    placeholder="E.g. https://www.broaderai.com"
                    id="company_website"
                    className = "form-control"
                    required
                  />

                    {errors.company_website && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_website.message}</div>
                    </div>
                    )}
                   
                  </div>

                 
                </div>
              </div>
              
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{t('translation:linkedin')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <input
                    {...register("company_linkedin", {
                      required: "Linkedin is Required",
                      validate: urlValidation
                    })}
                    name="company_linkedin"
                    type="text"
                    placeholder="E.g. https://www.linkedin.com"
                    id="company_linkedin"
                    className = "form-control"
                    required
                  />

                    {errors.company_linkedin && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_linkedin.message}</div>
                    </div>
                    )}
                   
                  </div>

                 
                </div>
              </div>
              
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label  fw-bold fs-6'>{t('translation:twitter')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <input
                    {...register("company_twitter")}
                    name="company_twitter"
                    type="text"
                    placeholder="Enter twitter..."
                    id="company_twitter"
                    className = "form-control"
                    required
                  />

                    {errors.company_twitter && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_twitter.message}</div>
                    </div>
                    )}
                   
                  </div>

                 
                </div>
              </div>
              
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>{t('translation:facebook')}</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>

                  <input
                    {...register("company_facebook")}
                    name="company_facebook"
                    type="text"
                    placeholder="Enter facebook..."
                    id="company_facebook"
                    className = "form-control"
                    required
                  />

                    {errors.company_facebook && (
                      <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{errors.company_facebook.message}</div>
                    </div>
                    )}
                   
                  </div>

                 
                </div>
              </div>
              
            </div>

          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && t('translation:subbtn')}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {t('translation:please_wait')}{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>

    
    </>
    
    
  )
}

export {CompanyDetailSettings}
