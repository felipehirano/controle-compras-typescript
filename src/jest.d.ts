import { FieldErrors } from "./@seedwork/validators/validator-fields-interface";

declare global {
    // Irá sobrescrever definicoes do jest
    declare namespace jest{
        interface Matchers<R> {
            containsErrorMessages: (expected: FieldErrors) => R
        }
    }
}

export {};