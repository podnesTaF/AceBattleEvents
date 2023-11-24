import { api } from "@lib/common/services/api";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { INotification } from "../models";

export const NotificationApi = api.injectEndpoints({
  endpoints: (build) => ({
    postUserNotification: build.mutation<INotification, CreateNotificationDto>({
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
  }),
});

export const {
  useGetReceivedNotificationsQuery,
  usePostUserNotificationMutation,
  useGetNotificationQuery,
} = NotificationApi;
