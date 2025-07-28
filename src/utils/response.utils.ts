import { Response } from '@/common/interfaces';

/**
 * Creates a response object with the success, message, and data fields.
 * @param message The error message to be sent to the client.
 * @param data Optional additional data related to the error (default is null).
 * @returns An object with `success`, `message`, and `data` fields.
 */
export const createResponse = <T = null>(
  message: string,
  data: T,
): Response<T> => {
  return {
    success: true,
    message,
    data,
  };
};
