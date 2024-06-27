export interface IProfileDetails {
    avatar: string;
    fName: string;
    lName: string;
    company: string;
    contactPhone: string;
    companySite: string;
    country: string;
    language: string;
    timeZone: string;
    currency: string;
    communications: {
      email: boolean;
      phone: boolean;
    };
    allowMarketing: boolean;
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
  
  export const profileDetailsInitValues: IProfileDetails = {
    avatar: "media/avatars/broaderai_logo.jpeg",
    fName: "Yash Patel",
    lName: "Smith",
    company: "Broaderai",
    contactPhone: "95883 45412",
    companySite: "broaderai.com",
    country: "",
    language: "",
    timeZone: "",
    currency: "",
    communications: {
      email: false,
      phone: false,
    },
    allowMarketing: false,
  };
  
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
  

  export interface CompanyDetails {
    company_name: string;
    company_type: { value: string, label: string };
    company_sector: { value: string, label: string };  
    company_location: { value: string, label: string };  
    company_contact_no: string;
    company_twitter: string;
    company_facebook: string;
    company_linkedin: string;
    company_website: string;
    company_email: string;
    company_description: string;
    establish_year: {
      value: string,
      label: string
    };
    company_size: {
      value: string,
      label: string
    };
  }