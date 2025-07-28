import { BaseRepositoriesService } from '@/services/repositories/repositories.service';
import {
  CustomBadRequestException,
  CustomNotFoundException,
  isValidNumberId,
} from '@/utils';
import { ObjectLiteral, Repository } from 'typeorm';

/**
 * To get a single entity from the database.
 * @param id - ID of the entity to fetch.
 * @param MODEL - Model name for error messages.
 * @param repository - TypeORM Repository for the entity.
 * @returns The found entity or throws if not found.
 */
export const getSingleRepositoryHelper = async <T extends ObjectLiteral>(
  id: string,
  MODEL: string,
  repository: Repository<T>,
): Promise<T> => {
  if (!isValidNumberId(id)) {
    throw new CustomBadRequestException('Id is not valid');
  }

  const repo = new BaseRepositoriesService<T>(repository);

  const entity = await repo.findById(id);
  if (!entity) {
    throw new CustomNotFoundException(`${MODEL} not found`);
  }

  return entity;
};
