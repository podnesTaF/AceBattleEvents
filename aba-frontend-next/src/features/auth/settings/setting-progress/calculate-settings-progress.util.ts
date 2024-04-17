import { IUser } from "@/src/entities/User";

export const calculateSettingsProgress = (user: IUser) => {
  const progress = {
    value: 0,
    steps: 0,
  };

  if (user.email) {
    progress.steps += 1;
  }

  if (user.firstName && user.lastName) {
    progress.steps += 1;
  }

  if (user.avatarName) {
    progress.steps += 1;
  }

  if (user.imageName) {
    progress.steps += 1;
  }

  if (user.city) {
    progress.steps += 1;
  }

  if (user.countryId) {
    progress.steps += 1;
  }

  if (user.password) {
    progress.steps += 1;
  }

  if (user.genderId) {
    progress.steps += 1;
  }
  if (user.dateOfBirth) {
    progress.steps += 1;
  }

  progress.value = (progress.steps / 9) * 100;

  return progress;
};
