import { useTranslation } from "react-i18next";

export const useRaceTabs = () => {
  const { t } = useTranslation();
  return [t("event.overview"), t("event.mileRunners"), "Pacer-Joker"];
};
