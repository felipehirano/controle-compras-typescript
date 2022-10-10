// Imutabilidade de value objects pelo conceito do DDD.
// O freeze só funciona para o primeiro nivel do objeto {prop: 1, value: 4}, caso esteja assim:
// {prop: 1, nestedObject: {prop:4, value:5}} ele não irá funcionar.

export function deepFreeze<T>(obj: T){
    const propNames = Object.getOwnPropertyNames(obj);

    for(const name of propNames){
        const value = obj[name as keyof T];

        if(value && typeof value === 'object'){
            deepFreeze(value);
        }
    }

    return Object.freeze(obj);
}