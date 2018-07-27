export class LoginModel {
  username: string;
  password: string;
  remember_me?: boolean;
}

export class LoginResponseModel {
  token: string;
  token_type: string;
  expired_at: string;
}
