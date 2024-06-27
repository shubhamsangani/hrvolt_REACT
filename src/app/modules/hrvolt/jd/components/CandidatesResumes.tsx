import React, { useState, useEffect } from "react";

import { toAbsoluteUrl } from "../../../../../_metronic/helpers";

import Select from "react-select";

import "./BulkResume.css";
import { format } from "date-fns";

import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";

import { ComparisionReportPage } from "./ComparisionReportPage";

import useAuth from "../../../../../app/hooks/useAuth";
import axios from "axios";

import {
  BulkResumeAnalysisDataAPI,
  FetchAPI,
  jobDescriptionGetUserAPI,
} from "../../../../../app/api";

import { Document, Page } from "react-pdf";

import { useTranslation } from "react-i18next";

type JobApplication = {
  jobPost: {
    value: string;
    label: string;
  };
  resumeUpload: FileList;
};
type resumeData = {
  recruiter_resume_bulk_data_registration_date: string;
  resume_file_path: string;
  resume_ai_compare_score: string;
};

type Props = {
  className: string;
};

interface ComparisionReportModalProps {
  show: boolean;
  onHide: () => void;
}

interface OptionType {
  label: string;
  value: string;
}

interface ResumeModalProps {
  show: boolean;
  onHide: () => void;
  resume_path: string;
}

function ComparisionReportModal(props: ComparisionReportModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("translation:comparision_resport")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ComparisionReportPage />
      </Modal.Body>
    </Modal>
  );
}

function ResumeViewModal(props: ResumeModalProps) {
  const [numPages, setNumPages] = useState<number>();
  //  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Document file={props.resume_path} onLoadSuccess={onDocumentLoadSuccess}>
        {[...Array(numPages).keys()].map((page) => (
          <Page
            key={page + 1}
            pageNumber={page + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </Modal>
  );
}

const CandidatesResume: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowResume, setModalShowResume] = React.useState(false);
  const [resumepath, setResumepath] = useState("");

  // const dispatch = useDispatch();

  const [selectedjobPost, setselectedjobPost] =
    useState<Array<OptionType> | null>(null);

  const [loading, setLoading] = useState(false);
  const [activePosts, setActivePosts] = useState([]);

  const [compareAnalysis, setcompareAnalysis] = useState([]);

  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const [active, setActive] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState('');
  console.log("🚀 ~ selectedDate:", selectedDate)

  const [ActivePostsloading, setActivePostsLoading] = useState(false);
  const [compareAnalysisloading, setcompareAnalysisLoading] = useState(false);

  const { userDetail, initialUserDetail, authTokens } = useAuth();

  const defaultValues = {
    jobPost: { value: "", label: "" },
    resumeUpload: new DataTransfer().files,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "all",
    defaultValues,
  });

  useEffect(() => {
    setLoading(true);

    try {
      if (userDetail && initialUserDetail && authTokens) {
        const viewJobs = async () => {
          const inpData = {
            user_id: userDetail.id || initialUserDetail.id,
            job_description_action: "active",
          };

          const apiUrl = jobDescriptionGetUserAPI();

          const headers = {
            Authorization: `Bearer ${authTokens.access}`,
          };

          try {
            const response = await axios.post(apiUrl, inpData, { headers });

            if (response.data && response.data.Data) {
              setActivePosts(response.data.Data);
              setActivePostsLoading(true);
            } else {
              console.log("No data received from the API");
            }
          } catch (error) {
            console.log("API request error:", error);
          } finally {
            setLoading(false);
          }
        };

        viewJobs();
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBulkResumePage = async (formdata: JobApplication) => {
    setLoading(true);

    try {
      if (userDetail && initialUserDetail && authTokens) {
        const formData = new FormData();

        formData.append("user_id", userDetail.id || initialUserDetail.id);
        formData.append("job_description_id", formdata.jobPost.value);

        // Call bulkResumeRegister and await its result
        const { data } = await FetchAPI(
          BulkResumeAnalysisDataAPI(),
          "POST",
          formData
        );
        // Assuming compareData is of type ResumeList
        setcompareAnalysis(data?.Data);
        setcompareAnalysisLoading(true);
        setActive(1);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const resumeModelFun = (resume_path: string) => {
    setResumepath(resume_path);
    setModalShowResume(true);
  };

  type Event = React.ChangeEvent<HTMLInputElement>;
  //Date filtration
  const handleDateChange = (e: Event) => {
    setSelectedDate(e.target.value);
  };
  
  const filteredCandidate = selectedDate ? compareAnalysis?.filter((el: resumeData) => {
    const isoString = el.recruiter_resume_bulk_data_registration_date;
    const date = new Date(isoString);
    return (
      format(date, "yyyy-MM-dd") === selectedDate
    )
  }) : compareAnalysis

  //========================= pagination =============================
  // Calculate the total page for pagination button display
  const totalItems: number = compareAnalysis?.length ?? 0;
  const itemsPerPage: number = 10;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  // Calculate the index range of candidates to display based on the current page
  const indexOfLastCandidate = active * itemsPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
  const currentCandidates = filteredCandidate?.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  console.log("🚀 ~ currentCandidates:", currentCandidates)

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      className:
        active === index ? "btn btn-primary mx-2" : "mx-2 btn btn-secondary",
      onClick: () => setActive(index),
    } as any);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} {...getItemProps(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };
  //========================= pagination =============================

  return (
    <>
      <div>
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                {t("translation:candidate_resume")}
              </span>
            </h3>
          </div>
          {/* end::Header */}

          {/* begin::Body */}

          <div className="card-body pt-2">
            <div className="">
              <form
                onSubmit={handleSubmit((data) => handleBulkResumePage(data))}
                noValidate
                className="form"
              >
                <div className="">
                  <Controller
                    name="jobPost"
                    rules={{ required: t("translation:bulkresume_select") }}
                    control={control}
                    defaultValue={defaultValues.jobPost}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(selectedOption) => {
                          if (selectedOption) {
                            setselectedjobPost([selectedOption]);
                            setValue("jobPost", selectedOption);
                          } else {
                            setselectedjobPost(null);
                          }
                        }}
                        value={selectedjobPost}
                        options={activePosts.map(
                          (el: {
                            job_description_id: string;
                            job_tilte: string;
                          }) => ({
                            value: el.job_description_id,
                            label: el.job_tilte,
                          })
                        )}
                        // options={sel_options?.jobPos}
                        isClearable
                        isSearchable
                        placeholder={t("translation:bulk_resume_job_post")}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            padding: "calc(var(--size-100) + .15rem)",
                            background: "var(--clr-formInput)",
                            borderRadius: "var(--size-200)",
                            borderColor: state.isFocused
                              ? "var(--clr-accent-400)"
                              : "transparent",
                          }),
                        }}
                      />
                    )}
                  />

                  {errors.jobPost && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {errors.jobPost.message}
                      </div>
                    </div>
                  )}

                  <br />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {!loading && t("translation:subbtn")}
                    {loading && (
                      <span
                        className="indicator-progress"
                        style={{ display: "block" }}
                      >
                        {t("translation:please_wait")}{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>

                  {/* <button type='submit' className='btn btn-primary'>
                    
                  </button> */}
                </div>
              </form>
            </div>
          </div>

          {/* begin::Body */}
        </div>

        {compareAnalysisloading ? (
          <>
            <div className="d-flex flex-wrap flex-stack mb-6">
              <h3 className="fw-bolder my-2">
                {t("translation:resumes_title")}
              </h3>
              <div>
                <input type="date" name="" id="" className="p-2 rounded border border-primary"
                 value={selectedDate} 
                 onChange={handleDateChange}  />
              </div>
            </div>

            <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
              <table className="table table-striped">
                <thead>
                  <tr className="text-center">
                    <th className="fs-4 fw-bold mb-4">Candidate Name</th>
                    <th className="fs-4 fw-bold">AI Percentage Score</th>
                    <th className="fs-4 fw-bold">View Resume</th>
                    <th className="fs-4 fw-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {compareAnalysis &&
                    currentCandidates?.map((analysis: resumeData, index) => {
                      const isoString =
                        analysis.recruiter_resume_bulk_data_registration_date;
                      const date = new Date(isoString);

                      return (
                        <>
                          <tr key={index} className="text-center">
                            <td className="">Candidate</td>
                            <td className="fw-bold fs-5">
                              {analysis.resume_ai_compare_score} %
                            </td>
                            <td>
                              <div>
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary d-flex flex-column"
                                  onClick={() =>
                                    resumeModelFun(analysis.resume_file_path)
                                  }
                                >
                                  <div className="symbol symbol-50px mb-6">
                                    <img
                                      src={toAbsoluteUrl(
                                        "media/svg/files/pdf.svg"
                                      )}
                                      alt=""
                                    />
                                  </div>
                                </a>
                              </div>
                            </td>
                            <td className="fw-bold fs-5">
                              {format(date, "dd/MM/yyyy")}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
              {
              currentCandidates.length > 0 ?
              (compareAnalysis?.length ?? 0) >= itemsPerPage && (
                <div className="text-center">
                  <button
                    className="p-3 btn btn-primary me-2"
                    onClick={prev}
                    disabled={active === 1}
                  >
                    Prev
                  </button>
                  <div className="d-inline-block">{renderPageButtons()}</div>
                  <button
                    className="p-3 btn btn-primary ms-2"
                    onClick={next}
                    disabled={active === totalPages}
                  >
                    Next
                  </button>
                </div>
              )
            : <div className="fs-1 fw-bold text-center" style={{color: 'gray'}}>No Resumes found on selected date</div>
            }
            </div>
          </>
        ) : (
          <></>
        )}

        <ResumeViewModal
          show={modalShowResume}
          onHide={() => setModalShowResume(false)}
          resume_path={resumepath}
        />

        <ComparisionReportModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
};

export { CandidatesResume };
