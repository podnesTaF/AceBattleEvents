import { LoaderArgs, json } from "@remix-run/node";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { eventCode } = params;
  if (!eventCode) {
    throw new Response("Event Title is required.", {
      status: 400,
    });
  }

  return json({});
};

const EventRules = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-400">
        Rules Page in Development
      </h2>
    </div>
  );
};

export default EventRules;
