import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: SignInDto): Promise<ApiResponse> {
    const hash: string = await argon.hash(dto.password);
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (user) throw new ForbiddenException('Credentials taken');

      const newUser: User = await this.prisma.user.create({
        data: { email: dto.email, name: dto.name, password_hash: hash },
      });

      const { password_hash, ...formattedInfo } = newUser;

      return {
        status: 201,
        message: 'User created successfully',
        data: formattedInfo,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async login(dto: LoginDto): Promise<ApiResponse> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('User Not found');

    const passwordMatch: boolean = await argon.verify(
      user.password_hash,
      dto.password,
    );

    if (!passwordMatch) throw new ForbiddenException('Wrong password');

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      status: 200,
      message: 'User login successful',
      data: {
        access_token: await this.signToken(payload),
      },
    };
  }

  async signToken(payload: JwtPayload): Promise<string> {
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXP_TIME'),
      secret: this.config.get('JWT_SECRET_KEY'),
    });

    return token;
  }
}
