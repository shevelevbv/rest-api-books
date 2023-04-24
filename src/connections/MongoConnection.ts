import { DataSource } from 'typeorm';
import Book from '../entities/Book';
import { MONGODB_URI } from '../utils/config';
import User from '../entities/User';

const AppDataSource = new DataSource({
    url: MONGODB_URI,
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'Books',
    // username: 'root',
    // password: 'password',
    logging: true,
    synchronize: true,
    entities: [Book, User],
    useUnifiedTopology: true,
});

AppDataSource.initialize();

export default AppDataSource;
