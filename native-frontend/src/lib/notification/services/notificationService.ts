import { api } from "@lib/common/services/api";
import { CreateNotificationDto } from "../dto";
import { INotification } from "../models";

export const NotificationApi = api.injectEndpoints({
  endpoints: (build) => ({
    postUserNotification: build.mutation<
      { success: boolean },
      CreateNotificationDto
    >({
      query: (body) => ({
        url: "/notifications/user",
        method: "POST",
        body,
      }),
    }),
    getReceivedNotifications: build.query<INotification[], void>({
      query: () => ({
        url: "/notifications/received",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    getNotification: build.query<INotification, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "GET",
      }),
    }),
    getUserSentNotifications: build.query<INotification[], void>({
      query: () => ({
        url: "/notifications/sent",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    getUnreadNotificationsCount: build.query<number, void>({
      query: () => ({
        url: "/notifications/unread-count",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetReceivedNotificationsQuery,
  usePostUserNotificationMutation,
  useGetNotificationQuery,
  useGetUserSentNotificationsQuery,
  useGetUnreadNotificationsCountQuery,
} = NotificationApi;
