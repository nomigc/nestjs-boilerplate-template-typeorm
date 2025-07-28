import { BaseRepositoriesService } from '@/services/repositories/repositories.service';
import { CustomBadRequestException } from '@/utils';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

/**
 * To create a new entity in the database.
 * @param dto - Data Transfer Object to create the entity.
 * @param MODEL - Model name for dynamic error messages.
 * @param repository - Instance of BaseRepositoriesService for the entity.
 * @returns Created entity.
 */
export const createRepositoryHelper = async <T extends ObjectLiteral>(
  dto: DeepPartial<T>,
  MODEL: string,
  repository: Repository<T>,
): Promise<T> => {
  if (!dto || Object.keys(dto).length === 0) {
    throw new CustomBadRequestException(`No data provided to create ${MODEL}`);
  }
  const repo = new BaseRepositoriesService<T>(repository);

  const createdEntity = await repo.create(dto);
  if (!createdEntity) {
    throw new CustomBadRequestException(`Failed to create ${MODEL}`);
  }

  return createdEntity;
};
