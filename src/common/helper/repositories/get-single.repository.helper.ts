import { BaseRepositoriesService } from '@/services/repositories/repositories.service';
import { CustomBadRequestException, CustomNotFoundException, isValidNumberId } from '@/utils';
import { ObjectLiteral, Repository } from 'typeorm';

/**
 * To get a single entity from the database.
 * @param id - ID of the entity to fetch.
 * @param MODEL - Model name for error messages.
 * @param typeormRepository - TypeORM Repository for the entity.
 * @param relations - Optional relations to include in the query.
 * @param selectedFields - Optional fields to select in the query.
 * @returns The found entity or throws if not found.
 */
export const findOneRepositoryHelper = async <T extends ObjectLiteral>(
  id: string | number,
  MODEL: string,
  typeormRepository: Repository<T>,
  relations: string[] = [],
  selectedFields?: string[],
): Promise<T> => {
  if (!isValidNumberId(id)) {
    throw new CustomBadRequestException('Id is not valid');
  }

  const repo = new BaseRepositoriesService<T>(typeormRepository);

  const entity = await repo.findByIdWithPopulate(id, relations, selectedFields);
  if (!entity) {
    throw new CustomNotFoundException(`${MODEL} not found`);
  }

  return entity;
};
