import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Note } from 'src/note/note.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, category => category.pages)
  category: Category;

  @Column()
  title: string;

  @Column()
  href: string;

  @OneToMany(() => Note, note => note.page)
  notes: Note[];
}
