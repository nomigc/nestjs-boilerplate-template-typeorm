import { BaseRepositoriesService } from '@/services/repositories/repositories.service';
import { CustomNotFoundException } from '@/utils';

import { Repository, FindOptionsWhere, ILike, ObjectLiteral } from 'typeorm';

/**
 * To get all records with pagination, search, and filters.
 * @param page Page number (as string).
 * @param limit Items per page (as string).
 * @param typeOrmRepository TypeORM repository for the entity.
 * @param MODEL Model name for dynamic error messages.
 * @param search Optional search value.
 * @param searchField Optional field to search in.
 * @param filters Optional filters (object).
 * @param relations Optional relations (array of strings).
 * @param selectedFields Optional fields to select (array of strings).
 * @returns Paginated results and metadata.
 */
export const findAllRepositoryHelper = async <T extends ObjectLiteral>(
  page: string,
  limit: string,
  typeOrmRepository: Repository<T>,
  MODEL: string,
  search?: string,
  searchField?: keyof T,
  filters: FindOptionsWhere<T> = {},
  relations: string[] = [],
  selectedFields?: any,
) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const repo = new BaseRepositoriesService<T>(typeOrmRepository);

  const [items, totalItems] = await repo.findWithPagination(
    skip,
    limitNumber,
    filters,
    search,
    searchField,
    relations,
    selectedFields,
  );

  if (items.length === 0) {
    throw new CustomNotFoundException(`${MODEL} not found`);
  }

  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    items,
    totalItems,
    totalPages,
    itemsPerPage: limitNumber,
    currentPage: pageNumber,
  };
};
