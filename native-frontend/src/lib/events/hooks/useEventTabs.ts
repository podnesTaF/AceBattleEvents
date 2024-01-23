import { useTranslation } from "react-i18next";

export const useEventTabs = () => {
  const { t } = useTranslation();

  return [
    t("event.participants"),
    t("event.schedule"),
    t("event.results"),
  ];
};
