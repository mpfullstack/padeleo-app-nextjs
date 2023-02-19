export type ResponseData<T> = {
  success: boolean;
  error?: any;
  result?: T;
};
