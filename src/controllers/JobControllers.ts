import {
  Body,
  Get,
  Path,
  Post,
  Query,
  Route,
  Put,
  Delete,
} from "tsoa";

import JobService from '../services/JobService'
import { BaseController } from './BaseController'
import { IJobUpdateParams, IJobCreationParams, ICommonResponse } from '../types/Job'
import { HttpResponseCode } from '../constants/http_response'

@Route("jobs")
export class UsersController extends BaseController {
  jobService: JobService;
  constructor() {
    super();
    this.jobService = new JobService();
  }

  @Get("{jobId}")
  async getJob(
    @Path() jobId: number,
  ): Promise<ICommonResponse> {
    try {
      const job = await this.jobService.findById(jobId);
      if (!job) return this.handleResponse(null, HttpResponseCode.HTTP_BAD_REQUEST, "Job not found");

      return this.handleResponse(job, HttpResponseCode.HTTP_OK);
    } catch (error: any) {
      return this.handleResponse(null, HttpResponseCode.HTTP_INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get("")
  async getListJob(
    @Query() page?: any
  ): Promise<ICommonResponse> {
    try {
      const jobs = await this.jobService.list(page?.number, page?.size);
      return this.handleResponse(jobs, HttpResponseCode.HTTP_OK);
    } catch (error: any) {
      return this.handleResponse(null, HttpResponseCode.HTTP_INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Post("")
  async create(
    @Body() requestBody: IJobCreationParams
  ): Promise<ICommonResponse> {
    try {
      const job = await this.jobService.create(requestBody);
      return this.handleResponse(job, HttpResponseCode.HTTP_OK);
    } catch (error: any) {
      return this.handleResponse(null, HttpResponseCode.HTTP_INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Put("{jobId}")
  async update(
    @Path() jobId: number,
    @Body() requestBody: IJobUpdateParams
  ): Promise<ICommonResponse> {
    try {
      const job = await this.jobService.update(jobId, requestBody);
      if (!job) return this.handleResponse(null, HttpResponseCode.HTTP_BAD_REQUEST, "Job not found");

      return this.handleResponse(job, HttpResponseCode.HTTP_OK);
    } catch (error: any) {
      return this.handleResponse(null, HttpResponseCode.HTTP_INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Delete("{jobId}")
  async delete(
    @Path() jobId: number,
  ): Promise<ICommonResponse> {
    try {
      const job = await this.jobService.delete(jobId);
      if (!job) return this.handleResponse(null, HttpResponseCode.HTTP_BAD_REQUEST, "Job not found");

      return this.handleResponse(job, HttpResponseCode.HTTP_OK);
    } catch (error: any) {
      return this.handleResponse(null, HttpResponseCode.HTTP_INTERNAL_SERVER_ERROR, error.message);
    }
  }


}

