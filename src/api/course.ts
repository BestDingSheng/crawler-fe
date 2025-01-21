import axios from './axios';
import type { CourseQueryParams, CourseListResponse, CourseDetailResponse } from '../types/course';

export const getCourseList = async (params: CourseQueryParams = {}): Promise<CourseListResponse> => {
  return axios.get('/courses', { params });
};

export const getCourseDetail = async (pageId: number): Promise<CourseDetailResponse> => {
  return axios.get(`/courses/${pageId}`);
}; 