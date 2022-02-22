type ResponseError = {
  type: 'ERROR';
  message?: string;
};

type ResponseOk<T> = {
  type: 'OK';
  data?: T;
};

export type Response<T> = ResponseOk<T> | ResponseError;

export const response =
  <T>(fn: () => T | Promise<T>) =>
  async (): Promise<Response<T>> => {
    try {
      const data = await fn();
      return {
        type: 'OK',
        data,
      };
    } catch (error) {
      return {
        type: 'ERROR',
        message: (error as Error).message,
      };
    }
  };
