import { useTranslation } from "react-i18next";

export const useTranslatedTabs = (tabs: string[]) => {
  const { t } = useTranslation();
  return tabs.map((tab) => t(tab));
};
