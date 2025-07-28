import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom Conflict Exception with a consistent response structure.
 * @param {String} message The error message to be sent to the client.
 * @param {Object} data Optional additional data related to the error (default is null).
 */

export class CustomConflictException extends HttpException {
  constructor(message: string, data: any = null) {
    super(
      {
        success: false,
        message,
        data,
        status: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT,
    );
  }
}

/**
 * Custom BadRequest Exception with a consistent response structure.
 * @param {String} message The error message to be sent to the client.
 * @param {Object} data Optional additional data related to the error (default is null).
 */
export class CustomBadRequestException extends HttpException {
  constructor(message: string, data: any = null) {
    super(
      {
        success: false,
        message,
        data,
        status: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Custom NotFound Exception with a consistent response structure.
 * @param {String} message The error message to be sent to the client.
 * @param {Object} data Optional additional data related to the error (default is null).
 */
export class CustomNotFoundException extends HttpException {
  constructor(message: string, data: any = null) {
    super(
      {
        success: false,
        message,
        data,
        status: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

/**
 * Custom Forbidden Exception with a consistent response structure.
 * @param {String} message The error message to be sent to the client.
 * @param {Object} data Optional additional data related to the error (default is null).
 */
export class CustomForbiddenException extends HttpException {
  constructor(message: string, data: any = null) {
    super(
      {
        success: false,
        message,
        data,
        status: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

/**
 * Custom Unauthorized Exception with a consistent response structure.
 * @param {String} message The error message to be sent to the client.
 * @param {Object} data Optional additional data related to the error (default is null).
 */
export class CustomUnauthorizedException extends HttpException {
  constructor(message: string, data: any = null) {
    super(
      {
        success: false,
        message,
        data,
        status: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * Custom Ok Exception with a consistent response structure.
 * @param {String} message The  message to be sent to the client.
 * @param {Object} data Optional additional data to be sent on client (default is null).
 */
export class CustomOKException extends HttpException {
  constructor(message: string, data: any = null) {
    super(
      {
        success: true,
        message,
        data,
        status: HttpStatus.OK,
      },
      HttpStatus.OK,
    );
  }
}
