import { getCustomRepository, Repository } from "typeorm"
import { sign } from 'jsonwebtoken';
import { User } from "../models/Users.model"
import { hash } from 'bcrypt';
import { UsersRepository } from "../repositories/users.repository"
import { IJwt } from "../types/AuthTypes"
import { UsersService } from "./users.service"
import { BadRequestException, ConflictException } from "../../config/errors";

export class AuthService {
    userService: UsersService;

    constructor() {
        this.userService = new UsersService();
    }

    async verifyEmail(email: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user) {
            throw new BadRequestException('email não existe');
        }
        return { ok: true };
    }

    async signIn(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if(!user){
            throw new BadRequestException('credenciais inválidas')
        }
        const passwordMatche = await this.userService.comparePassword(password, String(user.password) ) 
        if (!passwordMatche) {
            throw new BadRequestException('credenciais inválidas')
        }      
        const token = this.generateToken({ id: user.id, name: user.name, email });
        delete user.password;
        return {
            user,
            token
        }
    }

    async signUp(name: string, email: string, password: string, default_currency: string) {

        const user = new User();
        user.name = name;
        user.email = email;
        user.default_currency = default_currency;
        user.password = await hash(password, 10);
        try {
            await user.save(); 
        }
        catch(err){
            throw new BadRequestException('opsss')
        }        
        const token = this.generateToken({ id: user.id, name, email });
        delete user.password;

        return {
            user,
            token
        }
    }

    generateToken({ id, name, email }: IJwt) {
        return sign({ id, name, email }, String(process.env.TOKEN_SECRET), { expiresIn: "7d" });
    }


}