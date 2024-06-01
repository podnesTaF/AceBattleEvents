import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { Check } from "lucide-react";
import { IUserRole } from "../User/model";

interface SubscriptionCardProps {
  price: number;
  features: string[];
  role: IUserRole;
  variant?: "light" | "dark";
  className?: string;
}

export const SubscriptionCard = ({
  role,
  price,
  features,
  variant = "light",
  className,
}: SubscriptionCardProps): JSX.Element => {
  return (
    <div
      className={`shadow-md rounded-sm bg-white roudned-sm py-2 w-full h-full flex flex-col px-3 ${className}`}
    >
      <Badge className="w-auto">{role.name}</Badge>
      <div className="flex-1 flex flex-col pt-16 2xl:pt-20">
        {price > 0 ? (
          <h3 className="gradient-text-dark mb-4">
            <span className="text-6xl">&euro; {price}</span> / year
          </h3>
        ) : (
          <h3 className="gradient-text-dark mb-4 text-6xl uppercase">Free</h3>
        )}

        <div className="border-b-gray-400 border-b-[1px]">
          <p className="uppercase text-primary">
            Become an Ace Battle Mile <b>{role.name}</b>
          </p>
        </div>
        <ul className="list-none flex flex-col gap-3">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-3">
              <div className="w-5 h-5 orudned-full text-gray-400 border-gray-400 flex justify-center items-center">
                <Check size={14} />
              </div>
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <Button size="lg" className="font-semibold w-full">
        Add subscription
      </Button>
    </div>
  );
};
