import { SubscriptionCard } from "@/src/entities/Subscription";

export const Memberships = ({ subscriptions }: { subscriptions: any }) => {
  return (
    <div className="flex flex-col gap-20">
      <div className="bg-primary relative z-10">
        <div className="absolute top-0 right-0 w-full lg:w-2/3 xl:w-1/2 h-1/2 -z-[1] bg-gradient-to-tr from-[#ff0000]/70 to-[#ff0000] rounded-bl-[250px] lg:rounded-bl-[300px] 2xl:rounded-bl-[450px] flex justify-end">
          <div className="bg-primary rounded-bl-[250px] lg:rounded-bl-[300px] 2xl:rounded-bl-[450px] w-2/3 h-2/3"></div>
        </div>
        <div className="flex flex-col items-center mt-[10%]">
          <h1 className="uppercase gradient-text-light text-3xl lg:text-5xl 2xl:text-7xl mb-6">
            Subscriptions
          </h1>
          <h3 className="text-xl md:text-2xl xl:text-3xl mb-10 gradient-text-light">
            Become a participant of ace Battle Mile Competitions
          </h3>

          <div className="py-12 flex flex-col lg:flex-row mx-4 sm:mx-6  2xl:mx-auto max-w-[1400px] justify-between gap-5">
            {subscriptions.map((subscription: any, index: number) => (
              <div
                key={subscription.id}
                className="flex-1 h-[540px] 2xl:h-[630px]"
              >
                <SubscriptionCard
                  {...subscription}
                  features={subscription.features}
                  variant={subscription.variant as any}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
