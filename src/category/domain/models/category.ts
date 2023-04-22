export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category {
  constructor(public readonly props: CategoryProperties) {
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