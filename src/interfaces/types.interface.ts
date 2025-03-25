export type ResponseType<T> =
  | {
      responseCode: string;
      responseDescription: string;
      data: T;
    }
  | { responseCode: string; responseDescription: string; message: string };
