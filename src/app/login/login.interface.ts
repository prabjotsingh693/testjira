
export interface registrationinterface{
    firstName?:string;
    lastName?:string;
    address?:string;
    city?:string;
    area?:string;
    state?:string;
    country?:string;
    email?:string;
    phone?:number;
    username?:any;
    password?:any;

}
export interface logininterface{
    username?: string;
    email?: string;
    password?: string;
}
export interface productinterface{
    tagNumber?:number;
    productName?:string;
    serialNumber?:string;
    description?:string;
    photo?:any;
    registration?:any;

}
export interface founditeminterface{
    id?:number;
    tagNumber?: string;
    itemName?: string;
    foundBy?: string;
    description?: string;
    phone?: string;
    address?: string;
    email?: string;
     

}

export interface IF_LoginReq {
    email: string;
    password: string;
  }
  
  export interface IF_LoginRes {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    username: string;
    email: string;
    aadhar: string;
    status: boolean;
    accessToken: string;
    role: string;
    office: any;
  }
  