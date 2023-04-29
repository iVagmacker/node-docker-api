import UniqueEntityId from "../value-objects/unique-entity-id";
import Entity from "./entity";
import { validate as uuidValidate } from 'uuid';

class StubEntity extends Entity<{prop1: string; prop2: number}> {}

describe('Entity Unit Tests', () => {
    const arrange = { prop1: 'prop1 value', prop2: 10 };
    let entity = new StubEntity(arrange);
    const uniqueEntityId = new UniqueEntityId();
    it('shoud set props and id', () => {
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect(uuidValidate(entity.id)).toBeTruthy();
    });

    it('should accept a valid uuid', () => {
        entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.getValue());
    });

    it('should convert a entity to a Javascript Object', () => {
        entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange
        });
    });
});