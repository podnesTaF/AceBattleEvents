import { IUser } from "@/src/entities/User";
import { Progress } from "@/src/shared/ui/progress";
import { calculateSettingsProgress } from "./calculate-settings-progress.util";

export const SettingProgress = ({ user }: { user: IUser }): JSX.Element => {
  const progress = calculateSettingsProgress(user);

  return (
    <div>
      <h3 className="text-2xl text-right mb-2 font-semibold">
        {progress.value.toFixed(0)} % completed
      </h3>
      <Progress value={progress.value} color="success" className="w-full" />
    </div>
  );
};
