import { Request, Response } from 'express'
import { AuthService } from '../../services/auth.service'

export class AuthController {

    async verifyEmail(request: Request, response: Response) {
        const authService = new AuthService();
        const { email } = request.body;
        const message = await authService.verifyEmail(email);
        return response.status(200).json({ message });
    }
    async signIn(request: Request, response: Response) {
        const authService = new AuthService();
        const { email, password } = request.body;
        const userWithToken = await authService.signIn(email, password);
        return response.status(200).json(userWithToken);
    }

    async signUp(request: Request, response: Response) {
        const authService = new AuthService();
        const { name, email, password, default_currency } = request.body;
        const userWithToken = await authService.signUp(name, email, password, default_currency);
        return response.status(200).json(userWithToken);
    }

}