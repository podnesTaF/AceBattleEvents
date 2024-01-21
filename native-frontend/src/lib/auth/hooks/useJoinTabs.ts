import { useTranslation } from "react-i18next";

export const useJoinUserTabs = (): string[] => {
  const { t } = useTranslation();
  return [
    t("userJoinForm.personalDetails"),
    t("userJoinForm.avatarAndImage"),
    t("userJoinForm.contactAndAgreements"),
    t("userJoinForm.confirmEmail"),
  ];
};

export const useJoinRunnerTabs = (): string[] => {
  const { t } = useTranslation();
  return [
    t("runnerForm.runnerInfo"),
    t("runnerForm.personalResults"),
    t("runnerForm.personalResults"),
    t("runnerForm.manager"),
    t("runnerForm.runnerAgreements"),
    t("runnerForm.confirmation"),
  ];
};
