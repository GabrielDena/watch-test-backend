import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const CreateUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
} as const satisfies JSONSchema;

export type CreateUserDto = FromSchema<typeof CreateUserSchema>;