import { Item } from './Item';

interface validItem extends Item {
    sourceId: number;
    createdAt: Date;
}

export { validItem };