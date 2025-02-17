import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const UpdateUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
    },
} as const satisfies JSONSchema;

export type UpdateUserDto = FromSchema<typeof UpdateUserSchema>;