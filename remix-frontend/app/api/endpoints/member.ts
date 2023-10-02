import { AxiosInstance } from "axios";
import { CreateMemberDto } from "~/lib/user/types/IMember";

export const MemberApi = (instance: AxiosInstance) => ({
  async createMember(dto: CreateMemberDto) {
    try {
      const { data } = await instance.post("/members", dto);
      return data;
    } catch (error) {
      throw new Error("Error joining, Please repeat registration");
    }
  },
  async checkToken(token: string) {
    try {
      const { data: isValid } = await instance.get<boolean>(
        "/verify-member/check/" + token
      );
      return isValid;
    } catch (error) {
      throw new Error("Error cheking the validity of the token");
    }
  },
  async getMemberToVerify(token: string) {
    try {
      const { data: member } = await instance.get<any>(
        "/verify-member/member/" + token
      );
      return member;
    } catch (error) {}
  },
  async verify({
    member,
    token,
    ticket,
  }: {
    member: any;
    token: string;
    ticket: boolean;
  }) {
    try {
      const { data } = await instance.post("/members/verify", {
        token,
        member,
        ticket,
      });

      return data;
    } catch (error) {}
  },
});
