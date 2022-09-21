import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>
  ) {}

  // 添加页面
  async add(data: Page): Promise<number> {
    try {
      const page = this.pageRepository.create(data)

      await this.pageRepository.save(page)
      return page.id
    } catch (err) {
      throw err
    }
  }

  // 更新页面
  async update(data: Page) {
    try {
      await this.pageRepository.update(data.id, {
        ...data
      })
    } catch (err) {
      throw err
    }
  }

  // 删除页面
  async remove(id: number) {
    try {
      await this.pageRepository.delete({
        id
      })
    } catch (err) {
      throw err
    }
  }

  // 获取页面笔记
  async notes(id): Promise<any []> {
    const page = await this.pageRepository.findOne({
      relations: ['notes'],
      select: [
        'notes'
      ],
      where: {
        id
      }
    })

    return page.notes
  }

  // 根据url获取页面笔记
  async query(data): Promise<any> {
    const page = await this.pageRepository.findOne({
      relations: ['notes'],
      select: [
        'id',
        'title',
        'category',
        'notes'
      ],
      where: {
        ...data
      }
    })

    return page
  }
}
