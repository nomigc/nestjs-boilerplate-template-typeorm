import { BaseRepositoriesService } from '@/services/repositories/repositories.service';
import {
  CustomBadRequestException,
  CustomNotFoundException,
  isValidNumberId,
} from '@/utils';
import { Repository, ObjectLiteral } from 'typeorm';

/**
 * To delete an entity from the database.
 * @param id - ID of the entity to delete.
 * @param MODEL - Model name for error messages.
 * @param repository - TypeORM Repository for the entity.
 * @returns Deleted entity or throws if not found.
 */
export const deleteRepositoryHelper = async <T extends ObjectLiteral>(
  id: string,
  MODEL: string,
  repository: Repository<T>,
): Promise<T> => {
  if (!isValidNumberId(id)) {
    throw new CustomBadRequestException('Id is not valid');
  }

  const repo = new BaseRepositoriesService<T>(repository);

  const deletedEntity = await repo.delete(id);
  if (!deletedEntity) {
    throw new CustomNotFoundException(`${MODEL} not found`);
  }

  return deletedEntity;
};
