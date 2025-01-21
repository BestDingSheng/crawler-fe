export interface Course {
  pageId: number;
  type: string;
  title: string;
  desc: string;
  imgUrl: string;
  publishTime: string;
  link: string;
}

export interface CourseDetail extends Course {
  detailInfo: string;
  downloadLink: string;
}

export interface CourseQueryParams {
  type?: string;
  page?: number;
  pageSize?: number;
}

export interface ApiResponse<T> {
  code: number;
  message?: string;
  result?: T;
}

export interface PaginatedResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type CourseListResponse = ApiResponse<PaginatedResult<Course>>;
export type CourseDetailResponse = ApiResponse<CourseDetail>; 