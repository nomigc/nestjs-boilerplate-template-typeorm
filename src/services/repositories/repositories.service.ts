import { Injectable } from '@nestjs/common';
import {
  Repository,
  FindOptionsWhere,
  ObjectLiteral,
  DeepPartial,
} from 'typeorm';
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

  async findById(id: string): Promise<T | null> {
    return await this.repository.findOne({ where: { id: id as any } });
  }

  async updateQuery(id: string, dto: Partial<T>): Promise<T | null> {
    await this.repository.update(id, dto);
    return await this.findById(id);
  }

  async delete(id: string): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) return null;
    await this.repository.remove(entity);
    return entity;
  }

  async exists(filter: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({ where: filter });
    return count > 0;
  }
}
