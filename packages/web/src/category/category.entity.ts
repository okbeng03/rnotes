import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Page } from 'src/page/page.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.categories)
  user: User;

  @Column()
  title: string;

  @Column({
    nullable: true
  })
  description: string;

  @Column({
    nullable: true
  })
  parentId: number;

  @OneToMany(() => Page, page => page.category)
  pages: Page[];
}
