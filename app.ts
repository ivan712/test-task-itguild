import express, { Express, Request, Response, NextFunction } from 'express';
import validateItems from './libs/validateItems';
import validatePhone from './libs/validatePhone';
import addContacts from './controllers/addContacts';
import deleteContact from './controllers/deleteContact';
import getContactsByPhoneNumber from './controllers/getContactsByPhone';
import getAllContacts from './controllers/getAllContacts';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger/openapi.json';

const app: Express = express();
app.use(express.json());

app.post('/addcontacts', validateItems, addContacts);
app.get('/getallcontacts', getAllContacts);
app.get('/getcontactsbyphone', validatePhone, getContactsByPhoneNumber);
app.delete('/deletecontact', validatePhone, deleteContact);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: `${req.method} ${req.originalUrl} not found` })
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Internal Server Error" })
});

export default app;