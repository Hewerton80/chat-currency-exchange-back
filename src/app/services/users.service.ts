import { compare } from "bcrypt"
import { getCustomRepository, Repository } from "typeorm"
import { exchangeRatesApi } from "../../apis/exchangeRatesApi"
import { User } from "../models/Users.model"
import { UsersRepository } from "../repositories/users.repository"
import { IUserUptate } from "../types/UserType"

class UsersService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
    }

    // async convertCurrency(userId: string, amount: string, code?: string) {
    //     const user = await this.getUserById(userId);
    // }

    async deposit(id: string, montant: number, currencyCode: string) {

        const user = await this.getUserById(id) as User;
        const response = await exchangeRatesApi.get('/latest');

        const rateDefaultCurrency = response.data.rates[user?.default_currency.trim()] as number;
        const rate = response.data.rates[currencyCode.trim()] as number;
        console.log(rateDefaultCurrency, rate);
        // console.log(response.data);

        user.balance += (rateDefaultCurrency * montant) / rate;
        await user.save();
        const balance = new Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(user.balance);
        return balance;
    }
    async getUserById(id: string) {
        return this.usersRepository.createQueryBuilder('user')
            .andWhere('user.id = :id', { id })
            .getOne();
    }

    async getUserByEmail(email: string) {
        return this.usersRepository.createQueryBuilder('user')
            .andWhere('user.email = :email', { email })
            .getOne();
    }

    async updateDefaultCurrencyUser(id: string, default_currency: string) {
        await this.usersRepository.update(id, { default_currency });
    }

    async comparePassword(password: string, encrypted: string) {
        return compare(password, encrypted);
    }
}

export { UsersService }