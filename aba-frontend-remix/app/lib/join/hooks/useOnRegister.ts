import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { JoinFormValues } from "~/lib/auth/utils/join-schema";
import { CreateUserDto, IRole, RunnerCategory } from "~/lib/types";
import { getResultIsMs } from "~/lib/utils";

export const useOnRegister = (roles: IRole[]) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (dto: JoinFormValues) => {
    setIsLoading(true);
    const data: CreateUserDto = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      countryId: dto.countryId,
      city: dto.city,
      emailConfirmed: dto.emailConfirmed,
      roleIds: dto.roles || [],
      password: dto.password,
    };

    if (dto.roles?.includes(3)) {
      data.runner = {
        dateOfBirth: dto.dateOfBirth,
        category: dto.category as RunnerCategory,
        genderId: dto.genderId,
        bestResults: [
          ...(dto.personalBests || []),
          ...(dto.seasonBests || []),
        ].map((result) => ({
          distanceId: result.distanceId,
          timeInMs: getResultIsMs(result.result),
          type: "pb",
        })),
      };
    }

    try {
      const { checkoutUrl } = await Api().users.registerUser(data);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
};
