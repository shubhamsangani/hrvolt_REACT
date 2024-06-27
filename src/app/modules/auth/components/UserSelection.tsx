
import React from 'react';
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useState} from 'react'

const initialValues = {
    email: 'admin@demo.com',
  }
  

export function EmailVerification() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  
  const formik = useFormik({
    initialValues,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setStatus('Okay')
      setSubmitting(true)
        
    },
  })

  console.log(hasErrors)

  return (

        <form className="my-auto pb-5"
         id="kt_create_account_form"
         noValidate
            onSubmit={formik.handleSubmit}
         >
            <div className="current" data-kt-stepper-element="content">
                <div className="w-100">
                <div className="pb-10 pb-lg-15">
                    <h2 className="fw-bold d-flex align-items-center text-gray-900">Primary Role
                    </h2>
                </div>
                <div className="fv-row">
                    <div className="row">
                    <div className="col-lg-6">
                        <input type="radio" className="btn-check" name="account_type" value="personal" id="kt_create_account_form_account_type_personal" />
                        <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-10" htmlFor="kt_create_account_form_account_type_personal">
                        <i className="ki-duotone ki-briefcase fs-3x me-5">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                        <span className="d-block fw-semibold text-start">
                            <span className="text-gray-900 fw-bold d-block fs-4 mb-2">I am Recruiter</span>
                        </span>
                        </label>
                    </div>
                    <div className="col-lg-6">
                        <input type="radio" className="btn-check" name="account_type" value="corporate" id="kt_create_account_form_account_type_corporate" />
                        <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center" htmlFor="kt_create_account_form_account_type_corporate">
                        <i className="ki-duotone ki-briefcase fs-3x me-5">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                        <span className="d-block fw-semibold text-start">
                            <span className="text-gray-900 fw-bold d-block fs-4 mb-2">I am Job Seeker</span>
                        </span>
                        </label>

                    </div>
                    </div>
                </div>
                </div>
            </div>

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

        </form>
    
  );
}

  