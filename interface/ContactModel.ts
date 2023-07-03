import { Item } from '../interface/Item';
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

interface ContactModel extends Model<InferAttributes<ContactModel>, InferCreationAttributes<ContactModel>>, Item {
    sourceId: number,
    createdAt: Date
};

export { ContactModel };