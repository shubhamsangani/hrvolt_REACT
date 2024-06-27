// import React from 'react'
// import { KTIcon, toAbsoluteUrl } from '../../../../../_metronic/helpers'
// import {Card4} from '../../../../../_metronic/partials/content/cards/Card4'

// import "./BulkResume.css"

// import Modal from 'react-bootstrap/Modal';

// import { ComparisionReportPage } from './ComparisionReportPage'


// type Props = {
//   className: string
// }


// interface ComparisionReportModalProps {
//   show: boolean;
//   onHide: () => void;
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
//         <div className='card-body pt-2'>
//           <div className="container">
//               <div className="card">
//                 <div className="drop_box">
//                   <p>Files Supported: Zip file</p>
//                   <div className="btn">
//                     <input type="file" accept=".doc,.docx,.pdf" id="fileID" />
//                   </div>
//                 </div>
//                 <select
//                       className='form-select form-select-solid form-select-lg'
//                     >
//                       <option value=''>Select a Job Description...</option>
//                       <option value='da'>Data Analysis</option>
//                       <option value='pd'>Python Developer</option>
//                       <option value='rd'>React Developer</option>
//                       <option value='uiux'>UI/UX Developer</option>
//                       <option value='ds'>Data Scientist</option>
//                 </select>
//                  <br/>
//                 <button type='submit' className='btn btn-primary'>
//                   AI Analysis
//                 </button>
                   
//               </div>
              
//             </div>

            
//         </div>
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