import { Request, Response } from 'express'
import { UsersService } from '../../services/users.service'

export class UsersController {
    async getBalance(request: Request, response: Response) {
        const userService = new UsersService();
        const id = request.user.id;
        const user = await userService.getUserById(id);
        return response.status(200).json({ balance: user?.balance });
    }
    async deposit(request: Request, response: Response) {
        const userService = new UsersService();
        const { montant, currencyCode } = request.body;
        const id = request.user.id;
        const balance = await userService.deposit(id, montant, currencyCode );
        return response.status(200).json({ balance });
    }
    async updateDefaultCurrencyUser(request: Request, response: Response) {
        const userService = new UsersService();
        const { default_currency } = request.body;
        const id = request.user.id;
        await userService.updateDefaultCurrencyUser(id, default_currency);
        return response.status(200).json({ message: 'ok' });
    }
}