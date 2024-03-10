import { auth } from "@/app/(auth)/_lib/utils/auth";
import SubscriptionCard from "@/lib/features/subscription/ui/SubscriptionCard";
import { Button } from "@/src/shared/ui/button";
import ProfileItemWrapper from "../../_components/ProfileItemWrapper";

const SubscriptionOption = {
  title: "Subscription",
  description: "Get access to all the features",
  price: 10,
  features: [
    "Participate on events",
    "Win prizes",
    "Find Team",
    "2 coupons for tickets each event",
    "Run Individual Race and obtain a ranking",
  ],
};

const MembershipPage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col w-full gap-4">
      {session?.user.roles.map((role, index) => (
        <div key={role.id} className="border-gray-300 border-[1px] shadow-sm">
          <ProfileItemWrapper>
            <h3>{role.name}</h3>
          </ProfileItemWrapper>
          <ProfileItemWrapper>
            <h4 className="text-gray-400 w-44">Since</h4>
            <h4 className="flex-1">01.05.2024</h4>
          </ProfileItemWrapper>
          <ProfileItemWrapper className="items-center">
            <h4 className="text-gray-400 flex-1">KYC</h4>
            <Button size="lg" disabled className="font-semibold">
              Verified
            </Button>
          </ProfileItemWrapper>
          <ProfileItemWrapper className="items-center">
            <h4 className="text-gray-400 w-44">Until</h4>
            <h4 className="flex-1">01.05.2025</h4>
          </ProfileItemWrapper>
          <ProfileItemWrapper>
            <Button size="lg" className="font-semibold text-lg">
              About Subscription
            </Button>
          </ProfileItemWrapper>
          <ProfileItemWrapper>
            <h4 className="text-gray-400 flex-1">
              No longer want to be a runner?
            </h4>
            <Button
              size="lg"
              variant={"destructive"}
              className="font-semibold text-lg"
            >
              Unsubscribe
            </Button>
          </ProfileItemWrapper>
        </div>
      ))}
      <div>
        <h3 className="mb-3">Other options</h3>
        <div className="w-full flex gap-5">
          <div className="w-2/5 h-[540px]">
            <SubscriptionCard
              {...SubscriptionOption}
              role={{ id: 1, name: "Runner" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
