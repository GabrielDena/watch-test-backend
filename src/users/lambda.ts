import awsLambdaFastify from '@fastify/aws-lambda';
import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import usersRoutes from './users.routes';
import { initializeDatabase } from '../common/database';

const app = fastify().withTypeProvider<JsonSchemaToTsProvider>();

const setupApp = async () => {
  await initializeDatabase();
  await app.register(usersRoutes, { prefix: '/users' });
};

setupApp();

export const handler = awsLambdaFastify(app);
