'use strict';

import { Controller } from 'tsoa';

export class BaseController extends Controller {
  // handle response for create, update, delete
  handleResponse(data: any, statusCode: number, message?: string) {
    this.setStatus(statusCode);

    if (statusCode >= 400)
    return { data, status: false, message }

    return { data, status: true };
  }
}