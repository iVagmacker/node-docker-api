import { Category } from "../../../category/domain/models/category";

export type CategoryOutput = {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    created_at: Date;
};

export class CategoryOutputMapper {
    static toOutput(entity: Category): CategoryOutput {
        return entity.toJSON();
    }
}