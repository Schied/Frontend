export interface ResStatusTokenI {
  status: boolean,
  Resp: {
    errorCode: string,
    message: string,
    data: {
      decoded: {
        dataUser: {
          cedula_usu: number,
          nombre_usu: string,
          correo_usu: string,
          nick_usu: string,
          contra_usu: string,
          tipo_usu: string
        }
      }
    }
  }
}
