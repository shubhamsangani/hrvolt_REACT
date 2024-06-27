// import React, {useState, useEffect} from 'react'
// import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'
// import {Card4} from '../../../../../_metronic/partials/content/cards/Card4'
// import Select from 'react-select'

// import "./BulkResume.css"

// import Modal from 'react-bootstrap/Modal';
// import { Controller, useForm } from 'react-hook-form';

// import { ComparisionReportPage } from './ComparisionReportPage'

// import { useSelector } from "react-redux";

// import useAuth from '../../../../../app/hooks/useAuth'
// import axios from "axios";

// // import {Link} from 'react-router-dom'

// import {
//   jobDescriptionGetUserAPI
//  } from '../../../../../app/api'


// type Props = {
//   className: string
// }


// interface ComparisionReportModalProps {
//   show: boolean;
//   onHide: () => void;
// }

// interface OptionType {
//   label: string;
//   value: string;
// }

// interface RootState {
//   userDetail: {
//     options: {
//       jobPos: Array<{ label: string; value: string }>;

//     };
//   };
// }


// function ComparisionReportModal(props: ComparisionReportModalProps) {

//   return (
//     <Modal
//       {...props}
//       size="xl"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//           <Modal.Title>Comparision Report</Modal.Title>
//         </Modal.Header>
//       <Modal.Body>
//         <ComparisionReportPage/>
//       </Modal.Body>
     
//     </Modal>
//   );
// }

// const BulkResume: React.FC<Props> = ({ className }) => {

//   const [modalShow, setModalShow] = React.useState(false);
//   const sel_options = useSelector((state: RootState) => state?.userDetail?.options);

//   const [selectedJobPosition, setselectedJobPosition] = useState<Array<OptionType> | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [activePosts, setActivePosts] = useState([]);

//   const [ActivePostsloading, setActivePostsLoading] = useState(false);

  
//   const { userDetail, initialUserDetail, authTokens  } = useAuth();

//   const defaultValues = {
//     jobPosition: { value: "", label: "Select Job Position" },
//     // jobTitle : ""
//   };

//   const {
//     // register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue
//   } = useForm({
//     mode: "all",
//     defaultValues,
//   });

//   useEffect(() => {

//     setLoading(true);
    
//     try {

//       if (userDetail && initialUserDetail && authTokens) {

//         const viewJobs = async () => {
//           const inpData = {
//             "user_id": userDetail.id || initialUserDetail.id,
//             "job_description_action": "active",
//           };
  
//           const apiUrl = jobDescriptionGetUserAPI();
  
//           const headers = {
//             Authorization: `Bearer ${authTokens.access}`,
//           };
  
//           try {
//             const response = await axios.post(apiUrl, inpData, { headers });
  
//             if (response.data && response.data.Data) {
              
//                console.log(response.data.Data);
//                setActivePosts(response.data.Data);
//                setActivePostsLoading(true);
//             } else {
//               console.log("No data received from the API");
//             }
//           } catch (error) {
//             console.log("API request error:", error);
//           } finally {
//             setLoading(false);
//           }
//         };
  
//         viewJobs();
//       }

//     } catch (error) {
//       console.log("Error: ", error);
//     } finally {
//       setLoading(false);
//     }

//   }, []);


//   const handleBulkResumePage = async (data) => {
//     console.log(data);
//     setLoading(false);
//     setActivePostsLoading(false);
//   };

  
//   return (
//     <>
//       <div className={`card ${className}`}>

//         {/* begin::Header */}
//         <div className='card-header border-0 pt-5'>

//           <h3 className='card-title align-items-start flex-column'>
//             <span className='card-label fw-bold fs-3 mb-1'>AI Recommendation</span>
//           </h3>

//         </div>
//         {/* end::Header */}

//         {/* begin::Body */}

//           <div className='card-body pt-2'>
//             <div className="container">
//                 <div className="card">

//                   <form onSubmit={handleSubmit((data) => handleBulkResumePage(data))} noValidate className='form'>

//                   <div className="drop_box">
//                     <p>Files Supported: Zip file</p>
//                     <div className="btn">
//                       <input type="file" accept=".doc,.docx,.pdf" id="fileID" />
//                     </div>
//                   </div>

//                     <Controller
//                       name="jobPosition"
//                       rules={{ required: "Job position is required" }}
//                       control={control}  
//                       defaultValue={defaultValues.jobPosition}
//                       render={({ field }) => (
//                         <Select
//                           {...field}
//                           onChange={(selectedOption) => {
//                             if (selectedOption) {
//                               setselectedJobPosition([selectedOption]);
//                               setValue("jobPosition", selectedOption);
//                             } else {
//                               setselectedJobPosition(null);
//                             }
//                           }}
                          
//                           value={selectedJobPosition}
//                           options={sel_options?.jobPos}
//                           isClearable
//                           isSearchable
//                           placeholder="Select Job Position..."
                          
//                           styles={{
//                             control: (baseStyles, state) => ({
//                               ...baseStyles,
//                               padding: "calc(var(--size-100) + .15rem)",
//                               background: "var(--clr-formInput)",
//                               borderRadius: "var(--size-200)",
//                               borderColor: state.isFocused
//                                 ? "var(--clr-accent-400)"
//                                 : "transparent",
//                             }),
//                           }}
                          
//                         />
//                       )}
//                     />

//                     {errors.jobPosition && (
//                       <div className='fv-plugins-message-container'>
//                       <div className='fv-help-block'>{errors.jobPosition.message}</div>
//                     </div>
//                     )}

//                     </form>

//                   <br/>
//                   <button type='submit' className='btn btn-primary'>
//                     AI Analysis
//                   </button>
                    
//                 </div>
//             </div>  
//           </div>
        

//         {/* begin::Body */}

//       </div>

//       <div className='d-flex flex-wrap flex-stack mb-6'>
//         <h3 className='fw-bolder my-2'>
//           Resumes
//         </h3>

//         <div className='d-flex my-2'>
//           <div className='d-flex align-items-center position-relative me-4'>
//             <KTIcon iconName='magnifier' className='fs-3 position-absolute ms-3' />
//             <input
//               type='text'
//               id='kt_filter_search'
//               className='form-control form-control-white form-control-sm w-150px ps-9'
//               placeholder='Search'
//             />
//           </div>  
//         </div>
//       </div>

//       <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>

//         <div className='col-12 col-sm-12 col-xl'>

//           <div className='card h-80'>
//             <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
//               <a href='#' className='text-gray-800 text-hover-primary d-flex flex-column'>
//                 <div className='symbol symbol-75px mb-6'>
//                   <img src= {toAbsoluteUrl('media/svg/files/pdf.svg')} alt='' />
//                 </div>
//                 <div className='fs-5 fw-bolder mb-2'>Project..</div>
//               </a>
//               <div className='fs-7 fw-bold text-gray-500 mt-auto'>3 days ago</div>&nbsp;

//               <a href="#"><i className="fa-solid fa-chart-simple" onClick={() => setModalShow(true)}></i></a>&nbsp;
              
//             </div>
//           </div>
          
//         </div>
//         <div className='col-12 col-sm-12 col-xl'>
//           <Card4 icon='media/svg/files/pdf.svg' title='CRM App Docs..' description='3 days ago' />
//         </div>
//         <div className='col-12 col-sm-12 col-xl'>
//           <Card4
//             icon='media/svg/files/pdf.svg'
//             title='User CRUD Styles'
//             description='4 days ago'
//           />
//         </div>
//         <div className='col-12 col-sm-12 col-xl'>
//           <Card4 icon='media/svg/files/pdf.svg' title='Metronic Logo' description='5 days ago' />
//         </div>
//         <div className='col-12 col-sm-12 col-xl'>
//           <Card4 icon='media/svg/files/pdf.svg' title='Orders backup' description='1 week ago' />
//         </div>
//         <div className='col-12 col-sm-12 col-xl'>
//           <Card4 icon='media/svg/files/pdf.svg' title='Orders backup' description='1 week ago' />
//         </div>

//       </div>

//       <ComparisionReportModal
//             show={modalShow}
//             onHide={() => setModalShow(false)}
//           />

//     </>
//   )
// }

// export { BulkResume }