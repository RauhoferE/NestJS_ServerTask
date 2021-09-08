import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// The Guard for the JSON webtoken.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}