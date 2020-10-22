export class User {
    username: string;
    userrole: string;
}

export class Login {
    username: string;
    password: string;
}

export class AddEditUser {
    username: string;
    password: string;
    name: string;
    phone: number;
    address: string;
    age: number;
    id?: number;
}

export class EditUser {
    username: string;
    password: string;
    name: string;
    phone: number;
    address: string;
    id: number;
    age: number;
}

export class EditProfile {
    password: string;
    name: string;
    phone: number;
    address: string;
    id: number;
    age: number;
}

export class UserResponse {
    address: string;
    age: number;
    id: number;
    name: string;
    password: string;
    phone: number;
    username: string;
    userrole: string;
}

export class LoginResponse {
    token: string;
    user: {
        username: string;
        userrole: string;
        id: number
    };
}

export class SuccessResponse {
    result: string;
}
