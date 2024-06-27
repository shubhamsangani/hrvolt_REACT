
export interface UserData {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_is_recruiter: boolean;
}


export interface UserRegisterData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_is_recruiter: boolean;
}


export interface CompanyDetailRegister {
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

export interface CompanyData {
    company_info_id: string;
    user_id: string;
    company_name: string;
    company_location: string;
    company_description: string;
    company_estanlised_year: string;
    contact_number: string;
    company_email: string;
    company_zipcode: string;
    company_address: string;
    company_googlelink: string;
    company_linkdinlink: string;
    company_category: string;
    company_team_member: string;
    company_county: string;
    company_city: string;
}

export interface CompanyRegisterData {
    company_name: string;
    company_location: string;
    company_description: string;
    company_estanlised_year: string;
    contact_number: string;
    company_email: string;
    company_zipcode: string;
    company_address: string;
    company_googlelink: string;
    company_linkdinlink: string;
    company_category: string;
    company_team_member: string;
    company_county: string;
    company_city: string;
}

export interface UserCompanyData {
    user_id: string;
    company_info_id: string;
}

export interface UserEmailVerificationData {
    id: string;
    email: string;
}

export interface SectorData {
    sector_id: string;
    sector_name: string;
    sector_name_arabic: string;
    sector_action: string;
    sector_registration_date: string;
}


export interface CompanyType {
    company_type_id: string;
    company_type_name: string;
    company_type_name_arabic: string;
    company_type_action: string;
    company_type_registration_date: string;
}


export interface JobLevel {
    job_level_id: string;
    job_level_name: string;
    job_level_name_arabic: string;
    job_level_action: string;
    job_level_registration_date: string;
}

export interface JobPosition {
    job_position_id: string;
    sector_id: string;
    job_position_name: string;
    job_position_name_arabic: string;
    job_position_action: string;
    job_position_registration_date: string;
}


export interface Nationality {
    nationality_id: string;
    nationality_name: string;
    nationality_name_arabic: string;
    nationality_action: string;
    nationality_registration_date: string;
}


export interface EmpType {
    employment_type_id: string;
    employment_type_name: string;
    employment_type_name_arabic: string;
    employment_type_action: string;
    employment_type_registration_date: string;
}

export interface WorkPlace {
    work_place_id: string;
    work_place_name: string;
    work_place_name_arabic: string;
    work_place_action: string;
    work_place_registration_date: string;
}


export interface Language {
    language_id: string;
    language_name: string;
    language_name_arabic: string;
    language_action: string;
    language_registration_date: string;
}

export interface JoiningPeriod {
    joining_period_id: string;
    joining_period_name: string;
    joining_period_name_arabic: string;
    joining_period_action: string;
    joining_period_registration_date: string;
}


export interface Education {
    education_id: string;
    education_name: string;
    education_name_arabic: string;
    education_years: string;
    education_years_arabic: string;
    education_action: string;
    education_registration_date: string;
}

export interface EducationField {
    education_field_id: string;
    education_field_name: string;
    education_field_name_arabic: string;
    sector_id: string;
    education_field_action: string;
    education_field_registration_date: string;
}

export interface TechnicalSkill {
    technical_skills_id: string;
    technical_skills_name: string;
    technical_skills_category: string;
    technical_skills_action: string;
    technical_skills_registration_date: string;
}


export interface SoftSkill {
    soft_skills_id: string;
    soft_skills_name: string;
    soft_skills_name_arabic: string;
    soft_skills_action: string;
    soft_skills_registration_date: string;
}


export interface Responsibility {
    job_responsibility_id: string;
    job_position_id: string;
    job_level_id: string;
    job_responsibility_description: string;
    job_responsibility_description_arabic: string;
    job_responsibility_action: string;
    job_responsibility_registration_date: string;
}

export interface Benefits {
    job_benefit_id: string;
    job_position_id: string;
    job_level_id: string;
    job_benefit_description: string;
    job_benefit_description_arabic: string;
    job_benefit_action: string;
    job_benefit_registration_date: string;
}

export interface Location {
    location_id: string;
    location_name: string;
    location_name_arabic: string;
    location_action: string;
    location_registration_date: string;
}


export interface JobPostRegisterData {
    location_id: string;
    location_name: string;
    location_name_arabic: string;
    location_action: string;
    location_registration_date: string;
}

