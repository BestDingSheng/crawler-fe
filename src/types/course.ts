export interface Course {
  pageId: number;
  title: string;
  imgUrl: string;
  desc: string;
  type: string;
}

export interface CourseDetail {
  pageId: number;
  title: string;
  imgUrl: string;
  desc: string;
  detailInfo: string;
  downloadInfo?: {
    link: string;
    password: string;
  };
}

export interface CourseParams {
  type: string;
}

export interface CourseDetailParams {
  pageId: number;
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