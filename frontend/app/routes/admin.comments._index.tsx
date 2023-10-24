import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import AdminHeader from "~/components/admin/AdminHeader";
import { FeedbackCard } from "~/components/comments";
import { adminAuthenticator } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const admin = await adminAuthenticator.isAuthenticated(request);

  if (!admin) throw new Error("Not authorized");

  const commentsData = await Api(admin?.token).feedback.getFeedbacks();

  if (!commentsData) throw new Error("No comments found");

  return json({ commentsData, admin });
};

const AdminCommentsPage = () => {
  const { commentsData, admin } = useLoaderData<typeof loader>();
  return (
    <div className="w-full">
      <AdminHeader
        description="Comments"
        title="Feedbacks"
        pageName="Admin Dashboard"
      />
      <div className="w-full max-w-6xl mx-4 xl:mx-auto my-6">
        <h2 className="text-3xl font-semibold mb-4 border-b-2 border-black">
          Manage comments
        </h2>
        <div className="flex gap-8">
          {commentsData.feedbacks.map((comment, index) => (
            <FeedbackCard
              feedback={comment}
              key={comment.id}
              index={index}
              admin={admin}
              editable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCommentsPage;
