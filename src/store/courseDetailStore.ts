import { create } from 'zustand'
import { getCourseDetail } from '../api/course'
import type { CourseDetail } from '../types/course'

interface CourseDetailState {
  detail: CourseDetail | null
  loading: boolean
  error: string | null
  fetchDetail: (pageId: number) => Promise<void>
}

export const useCourseDetailStore = create<CourseDetailState>((set) => ({
  detail: null,
  loading: false,
  error: null,
  fetchDetail: async (pageId: number) => {
    try {
      set({ loading: true, error: null })
      const response = await getCourseDetail({ pageId })
      if (response.code === 0 && response.result) {
        set({ detail: response.result })
      } else {
        set({ error: response.message || '获取详情失败' })
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : '获取详情失败' })
    } finally {
      set({ loading: false })
    }
  }
})) 