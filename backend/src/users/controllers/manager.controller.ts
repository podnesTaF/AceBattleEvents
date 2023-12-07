import { Controller, Get } from "@nestjs/common";
import { ManagerService } from "../services/manager.service";

@Controller("managers")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  async findAll() {
    return this.managerService.findAll();
  }
}
