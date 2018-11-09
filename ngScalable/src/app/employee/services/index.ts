import { EmployeeService } from './employee.service';
import { ParamService } from './param.service';

export const services: any[] = [EmployeeService, ParamService];

export * from './employee.service';
export * from './param.service';
