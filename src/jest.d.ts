import { FieldErrors } from "./@seedwork/validators/validator-fields-interface";

declare global {
    // Irá sobrescrever definicoes do jest
    namespace jest{
        interface Matchers<R> {
            containsErrorMessages: (expected: FieldErrors) => R
        }
    }
}

export {};