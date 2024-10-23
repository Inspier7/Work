import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './create-user.dto'; 
import { User } from './user.entity'; // Импортируйте вашу сущность User
@Injectable()
export class AuthService {
    private users: User[] = []; // Пример списка пользователей, замените на вашу логику хранения

    constructor(private jwtService: JwtService) {}

    async register(createUserDto: CreateUserDto) {
        const existingUser = this.users.find(user => user.username === createUserDto.username);
        if (existingUser) {
            throw new ConflictException('Логин занят'); // Возвращаем ошибку, если логин занят
        }

        const newUser: User = { ...createUserDto }; // Создаем нового пользователя
        this.users.push(newUser); // Сохраняем пользователя
        return newUser;
    }

    async login(createUserDto: CreateUserDto) {
        const user = this.users.find(user => user.username === createUserDto.username);
        if (!user || user.password !== createUserDto.password) {
            throw new UnauthorizedException('Логин/Пароль не правильный'); // Возвращаем ошибку, если неверные данные
        }

        const token = this.jwtService.sign({ username: user.username }); // Генерация токена
        return { token };
    }

    async getUsers() {
        return this.users; // Возвращаем список пользователей
    }
}
