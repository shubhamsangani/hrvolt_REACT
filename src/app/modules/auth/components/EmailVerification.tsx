
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useFormik } from 'formik'

import {otpVerificationCall} from '../../../actions/userAction'

import { useDispatch } from "react-redux";


const initialValues = {
    verificationcode: '',
   
  }
  

const VerificationCodeSchema = Yup.object().shape({
    verificationcode: Yup.string()
    .required('Verification code is required'),
})

export function EmailVerification() {
    
  const [loading, setLoading] = useState(false)
  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: VerificationCodeSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {

      setLoading(true)
      setSubmitting(true)

      const sendData = {
        "id": state,
        "OTP_code": values.verificationcode
      }
          
      const res = await dispatch( 
        otpVerificationCall(sendData)  
      )

      setLoading(false)

      if('OTP_error' in res){

        setStatus(res['OTP_error'])

      }else{

       if('id' in res && !loading){

            navigate("/company-information", {
                replace: true,
                state: res.id
            });

        }else{

            setStatus("Something goes wrong during email verification !!") 

        }
      }
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-gray-900 fw-bolder mb-3'>Verification Code</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-500 fw-semibold fs-6'>
          Only valid for 10 minutes.
        </div>
        {/* end::Link */}
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group verificationcode */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Code</label>
        <input
          placeholder='Verification code'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('verificationcode')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.verificationcode && formik.errors.verificationcode,
            },
            {
              'is-valid': formik.touched.verificationcode && !formik.errors.verificationcode,
            }
          )}
        />
        {formik.touched.verificationcode && formik.errors.verificationcode && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.verificationcode}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

       {/* begin::Wrapper */}
       <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        {/* <Link to='/auth/forgot-password' className='link-primary'>
          Resend the code ?
        </Link> */}
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Form group */}
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
          <span className='indicator-label'>Submit</span>
          {loading && (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-light'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancel
          </button>
        </Link>{' '}
      </div>
      {/* end::Form group */}
    </form>
  )
}


  