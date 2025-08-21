import { Injectable } from '@nestjs/common';
import { Repository, FindOptionsWhere, ObjectLiteral, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BaseRepositoriesService<T extends ObjectLiteral> {
  constructor(
    @InjectRepository(Object)
    private readonly repository: Repository<T>,
  ) {}

  async create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async findAll(filter: FindOptionsWhere<T> = {}): Promise<T[]> {
    return await this.repository.find({ where: filter });
  }

  async findById(id: string | number): Promise<T | null> {
    return await this.repository.findOne({ where: { id: id as any, isDeleted: false } as any });
  }

  async findByIdWithPopulate(
    id: string | number,
    relations: string[] = [],
    selectedFields?: string[],
  ): Promise<any | null> {
    const alias = this.repository.metadata.tableName;

    if (!relations?.length && !selectedFields?.length) {
      return await this.repository.findOne({
        where: { id: id as any, isDeleted: false } as any,
      });
    }

    const qb = this.repository
      .createQueryBuilder(alias)
      .where(`${alias}.id = :id`, { id })
      .andWhere(`${alias}.isDeleted = false`);

    if (relations?.length && !selectedFields?.length) {
      relations.forEach((rel) => {
        qb.leftJoinAndSelect(`${alias}.${rel}`, rel);
      });
      return await qb.getOne();
    }

    const baseEntityCols = this.repository.metadata.columns.map(
      (col) => `${alias}.${col.propertyName}`,
    );

    const relationCols: Record<string, string[]> = {};

    selectedFields?.forEach((field) => {
      const [rel, col] = field.split('.');
      if (!relationCols[rel]) {
        relationCols[rel] = [];
        qb.leftJoin(`${alias}.${rel}`, rel);
      }
      relationCols[rel].push(col);
    });

    qb.select(baseEntityCols);

    Object.keys(relationCols).forEach((rel) => {
      relationCols[rel].forEach((col) => {
        qb.addSelect(`${rel}.${col}`, `${rel}_${col}`);
      });
    });

    const raw = await qb.getRawOne();
    if (!raw) return null;

    const obj: any = {};
    this.repository.metadata.columns.forEach((col) => {
      obj[col.propertyName] = raw[`${alias}_${col.propertyName}`];
    });
    Object.keys(relationCols).forEach((rel) => {
      obj[rel] = {};
      relationCols[rel].forEach((col) => {
        obj[rel][col] = raw[`${rel}_${col}`];
      });
    });

    return obj;
  }

  async updateQuery(id: string, dto: Partial<T>): Promise<T | null> {
    await this.repository.update(id, dto);
    return await this.findById(id);
  }

  async delete(id: string): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) return null;

    await this.repository.update(id, { isDeleted: true } as any);
    return { ...entity, isDeleted: true };
  }

  async exists(filter: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({ where: filter });
    return count > 0;
  }

  async findWithPagination(
    skip: number,
    take: number,
    filters: FindOptionsWhere<T> = {},
    search?: string,
    searchField?: keyof T,
    relations: string[] = [],
    selectedFields?: string[],
  ): Promise<[any[], number]> {
    const where: FindOptionsWhere<T> = { isDeleted: false, ...filters };

    const alias = this.repository.metadata.tableName;

    if (!relations?.length && !selectedFields?.length) {
      return await this.repository.findAndCount({
        where,
        skip,
        take,
        order: { createdAt: 'DESC' } as any,
      });
    }

    const qb = this.repository
      .createQueryBuilder(alias)
      .skip(skip)
      .take(take)
      .orderBy(`${alias}.createdAt`, 'DESC')
      .where(`${alias}.isDeleted = :isDeleted`, { isDeleted: false });

    if (search && searchField) {
      qb.andWhere(`${alias}.${String(searchField)} ILIKE :search`, {
        search: `%${search}%`,
      });
    }

    if (relations?.length && !selectedFields?.length) {
      relations.forEach((rel) => {
        qb.leftJoinAndSelect(`${alias}.${rel}`, rel);
      });
      return await qb.getManyAndCount();
    }

    const baseEntityCols = this.repository.metadata.columns.map(
      (col) => `${alias}.${col.propertyName}`,
    );

    const relationCols: Record<string, string[]> = {};

    selectedFields?.forEach((field) => {
      const [rel, col] = field.split('.');

      if (!relationCols[rel]) {
        relationCols[rel] = [];
        qb.leftJoin(`${alias}.${rel}`, rel);
      }
      relationCols[rel].push(col);
    });

    qb.select(baseEntityCols);

    Object.keys(relationCols).forEach((rel) => {
      relationCols[rel].forEach((col) => {
        qb.addSelect(`${rel}.${col}`, `${rel}_${col}`);
      });
    });

    const [raw, totalItems] = await Promise.all([qb.getRawMany(), qb.getCount()]);

    const items = raw.map((row) => {
      const obj: any = {};
      this.repository.metadata.columns.forEach((col) => {
        obj[col.propertyName] = row[`${alias}_${col.propertyName}`];
      });

      Object.keys(relationCols).forEach((rel) => {
        obj[rel] = {};
        relationCols[rel].forEach((col) => {
          obj[rel][col] = row[`${rel}_${col}`];
        });
      });

      return obj;
    });

    return [items, totalItems];
  }
}
