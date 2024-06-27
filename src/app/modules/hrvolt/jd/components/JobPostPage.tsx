import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { IProfileDetails, JobDescriptionResponse } from "./AutoJdModel";
import { toast } from "react-toastify";

import {
  jobPositionBySearchAPI,
  jobLevelBySearchAPI,
  TokenBaseFetchApi,
  jobDescriptionUploadAPI,
  FetchAPI,
} from "../../../../../app/api";

import {
  infiniteScrollApiCall,
  getUniqueRec,
} from "../../../../common/inifinitescroll";
import { useDispatch, useSelector } from "react-redux";

import {
  setDropdownOptions,
  jobDescriptionRegister,
} from "../../../../actions/userAction";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../app/hooks/useAuth";
import axios from "axios";

interface ComparisionReportModalProps {
  show: boolean;
  onHide: () => void;
}

interface GenerateJobDescriptionmodalProps extends ComparisionReportModalProps {
  // onJobDescription: (jobDescription: AiJobDesType[]) => void;
  onJobDescription: (response: JobDescriptionResponse) => void;
}

interface RootState {
  userDetail: {
    options: {
      jobPos: Array<{ label: string; value: string }>;
      jobLev: Array<{ label: string; value: string }>;
      jobNation: Array<{ label: string; value: string }>;
      jobGen: Array<{ label: string; value: string }>;
      jobEmp: Array<{ label: string; value: string }>;
      jobWork: Array<{ label: string; value: string }>;
      jobLan: Array<{ label: string; value: string }>;
      // jobLoc: Array<{ label: string; value: string }>;
      jobJoin: Array<{ label: string; value: string }>;
      jobE: Array<{ label: string; value: string }>;
      jobEf: Array<{ label: string; value: string }>;
      jobR: Array<{ label: string; value: string }>;
      jobBen: Array<{ label: string; value: string }>;
      jobTech: Array<{ label: string; value: string }>;
      jobSoft: Array<{ label: string; value: string }>;
    };
  };
}

interface OptionType {
  label: string;
  value: string;
}

type JobApplication = {
  job_tilte: string;
  job_position_id: { value: string; label: string };
  job_level_id: { value: string; label: string };
  job_description_upload_file: FileList;
};

const limit = 10;

const JobPostPage: React.FC = () => {
  const dispatch = useDispatch();

  const { userDetail, initialUserDetail, authTokens } = useAuth();

  const sel_options = useSelector(
    (state: RootState) => state?.userDetail?.options
  );

  const [selectedJobPosition, setselectedJobPosition] =
    useState<Array<OptionType> | null>(null);
  const [selectedjobLevel, setselectedjobLevel] =
    useState<Array<OptionType> | null>(null);
  const [currrentJobPositionPage, setCurrrentJobPositionPage] = useState(1);

  const [totalJobPositionPage, setTotalJobPositionPage] = useState();
  const [searchJobPositionPage, setSearchJobPositionPage] = useState("");

  const [currrentJobLevelPage, setCurrrentJobLevelPage] = useState(1);
  const [totalJobLevelPage, setTotalJobLevelPage] = useState();
  const [searchJobLevelPage, setSearchJobLevelPage] = useState("");

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const defaultValues = {
    job_tilte: "",
    job_position_id: { value: "", label: "" },
    job_level_id: { value: "", label: "" },
    job_description_upload_file: new DataTransfer().files,
    user_id: "",
    job_description_action: "",
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "all",
    defaultValues,
  });

  const handleJobDescription = (response: JobDescriptionResponse) => {
    const job_position = {
      value: response.job_position_id,
      label: response.job_position_name,
    };

    const job_level = {
      value: response.job_level_id,
      label: response.job_level_name,
    };

    setselectedJobPosition([job_position]);
    setselectedjobLevel([job_level]);

    reset({
      job_position_id: job_position,
      job_level_id: job_level,
    });
  };

  /* Job position  start */

  const jobPositionFun = async (search = "") => {
    try {
      const apiUrl = jobPositionBySearchAPI();
      const postData = {
        page: currrentJobPositionPage,
        limit,
        q: search,
      };

      if (
        !totalJobPositionPage ||
        currrentJobPositionPage <= totalJobPositionPage
      ) {
        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "job_position_name",
          value_key: "job_position_id",
        });

        if (response) {
          setTotalJobPositionPage(response?.TotalPages);
          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobPos || [], response?.Data),
              "jobPos"
            )
          );
        }
      }
    } catch (error) {
      console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobPositionFun(searchJobPositionPage);
  }, [currrentJobPositionPage, searchJobPositionPage]);

  const loadMoreJobPositionData = () => {
    setCurrrentJobPositionPage((prev) => prev + 1);
  };

  const handleJobPositionSearch = (searchJobPositionPage = "", action = "") => {
    if (action === "input-change") dispatch(setDropdownOptions([], "jobPos"));
    setSearchJobPositionPage(searchJobPositionPage);
    setCurrrentJobPositionPage(1);
  };

  /* Job position  end */

  /* Job level  start */

  const jobLevelFun = async (search = "") => {
    try {
      const apiUrl = jobLevelBySearchAPI();
      const postData = {
        page: currrentJobLevelPage,
        limit,
        q: search,
      };

      if (!totalJobLevelPage || currrentJobLevelPage <= totalJobLevelPage) {
        const response = await infiniteScrollApiCall({
          apiEndpoint: apiUrl,
          payload: postData,
          label_key: "job_level_name",
          value_key: "job_level_id",
        });

        if (response) {
          setTotalJobLevelPage(response?.TotalPages);

          dispatch(
            setDropdownOptions(
              getUniqueRec(sel_options?.jobLev || [], response?.Data),
              "jobLev"
            )
          );
        }
      }
    } catch (error) {
      console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    jobLevelFun(searchJobLevelPage);
  }, [currrentJobLevelPage, searchJobLevelPage]);

  const loadMorejobLevelData = () => {
    setCurrrentJobLevelPage((prev) => prev + 1);
  };

  const handlejobLevelSearch = (searchJobLevelPage = "", action = "") => {
    if (action === "input-change") dispatch(setDropdownOptions([], "jobLev"));
    setSearchJobLevelPage(searchJobLevelPage);
    setCurrrentJobLevelPage(1);
  };

  /* Job level  end */

  const handleJobPostPage = async (jobData: JobApplication) => {
    setLoading(true);

    try {
      if (userDetail && initialUserDetail && authTokens) {
        const formData = new FormData();
        formData.append("user_id", userDetail.id);
        formData.append("job_position_id", jobData.job_position_id.value);
        formData.append("job_level_id", jobData.job_level_id.value);
        formData.append("job_tilte", jobData.job_tilte);
        formData.append(
          "job_description_upload_file",
          jobData.job_description_upload_file[0]
        );
        formData.append("job_description_action", "active");
        console.log("🚀 ~ handleJobPostPage ~ formData:", formData);

        const { data } = await FetchAPI(jobDescriptionUploadAPI(), "POST", formData);
    
        console.log(data);
       
        if (data?.errorMsg) {
          toast.error(data.errorMsg[0], {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success("Job post is successfully created.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(
            "/hrvolt/jd/view-job-description-details/view-job-post-active"
          );
        }
      }

      setLoading(false);
    } catch (error) {
      toast.error("Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log("errorr", error);
    } finally {
      setLoading(false);
    }
  };

  const validateFileType = (value: FileList) => {
    // console.log("file val", value)
    if (!value[0]) {
      return "Please select a file.";
    }

    if (value[0].size > 5242880) {
      return "File is too large. Max 5 MB.";
    }

    if (
      ![
        "application/pdf",
        "application/msword",
      ].includes(value[0].type)
    ) {
      return "Only .pdf and .doc files are allowed.";
    }
    
  };

  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div
          className="card-header border-0 cursor-pointer"
          role="button"
          data-bs-target="#kt_account_profile_details"
          aria-expanded="true"
          aria-controls="kt_account_profile_details"
        >
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">
              {t("translation:job_description_title")}
            </h3>
          </div>
        </div>

        <div id="kt_account_profile_details" className="collapse show">
          <form
            onSubmit={handleSubmit((data) => handleJobPostPage(data))}
            noValidate
            className="form"
          >
            <div className="card-body border-top p-9">
              <div className="row mb-6">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <h5>{t("translation:job_title")}</h5>

                    <input
                      {...register("job_tilte", {
                        required: t("translation:job_title_required"),
                      })}
                      name="job_tilte"
                      type="text"
                      placeholder={t("translation:job_title_enter")}
                      id="job_tilte"
                      className="form-control"
                      required
                    />

                    {errors.job_tilte && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {errors.job_tilte.message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <div className="row">
                  <div className="col-lg-6 fv-row">
                    <h5>{t("translation:job_position")}:</h5>

                    <Controller
                      name="job_position_id"
                      rules={{
                        required: t("translation:job_position_required"),
                      }}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(selectedOption) => {
                            if (selectedOption) {
                              setselectedJobPosition([selectedOption]);
                              setValue("job_position_id", selectedOption);
                            } else {
                              setselectedJobPosition(null);
                            }
                          }}
                          value={selectedJobPosition}
                          options={sel_options?.jobPos}
                          isClearable
                          isSearchable
                          placeholder={t("translation:job_position_select")}
                          onMenuScrollToBottom={() => loadMoreJobPositionData()}
                          onInputChange={(value, { action }) =>
                            handleJobPositionSearch(value, action)
                          }
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

                    {errors.job_position_id && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {errors.job_position_id.message}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 fv-row">
                    <h5>{t("translation:job_level")}</h5>
                    <Controller
                      name="job_level_id"
                      rules={{ required: t("translation:job_level_required") }}
                      control={control}
                      // defaultValue={defaultValues.job_level_id}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(selectedOption) => {
                            if (selectedOption) {
                              setselectedjobLevel([selectedOption]);
                              setValue("job_level_id", selectedOption);
                            } else {
                              setselectedjobLevel(null);
                            }
                          }}
                          value={selectedjobLevel}
                          options={sel_options?.jobLev}
                          isClearable
                          isSearchable
                          placeholder={t("translation:job_level_select")}
                          onMenuScrollToBottom={() => loadMorejobLevelData()}
                          onInputChange={(value, { action }) =>
                            handlejobLevelSearch(value, action)
                          }
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

                    {errors.job_level_id && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {errors.job_level_id.message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-6">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <h5>{t("translation:upload_file")}</h5>

                    <input
                      {...register("job_description_upload_file", {
                        required: t("translation:upload_file_validation"),
                        validate: validateFileType,
                      })}
                      type="file"
                      name="job_description_upload_file"
                      //   accept=".zip"
                    />
                    {errors.job_description_upload_file && (
                      <span className="errorMsg" style={{color: 'red'}}>
                        {errors.job_description_upload_file.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {!loading && t("translation:publish")}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    {t("translation:publishing")}{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { JobPostPage };
