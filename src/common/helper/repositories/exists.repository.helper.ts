import { BaseRepositoriesService } from '@/services/repositories/repositories.service';
import { CustomConflictException } from '@/utils';
import { Repository, Not, ObjectLiteral } from 'typeorm';

/**
 * To check if a value already exists in the database.
 * @param fieldValue The value to be checked.
 * @param fieldName The field in the database to match against.
 * @param typeormRepository The TypeORM repository to query.
 * @param id If passed, the current entity (by ID) will be excluded.
 * @returns Throws an error if the value already exists.
 */
export const existsRepositoryHelper = async <T extends ObjectLiteral>(
  fieldValue: any,
  fieldName: keyof T,
  typeormRepository: Repository<T>,
  id?: number | string,
): Promise<void> => {
  // Dynamically build filter
  const filter: Record<string, any> = {
    [fieldName]: fieldValue,
  };

  if (id) {
    filter.id = Not(id); // Exclude current record by ID
  }

  const repo = new BaseRepositoriesService<T>(typeormRepository);

  const exists = await repo.exists(filter);

  if (exists) {
    throw new CustomConflictException(`${fieldValue} already exists`);
  }
};
