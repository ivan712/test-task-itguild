import { Sequelize, DataTypes } from 'sequelize';
import { ContactModel } from '../interface/ContactModel';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

const Contact = sequelize.define<ContactModel>('Contact', {
  sourceId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  email: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},
  {
    indexes: [
      {
        fields: ['phone'],
      },
    ],
  },
);

const getContactModel = async () => {
  await Contact.sync();
  return Contact;
};

export default getContactModel;


