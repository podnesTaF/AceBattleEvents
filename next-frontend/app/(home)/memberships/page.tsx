import { Memberships } from "@/src/pages/membership";

const subscriptions = [
  {
    id: 1,
    role: {
      id: 1,
      name: "Visitor",
    },
    price: 0,
    features: [
      "Stay updated with the latest Ace Battle Events",
      "Purchase tickets for the event in one click.",
      "Receive coupons for free visits",
      "Follow athletes and teams",
      "Get Started",
    ],
    variant: "dark",
  },
  {
    id: 2,
    role: {
      id: 2,
      name: "Runner",
    },
    price: 10,
    features: [
      "BECOME AN ACE BATTLE MILE Runner",
      "Participate on events",
      "Win prizes",
      "Find Team",
      "2 coupons for tickets each event",
      "Run Individual Race and obtain a rank",
    ],
    variant: "light",
  },
  {
    id: 3,
    role: {
      id: 3,
      name: "Coach",
    },
    price: 10,
    features: [
      "Create your team of Runners",
      "Visit Ace Battle Events per free",
      "Register you team for events",
      "Won real prizes",
    ],
    variant: "dark",
  },
];

const MembershipsPage = () => {
  return <Memberships subscriptions={subscriptions} />;
};

export default MembershipsPage;
