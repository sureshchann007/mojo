export class User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    enabled:any;
    role:String;
    phoneNumber:String;
    token?: string;
}

export interface ListUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    enabled:any;
    role:String;
    phoneNumber:String;
}