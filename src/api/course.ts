import axios from 'axios'
import type { CourseListResponse, CourseDetailResponse, CourseParams, CourseDetailParams } from '../types/course'

const api = axios.create({
  baseURL: '/api'
})

export const getCourseList = async (params: CourseParams) => {
  const response = await api.get<CourseListResponse>('/courses', { params })
  return response.data
}

export const getCourseDetail = async ({ pageId }: CourseDetailParams) => {
  const response = await api.get<CourseDetailResponse>(`/courses/${pageId}`)
  return response.data
} 