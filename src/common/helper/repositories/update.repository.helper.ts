import { BaseRepositoriesService } from '@/services/repositories/repositories.service';
import {
  CustomBadRequestException,
  CustomNotFoundException,
  isValidNumberId,
} from '@/utils';
import { ObjectLiteral, Repository } from 'typeorm';

/**
 * To update an existing entity in the database.
 * @param id - ID of the entity to update.
 * @param updateDto - Data Transfer Object with updates.
 * @param MODEL - Model name for dynamic error messages.
 * @param typeormRepository - TypeORM repository for the entity.
 * @returns Updated entity.
 */
export const updateRepositoryHelper = async <T extends ObjectLiteral>(
  id: string,
  updateDto: Partial<T>,
  MODEL: string,
  typeormRepository: Repository<T>,
): Promise<T> => {
  if (!isValidNumberId(id)) {
    throw new CustomBadRequestException('Id is not valid');
  }

  if (!updateDto || Object.keys(updateDto).length === 0) {
    throw new CustomBadRequestException(`No data provided to update ${MODEL}`);
  }

  const repo = new BaseRepositoriesService<T>(typeormRepository);

  const existing = await repo.findById(id);
  if (!existing) {
    throw new CustomNotFoundException(`${MODEL} with ID ${id} not found`);
  }

  const updated = await repo.updateQuery(id, updateDto);
  if (!updated) {
    throw new CustomBadRequestException(`Failed to update ${MODEL}`);
  }

  return updated;
};
