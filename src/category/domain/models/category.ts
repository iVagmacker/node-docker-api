import UniqueEntityId from '../../../shared/domain/unique-entity-id';

export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category {
  public readonly id: UniqueEntityId;
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
    this.description = this.props.description;
    this.props.isActive = this.props.isActive ?? true;
    this.props.createdAt = this.props.createdAt ?? new Date();
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