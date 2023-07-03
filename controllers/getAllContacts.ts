import getContactModel from '../models/Contacts';
import { Request, Response, NextFunction } from 'express';

async function getAllContacts(req: Request, res: Response, next: NextFunction) {
    try {
        const Contact = await getContactModel();
        const allContacts = await Contact.findAll();

        res.json(allContacts)
    } catch (err) {
        await next(err);
    }
}

export default getAllContacts;