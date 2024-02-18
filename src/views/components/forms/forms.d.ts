// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSchema, StringSchemaConstructor } from 'yup'
declare module "yup" {
    interface StringSchema{
        cpf(): StringSchema;
    }
}
export const string : StringSchemaConstructor;

declare module "yup" {
    interface StringSchema{
        nome():StringSchema;
    }
}