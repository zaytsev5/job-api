import { IJobUpdateParams, IJobCreationParams } from '../types/Job'

const Job = require("../models").Job;

export default class JobService {
  async create(jobData: IJobCreationParams) {
    return await Job.create(jobData);
  }

  async update(jobId: number, jobData: IJobUpdateParams) {
    const job = await Job.findByPk(jobId);
    if (job) {
      await job.update(jobData);
      return jobId;
    }

    return null;
  }

  async findById(jobId: number) {
    return await Job.findByPk(jobId);
  }

  async delete(jobId: number) {
    const job = await Job.findByPk(jobId);
    if (job) {
      await job.destroy();
      return jobId;
    }

    return null;
  }

  async list(pageNumber: number, pageSize: number) {
    let option: any = { order: [['id', 'DESC']] };
    if (pageNumber && pageSize) {
      const offset = (pageNumber - 1) * pageSize;
      option = {
        ...option,
        limit: pageSize,
        offset,
      };
    }
    const jobs = await Job.findAndCountAll(option);
    jobs.total_page = Math.ceil(jobs.count / (pageSize || jobs.count));
    jobs.current_page = +pageNumber || 1;

    return jobs;
  }
}
