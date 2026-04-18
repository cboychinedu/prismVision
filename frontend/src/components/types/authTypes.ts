// Setting the alert Type
type alertType = {
    show: boolean;
    message: string;
    type: string;
}

// Setting the registration type 
type registerType = {
    fullname: string;
    email: string;
    password: string;
}

// Setting the login type  
type loginType = {
    email: string;
    password: string;
}

// Exporting the types 
export type {
    alertType,
    registerType,
    loginType
}