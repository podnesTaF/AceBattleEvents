import { AxiosInstance } from "axios";
import { IFeedback } from "~/lib/types";

export const FeedbackApi = (instance: AxiosInstance) => ({
  async getFeedbacks(params?: string) {
    try {
      const { data } = await instance.get<{
        feedbacks: IFeedback[];
        totalPages: number;
      }>(`/feedbacks?${params}&limit=5`);

      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  },
  async getApprovedFeedbacks(params?: string) {
    try {
      const { data } = await instance.get<{
        feedbacks: IFeedback[];
        totalPages: number;
      }>(`/feedbacks/approved?${params}&limit=5`);

      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  },
  async createFeedback(dto: { message: string; aboutCommentator?: string }) {
    try {
      const { data } = await instance.post<IFeedback>(`/feedbacks`, dto);

      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  },

  async updateFeedback(
    dto: { message: string; aboutCommentator: string },
    id: number
  ) {
    try {
      const { data } = await instance.put<IFeedback>(`/feedbacks/${id}`, dto);
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  },

  async approveFeedback(id: number) {
    try {
      const { data } = await instance.patch<IFeedback>(
        `/feedbacks/${id}/approve`
      );
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  },

  async disapproveFeedback(id: number) {
    try {
      const { data } = await instance.patch<IFeedback>(
        `/feedbacks/${id}/disapprove`
      );
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  },
});
