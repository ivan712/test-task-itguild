import { Item } from '../interface/Item';
import getContactModel from '../models/Contacts';
import { Op } from "sequelize";

async function validatePhoneNumber(phone: number | string, validateIfNumberUsed: boolean, sourceId?: number): Promise<string> {
    const numberTemplate = /^(8|\+?7)?9(\d){9}$/;
    phone = String(phone);
    
    if (!numberTemplate.test(phone))
        return `Невалидный номер телефона`;

    if (validateIfNumberUsed) {
        const Contact = await getContactModel();
        const currentDate: Date = new Date();

        let isPhoneUsed = await Contact.findOne({
            where: {
                phone: standartisePhone(phone),
                createdAt: {
                    [Op.gt]: currentDate.setHours(currentDate.getHours() - 24)
                },
                sourceId
            },
        });

        if (isPhoneUsed !== null) {
            return `Данный номер телефона был использован за последние 24 часа`;
        }
    }

    return '';
}

function validateEmail(email: string): string {
    const emailTemplate = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!emailTemplate.test(email))
        return `Невалидный email`;

    return '';
}

async function validateItem(item: Item, sourceId: number): Promise<string[]> {
    let errors: string[] = [];
    const validateEmailResult = validateEmail(item.email);
    const validatePhoneResult = await validatePhoneNumber(item.phone, true, sourceId)

    if (validateEmailResult !== '')
        errors.push(validateEmailResult);

    if (validatePhoneResult !== '')
        errors.push(validatePhoneResult);

    return errors;
}

function standartisePhone(phone: number | string): number {
    const numberPattern = /\d+/g;

    phone = String(phone);
    let phoneNumbers: string = phone.match(numberPattern)?.join('')!;
    phoneNumbers = phoneNumbers[0] == '9' ? phoneNumbers : phoneNumbers.slice(1);

    return Number(phoneNumbers);
}

export { validatePhoneNumber, validateEmail, validateItem, standartisePhone };