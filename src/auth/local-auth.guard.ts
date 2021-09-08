
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// The guard for the user login.
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
