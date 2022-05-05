export interface ILoginRequest {
    route: string;
    data: IDataRequest;
}

interface IDataRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export interface ICreateUser {
    route: string;
    data: IDataUserRequest;
}

interface IDataUserRequest {
    name: string;
    job: string;
}