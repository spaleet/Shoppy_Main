export class LoginRequestModel {
    constructor(
        public email: string,
        public password: string,
        public rememberMe: boolean
    ){}
}