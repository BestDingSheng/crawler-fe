import { create } from 'zustand';
import { StateCreator } from 'zustand';
import { getCourseList, getCourseDetail } from '../api/course';
import type { Course, CourseDetail, CourseQueryParams } from '../types/course';

interface CourseState {
  courses: Course[];
  currentCourse: CourseDetail | null;
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  // 获取课程列表
  fetchCourses: (params?: CourseQueryParams) => Promise<void>;
  // 获取课程详情
  fetchCourseDetail: (pageId: number) => Promise<void>;
  // 重置状态
  reset: () => void;
}

const createCourseStore: StateCreator<CourseState> = (set) => ({
  courses: [],
  currentCourse: null,
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  error: null,

  fetchCourses: async (params = {}) => {
    try {
      set({ loading: true, error: null });
      const response = await getCourseList(params);
      if (response.code === 0 && response.result) {
        set({
          courses: response.result.list,
          total: response.result.total,
          page: response.result.page,
          pageSize: response.result.pageSize,
        });
      } else {
        set({ error: response.message || '获取课程列表失败' });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchCourseDetail: async (pageId: number) => {
    try {
      set({ loading: true, error: null });
      const response = await getCourseDetail(pageId);
      if (response.code === 0 && response.result) {
        set({ currentCourse: response.result });
      } else {
        set({ error: response.message || '获取课程详情失败' });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({
      courses: [],
      currentCourse: null,
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      error: null,
    });
  },
});

export const useCourseStore = create<CourseState>(createCourseStore); 