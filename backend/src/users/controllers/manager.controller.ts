import { Controller } from "@nestjs/common";
import { ManagerService } from "../services/manager.service";

@Controller("managers")
export class ManagerController {
  constructor(private readonly coachService: ManagerService) {}
}
