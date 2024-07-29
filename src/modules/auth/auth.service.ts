import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {  email: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}