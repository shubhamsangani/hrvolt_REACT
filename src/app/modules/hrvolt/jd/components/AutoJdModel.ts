  export interface IProfileDetails {
      jobTitle: string;
      jobPosition: { value: string, label: string };
      jobLevel: { value: string, label: string };
      jobNationality: { value: string, label: string }[];
      jobGender: { value: string, label: string }[];
      jobEmpType: { value: string, label: string }[];
      jobWorkPlace: { value: string, label: string }[];
      jobLang: { value: string, label: string }[];
      jobLocation: { value: string, label: string }[];
      jobJoinPeriod: { value: string, label: string }[];
      JobEduation: { value: string, label: string }[];
      jobEduationField: { value: string, label: string }[];
      jobResp: { value: string, label: string }[];
      jobBenefit: { value: string, label: string }[];
      jobTechnicalSkills: { value: string, label: string }[];
      jobSoftSkills: { value: string, label: string }[];
      jobNumberVacancy: number;
      jobMaxSalary: number;
      jobMinsalary: number;
      jobManualBenefit: string;
      jobManualReq: string;
      jobManualResp: string;
      jobPostStatus: boolean;
  }

  export interface IProfileDetailsAI {
    // jobTitle: string;
    jobPosition: { value: string, label: string };
    jobLevel: { value: string, label: string };
  }
  
  export interface IUpdateEmail {
    newEmail: string;
    confirmPassword: string;
  }
  
  export interface IUpdatePassword {
    currentPassword: string;
    newPassword: string;
    passwordConfirmation: string;
  }
  
  export interface IConnectedAccounts {
    google: boolean;
    github: boolean;
    stack: boolean;
  }
  
  export interface IEmailPreferences {
    successfulPayments: boolean;
    payouts: boolean;
    freeCollections: boolean;
    customerPaymentDispute: boolean;
    refundAlert: boolean;
    invoicePayments: boolean;
    webhookAPIEndpoints: boolean;
  }
  
  export interface INotifications {
    notifications: {
      email: boolean;
      phone: boolean;
    };
    billingUpdates: {
      email: boolean;
      phone: boolean;
    };
    newTeamMembers: {
      email: boolean;
      phone: boolean;
    };
    completeProjects: {
      email: boolean;
      phone: boolean;
    };
    newsletters: {
      email: boolean;
      phone: boolean;
    };
  }
  
  export interface IDeactivateAccount {
    confirm: boolean;
  }
  
  
  export const updateEmail: IUpdateEmail = {
    newEmail: "support@keenthemes.com",
    confirmPassword: "",
  };
  
  export const updatePassword: IUpdatePassword = {
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  };
  
  export const connectedAccounts: IConnectedAccounts = {
    google: true,
    github: true,
    stack: false,
  };
  
  export const emailPreferences: IEmailPreferences = {
    successfulPayments: false,
    payouts: true,
    freeCollections: false,
    customerPaymentDispute: true,
    refundAlert: false,
    invoicePayments: true,
    webhookAPIEndpoints: false,
  };
  
  export const notifications: INotifications = {
    notifications: {
      email: true,
      phone: true,
    },
    billingUpdates: {
      email: true,
      phone: true,
    },
    newTeamMembers: {
      email: true,
      phone: false,
    },
    completeProjects: {
      email: false,
      phone: true,
    },
    newsletters: {
      email: false,
      phone: false,
    },
  };
  
  export const deactivateAccount: IDeactivateAccount = {
    confirm: false,
  };
  

  interface CompanyInfo {
    company_info_id: string;
    company_name: string;
    company_description: string;
    company_established_year: string;
    contact_number: string;
    company_email: string;
    company_googlelink: string;
    company_linkdinlink: string;
    company_team_member: string;
    company_twitter_link: string;
    company_facebook_link: string;
    sector_id: string;
    company_type_id: string;
    company_action: string;
    company_registration_date: string;
  }
  
  interface Education {
    education_id: string;
    education_name: string;
    education_name_arabic: string;
    education_years: string;
    education_years_arabic: string;
    education_action: string;
    education_registration_date: string;
  }
  
  interface EducationField {
    education_field_id: string;
    education_field_name: string;
    education_field_name_arabic: string;
    sector_id: string;
    education_field_action: string;
    education_field_registration_date: string;
  }
  
  interface SoftSkill {
    soft_skills_id: string;
    soft_skills_name: string;
    soft_skills_name_arabic: string;
    soft_skills_action: string;
    soft_skills_registration_date: string;
  }
  
  interface EmploymentType {
    employment_type_id: string;
    employment_type_name: string;
    employment_type_name_arabic: string;
    employment_type_action: string;
    employment_type_registration_date: string;
  }
  
  interface JoiningPeriod {
    joining_period_id: string;
    joining_period_name: string;
    joining_period_name_arabic: string;
    joining_period_action: string;
    joining_period_registration_date: string;
  }
  
  interface Language {
    language_id: string;
    language_name: string;
    language_name_arabic: string;
    language_action: string;
    language_registration_date: string;
  }
  
  interface WorkPlace {
    work_place_id: string;
    work_place_name: string;
    work_place_name_arabic: string;
    work_place_action: string;
    work_place_registration_date: string;
  }
  
  interface JobBenefit {
    job_benefit_id: string;
    job_position_id: string;
    job_level_id: string;
    job_benefit_description: string;
    job_benefit_description_arabic: string | null;
    job_benefit_action: string;
    job_benefit_registration_date: string;
  }
  
  interface JobResponsibility {
    job_responsibility_id: string;
    job_position_id: string;
    job_level_id: string;
    job_responsibility_description: string;
    job_responsibility_description_arabic: string | null;
    job_responsibility_action: string;
    job_responsibility_registration_date: string;
  }
  
  export interface AiJobDesType {
    job_level_name: string;
    job_position_name: string;
    number_of_vacancy: number;
    company_name: CompanyInfo;
    gender: string[];
    min_salary: number;
    max_salary: number;
    Education: Education[];
    Education_Field: EducationField[];
    Soft_Skills: SoftSkill[];
    employment_type: EmploymentType[];
    Joining_Period: JoiningPeriod[];
    Languages: Language[];
    Work_Place: WorkPlace[];
    have_to_tech_skill: string[];
    optional_tech_skill: string[];
    Benefits: JobBenefit[];
    responsibility: JobResponsibility[];
  }
  
  export interface JobDescriptionResponse {
    
    job_position_id: string;
    job_position_name: string;
    job_level_id: string;
    job_level_name: string;
    gender: string[];
    Soft_Skills: { soft_skills_id: string; soft_skills_name: string }[];
    Education: { education_id: string; education_name: string }[];
    Education_Field: { education_field_id: string; education_field_name: string }[];
    employment_type: { employment_type_id: string; employment_type_name: string }[];
    Joining_Period: { joining_period_id: string; joining_period_name: string }[];
    Languages: { language_id: string; language_name: string }[];
    Work_Place: { work_place_id: string; work_place_name: string }[];
    Benefits: { job_benefit_id: string; job_benefit_description: string }[];
    responsibility: { job_responsibility_id: string; job_responsibility_description: string }[];
    Nationality: { nationality_id: string; nationality_name: string }[];
    Technical_skills: { technical_skill_id: string; technical_skill_name: string }[];
    number_of_vacancy: number;
    max_salary: number;
    min_salary: number;
  }


  // Job Description -------------------


export interface educationType {
    user_id: string;
    education_job_description_id: string;
    education_id: string;
    education_name: string;
    job_description_id: string;
    education_job_description_action: string;
    education_job_description_registration_date:string;
}


export interface educationFieldType {
  user_id: string;
  education_field_job_description_id: string;
  education_field_id: string;
  education_field_name: string;
  job_description_id: string;
  education_field_job_description_action: string;
  education_field_job_description_registration_date: string; 

}


export interface langType {
  user_id: string;
  language_job_description_id: string;
  language_id: string;
  language_name: string;
  job_description_id: string;
  language_job_description_action: string;
  language_job_description_registration_date: string;
}


export interface genType {
  user_id: string;
  gender_job_description_id: string;
  gender: string;
  job_description_id: string;
  gender_job_description_action: string;
  gender_job_description_registration_date: string;
}


export interface nationalityType {
  user_id: string;
  nationality_job_description_id: string;
  nationality_id: string;
  nationality_name: string;
  job_description_id: string;
  nationality_job_description_action: string;
  nationality_job_description_registration_date: string;
}

export interface joiningPeriodType {
  user_id: string;
  joining_period_job_description_id: string;
  joining_period_id: string;
  joining_period_name: string;
  job_description_id: string;
  joining_period_job_description_action: string;
  joining_period_job_description_registration_date: string;
}


export interface softType {
  user_id: string;
  soft_skills_job_description_id: string;
  soft_skills_id: string;
  soft_skills_name: string;
  job_description_id: string;
  soft_skills_job_description_action: string;
  soft_skills_job_description_registration_date: string;
}

export interface techType {
  user_id: string;
  technical_skills_job_description_id: string;
  technical_skills_id: string;
  technical_skills_name: string;
  job_description_id: string;
  technical_skills_job_description_action: string;
  technical_skills_job_description_registration_date: string;
}

export interface respType {
    job_responsibility_id: string,
    job_responsibility_description: string
}

export interface benType {
  job_benefit_id: string,
  job_benefit_description: string
}

export interface empType {
  employment_type_id: string,
  employment_type_name: string
}

export interface workType {
  user_id: string,
  work_place_job_description_id: string,
  work_place_id: string,
  work_place_name: string,
  job_description_id: string,
  work_place_job_description_action: string,
  work_place_job_description_registration_date: string
}

export interface jobdescrip {
  user_id: string;
  job_position_id: string;
  job_level_id: string;
  job_position_name: string;
  job_level_name: string;
  job_tilte: string;
  job_description_id: string;
  salary_min: number;
  salary_max: number;
  number_of_vacancy: number;
  job_description_action: string;
  job_description_registration_date:string;
}

export interface viewJobPost {
  jobEducation : educationType[];
  jobEducationField: educationFieldType[],
  jobDescription: jobdescrip[],
  JoiningPeriod: joiningPeriodType[],
  Nationality: nationalityType[],
  jobTechnicalSkills: techType[],
  jobSoftSkills: softType[],
  Gender: genType[],
  language: langType[],
  jobResponsibilities: respType[];
  jobBenefits: benType[];
  jobEmploymentType: empType[];
  WorkPlace: workType[];
  // jobCustomResponsibilities:
  // jobCustomBenefits:
  // jobCustomReq:
} 


///////////////////////////////////////////////////



