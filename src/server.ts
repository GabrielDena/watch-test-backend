import fastify from 'fastify';
import 'reflect-metadata';
import { initializeDatabase } from './common/database';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import userRoutes from 'users/users.routes';

const app = fastify().withTypeProvider<JsonSchemaToTsProvider>();

const startServer = async () => {
  await initializeDatabase();

  app.register(userRoutes, {prefix: '/users'});
  app.listen({ port: 3000 }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`🚀 Server running on port 3000`);
  });
};

if (require.main === module) {
  startServer();
}
