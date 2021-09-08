
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user-information/role.enum';

// This constant is to recognize the roles metadata.
export const ROLES_KEY = 'roles';

// This method gets the roles metadata from the controller.
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);