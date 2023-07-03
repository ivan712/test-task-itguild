import { validateItem } from './validator';
import { Item } from '../interface/Item';
import { invalidItem } from '../interface/invalidItem';
import { Request, Response, NextFunction } from 'express'
import { standartisePhone } from '../libs/validator'

async function validateItems(req: Request, res: Response, next: NextFunction) {
    try {
    const items: Item[] = req.body.items;
    const sourceId = req.body.source_id;

    let invalidItems: invalidItem[] = [];
    let validItems: Item[] = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let errors: string[] = await validateItem(item, sourceId);
        if (errors.length !== 0) {
            invalidItems.push({
                item,
                errors
            })
        } else {
            item.phone = standartisePhone(item.phone);
            validItems.push(item);
        }
    }

    res.locals.validItems = validItems;
    res.locals.invalidItems = invalidItems;

    await next();
} catch(err) {
    await next(err)
}
}

export default validateItems;