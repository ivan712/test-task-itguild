import getContactModel from '../models/Contacts';
import { invalidItem } from '../interface/invalidItem';
import { standartisePhone } from '../libs/validator';
import { Request, Response, NextFunction } from 'express';
import { validItem } from '../interface/validItem';

async function addContacts(req: Request, res: Response, next: NextFunction) {
    try {
        const validItems: validItem[] = res.locals.validItems;
        const invalidItems: invalidItem[] = res.locals.invalidItems;
        const sourceId = req.body.source_id;

        const Contact = await getContactModel();

        const addedContacts = await Contact.bulkCreate(validItems.map(el => {
            el.phone = standartisePhone(el.phone);
            el.sourceId = sourceId;
            return el;
        }));

        res.json({ addedItemsCount: addedContacts.length, invalidItems });
    } catch (err) {
        await next(err);
    }
}

export default addContacts;