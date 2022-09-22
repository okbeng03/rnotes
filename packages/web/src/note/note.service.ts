import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { PageService } from 'src/page/page.service';
import { Page } from 'src/page/page.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private pageService: PageService
  ) {}

  // 添加分类
  async add(data: any): Promise<number> {
    try {
      const { title, href, categoryId } = data
      const note: Note = data.note
      let pageId: number = data.pageId

      if (!pageId) {
        // 先创建页面
        pageId = await this.pageService.add({
          title,
          href,
          categoryId
        } as Page)
      }

      const n = this.noteRepository.create({
        page: pageId,
        ...note
      })

      await this.noteRepository.save(n)
      return n.id
    } catch (err) {
      throw err
    }
  }

  // 更新分类
  async update(note: Note) {
    try {
      await this.noteRepository.update(note.id, {
        ...note
      })
    } catch (err) {
      throw err
    }
  }

  // 删除分类
  async remove(id: number) {
    try {
      await this.noteRepository.delete({
        id
      })
    } catch (err) {
      throw err
    }
  }
}
