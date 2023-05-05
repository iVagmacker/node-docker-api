import { EntityValidationError } from '../../../shared/domain/errors/validation-error';
import Entity from '../../../shared/domain/entity/entity';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id';
import CategoryValidatorFactory from '../validators/category.validators';

export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = this.props.description;
    this.props.isActive = this.props.isActive ?? true;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(name: string, description: string): void {
    Category.validate({ name, description });
    this.props.name = name;
    this.description = description;
  }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  private set isActive(value: boolean) {
    this.props.isActive = value ?? null;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}