export interface JwtResponseI {
  status: boolean,
  Resp: {
    errorCode: string,
    message: string,
    data: {
      token: string
    }
  }
}
