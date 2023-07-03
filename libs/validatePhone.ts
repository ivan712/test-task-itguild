import { Request, Response, NextFunction } from 'express';
import { standartisePhone } from '../libs/validator';
import { validatePhoneNumber } from '../libs/validator';

async function validatePhone(req: Request, res: Response, next: NextFunction) {
    try {
        let phone: string = String(req.query.phone);
        const isPhonevalid: string = await validatePhoneNumber(phone, false);
        if (isPhonevalid !== '') {
            res.status(400).json({ message: `Невалидный номер телефона: ${phone}` })
        }

        res.locals.phone = standartisePhone(phone);

        await next();
    } catch (err) {
        await next(err);
    }
}

export default validatePhone;