import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'

import { Link, useLocation, useNavigate} from "react-router-dom";
import { SectorData, CompanyType } from "../../../types"

import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
// import {useAuth} from '../core/Auth'


import { sectorDatabaseCall, companyTypeDatabaseCall, companyRegisterCall } from '../../../actions/userAction'
import { useDispatch } from "react-redux";



const initialValues = {
    companyname: '',
    companytype: '', // Add initial value for companytype
    companydomain: '', // Add initial value for companydomain
  }

const companyRegistrationSchema = Yup.object().shape({
    companyname: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Company name is required'),
    companytype: Yup.string()
        .required('Company type is required'),
    companydomain: Yup.string()
        .required('Company domain is required'),
})

export function CompanyBasicInfo() {

  const [loading, setLoading] = useState(false)

  const [sector, setSector] = useState<SectorData[]>([])
  const [sectorLoading, setSectorLoading] = useState(false)


  const [companytype, SetCompanyType] = useState<CompanyType[]>([])
  const [companyTypeLoading, setcompanyTypeLoading] = useState(false)

  const { state } = useLocation();

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  // const {saveAuth, setCurrentUser} = useAuth()

  useEffect(() => {
    
  const loadFun = async () => {

    try{

        const response = await dispatch( 
            sectorDatabaseCall()  
        ); 
        
        if ( "Data" in response){
            setSector(response["Data"] as SectorData[] || []);
            setSectorLoading(true)
        }


        const responseCompany = await dispatch( 
            companyTypeDatabaseCall()  
        ); 
        
        if ( "Data" in responseCompany){
            SetCompanyType(responseCompany["Data"] as CompanyType[] || []);
            setcompanyTypeLoading(true)
        }
        
            
    } catch (error) {
        console.error("Error fetching sectors:", error);
      }

    };
      
    loadFun();
    }, []);


  const formik = useFormik({
    initialValues,
    validationSchema: companyRegistrationSchema,

    onSubmit: async (values, {setStatus, setSubmitting}) => {

      setLoading(true)

      const inpData = {
        "user_id": state,
        "company_name": values.companyname, 
        "company_type_id": values.companydomain,
        "sector_id": values.companytype,
        "company_description":"",
        "company_established_year":"",
        "contact_number":"",
        "company_email":"",
        "company_googlelink":"",
        "company_linkdinlink":"",
        "company_team_member":"",
        "company_twitter_link":"",
        "company_facebook_link":"",
        "company_action":"activate"

    }

    const res = await dispatch(
        companyRegisterCall(inpData)
    );

    if('errorMsg' in res){

        setStatus(res['errorMsg'])

      }else{

       if('user_company_id' in res && !loading){

        navigate("/", {
            replace: true,
            state: state
        });

        }else{

            setStatus("Something goes wrong during email verification !!") 

        }
      }

      setLoading(true)
      setSubmitting(false)
      setStatus("Okay")

    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  
  return (
    <>
    {sectorLoading && companyTypeLoading ? (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-gray-900 fw-bolder mb-3'>Company Information</h1>
        {/* end::Title */}

        
      </div>
      {/* end::Heading */}

     
      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group companyname */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Company Name</label>
        <input
          placeholder='Company Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('companyname')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.companyname && formik.errors.companyname,
            },
            {
              'is-valid': formik.touched.companyname && !formik.errors.companyname,
            }
          )}
        />
        {formik.touched.companyname && formik.errors.companyname && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.companyname}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Company Category</label>
        <select
          aria-label="Select company type"
          {...formik.getFieldProps('companytype')}
          
          className={clsx(
            'form-control bg-transparent',
            'form-select form-select-white',
            {
              'is-invalid': formik.touched.companytype && formik.errors.companytype,
            },
            {
              'is-valid': formik.touched.companytype && !formik.errors.companytype,
            }
          )}
        >
          <option value="">Select...</option>
          {sector.map((sectorOption) => (
                <option key={sectorOption.sector_id} value={sectorOption.sector_id}>
                  {sectorOption.sector_name}
                </option>
              ))}
        </select>
        {formik.touched.companytype && formik.errors.companytype && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.companytype}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Company Type</label>
        <select
          aria-label="Select company domain"
          {...formik.getFieldProps('companydomain')}

          className={clsx(
            'form-control bg-transparent',
            'form-select form-select-white',
            {
              'is-invalid': formik.touched.companydomain && formik.errors.companydomain,
            },
            {
              'is-valid': formik.touched.companydomain && !formik.errors.companydomain,
            }
          )}
        >
          <option value="">Select...</option>
          {companytype.map((companyOption) => (
                <option key={companyOption.company_type_id} value={companyOption.company_type_id}>
                  {companyOption.company_type_name}
                </option>
              ))}

        </select>
        {formik.touched.companydomain && formik.errors.companydomain && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.companydomain}</span>
            </div>
          </div>
        )}
      </div>

      

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>

      </div>
      
      {/* end::Form group */}
    </form>
    ) : (
        <h1>Loader</h1>
    )}
    </>
  )
}
