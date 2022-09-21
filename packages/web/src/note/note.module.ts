import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note } from './note.entity';
import { PageModule } from 'src/page/page.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), PageModule],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
