import { useTranslation } from "react-i18next";

export const useTranslatedExplanations = () => {
  const { t } = useTranslation();

  return [
    t("conceptExplanations.0"),
    t("conceptExplanations.1"),
    t("conceptExplanations.2"),
    t("conceptExplanations.3"),
  ];
};

export const usePoints = () => {
  const { t } = useTranslation();

  return [t("points.0"), t("points.1"), t("points.2"), t("points.3")];
};

export const useTranslatedProvenContent = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("provenContent.0.title"),
      subtitle: t("provenContent.0.subtitle"),
    },
    {
      title: t("provenContent.1.title"),
      subtitle: t("provenContent.1.subtitle"),
    },
    {
      title: t("provenContent.2.title"),
      subtitle: t("provenContent.2.subtitle"),
    },
    {
      title: t("provenContent.3.title"),
      subtitle: t("provenContent.3.subtitle"),
    },
  ];
};

export const useMilestones = () => {
  const { t } = useTranslation();

  return [
    {
      title: "2020",
      text: t("milestones.0.text"),
    },
    {
      title: "2020-2022",
      text: t("milestones.1.text"),
    },
    {
      title: "September 23, 2023",
      text: t("milestones.2.text"),
    },
    {
      title: "Spring, 2024",
      text: t("milestones.3.text"),
    },
    {
      title: "Summer/Fall, 2024",
      text: t("milestones.4.text"),
    },
  ];
};
