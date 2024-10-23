import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return { message: 'Вы успешно вошли', token }; // Возвращаем сообщение и токен
}


    @Get('users')
    getAllUsers() {
        return this.authService.getUsers(); // Возвращаем всех пользователей
    }
}
