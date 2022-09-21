import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  // 添加分类
  async add(userId, category: Category): Promise<number> {
    try {
      const cate = this.categoryRepository.create({
        ...category,
        user: userId
      })

      await this.categoryRepository.save(cate)
      return cate.id
    } catch (err) {
      throw err
    }
  }

  // 更新分类
  async update(category: Category) {
    try {
      await this.categoryRepository.update(category.id, {
        ...category
      })
    } catch (err) {
      throw err
    }
  }

  // 删除分类
  async remove(userId, id: number) {
    try {
      await this.categoryRepository.delete({
        id,
        user: userId
      })
    } catch (err) {
      throw err
    }
  }

  // 获取分类下页面
  async pages(id): Promise<any []> {
    const category = await this.categoryRepository.findOne({
      relations: ['pages'],
      select: [
        'pages'
      ],
      where: {
        id
      }
    })

    return category.pages
  }
}
