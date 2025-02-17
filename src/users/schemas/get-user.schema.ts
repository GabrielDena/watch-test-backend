import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GetUserSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
} as const satisfies JSONSchema;

export type GetUserDto = FromSchema<typeof GetUserSchema>;