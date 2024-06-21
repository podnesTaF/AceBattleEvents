"use client";

import { HeaderTabs } from "@/src/features/shared";
import { useRouter } from "next/navigation";
import React from "react";

const tabs = ["About", "Rules", "Structure"];

interface AboutPageProps {
  children: React.ReactNode;
}

const AboutLayout = ({ children, searchParams }: AboutPageProps) => {
  const router = useRouter();

  const onChangeTab = (index: number) => {
    if (index === 0) {
      router.push("/about");
    } else if (index === 1) {
      router.push("/about?tab=rules");
    } else {
      router.push("/about?tab=structure");
    }
  };

  return (
    <>
      <HeaderTabs
        title={"About Ace Battle Mile"}
        bgImage={"/outdoor-sunny.jpg"}
        tabs={tabs}
        activeTab={
          searchParams?.tab === "rules"
            ? 1
            : searchParams?.tab === "structure"
            ? 2
            : 0
        }
        onChangeTab={onChangeTab}
      />
      {children}
    </>
  );
};

export default AboutLayout;
