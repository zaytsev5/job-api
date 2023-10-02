export interface IJob {
  id: number;
  title: string;
  description: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
}

export interface IJobUpdateParams {
  title?: string;
  description?: string;
  expiry_date?: string;
}

export interface IJobCreationParams {
  title: string;
  description: string;
  expiry_date: string;
}

export interface ICommonResponse {
  data?: any;
  status?: boolean;
  message?: string;
}
