import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Note } from 'src/note/note.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, category => category.pages)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({
    name: 'category_id'
  })
  categoryId: number;

  @Column()
  title: string;

  @Column()
  href: string;

  @OneToMany(() => Note, note => note.page)
  notes: Note[];
}
