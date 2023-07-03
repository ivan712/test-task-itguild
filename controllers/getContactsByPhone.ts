import getContactModel from '../models/Contacts';
import { Request, Response, NextFunction } from 'express'

async function getContactsByPhoneNumber(req: Request, res: Response, next: NextFunction) {
    try {
        const phone: number = res.locals.phone;

        const Contact = await getContactModel();
        const contactsByPhone = await Contact.findAll({ where: { phone } });;

        res.json(contactsByPhone);
    } catch (err) {
        await next(err);
    }
}

export default getContactsByPhoneNumber;
