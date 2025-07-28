export interface Response<T = null> {
  success: boolean;
  message: string;
  data: T;
}
