import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CategoryProperties } from "../models/category";
import ClassValidator from "../../../shared/domain/validators/class-validator";

export class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
    
    @IsDate()    
    @IsOptional()
    createdAt: Date;

    constructor({ name, description, isActive, createdAt }: CategoryProperties) {
        Object.assign(this, { name, description, isActive, createdAt });
    }
};

export class CatagoryValidator extends ClassValidator<CategoryRules> {
    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRules(data ?? {} as any));
    }
}

export default class CategoryValidatorFactory {
    static create() {
        return new CatagoryValidator();
    }
}