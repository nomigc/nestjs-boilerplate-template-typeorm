import { randomInt } from 'crypto';

/**
 * Checks if the given ID is a valid number.
 * @param {number} id - ID value from client.
 * @returns {boolean} True if valid number ID.
 */
export const isValidNumberId = (id: any): boolean => {
  return !isNaN(Number(id)) && Number(id) > 0;
};

/**
 * Return true if given parameter is Array.
 * @param {Array} arr array to check.
 */
export const checkArray = (arr: any[]) => {
  Array.isArray(arr);
};

/**
 * Generate random 6 digit OTP
 * @returns {string} OTP
 */
export const generateOtp = (): string => {
  const otp = randomInt(100000, 999999).toString();
  return otp;
};
