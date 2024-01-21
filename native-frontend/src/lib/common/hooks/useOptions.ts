import { useTranslation } from "react-i18next";

export const useManagerOptions = (): { label: string; value: string }[] => {
  const { t } = useTranslation();

  return [
    {
      label: t("managerOptions.chooseManager"),
      value: "choose-manager",
    },
    {
      label: t("managerOptions.assignManagerBasedOnLocation"),
      value: "location-manager",
    },
    {
      label: t("managerOptions.noManager"),
      value: "no-manager",
    },
  ];
};
