import getContactModel from '../models/Contacts';
import { Request, Response, NextFunction } from 'express';

async function deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
        const phone = Number(res.locals.phone);

        const Contact = await getContactModel();

        const deletedContacts = await Contact.findAll({ where: { phone } });
        await Contact.destroy({
            where: {
                phone
            }
        });

        res.json(deletedContacts);
    } catch (err) {
        await next(err);
    }
}

export default deleteContact;