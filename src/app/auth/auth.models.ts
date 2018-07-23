export class LoginModel {
  username: string;
  password: string;
}

export class LoginResponseModel {
  token: string;
  token_type: string;
  expired_at: string;
}
