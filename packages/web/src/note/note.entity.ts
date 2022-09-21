import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Page } from 'src/page/page.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, page => page.notes)
  page: Page;

  @Column()
  container: string;

  @Column()
  startOffset: number;

  @Column({
    nullable: true
  })
  startContainer: string;

  @Column()
  endOffset: number;

  @Column({
    nullable: true
  })
  endContainer: string;

  @Column({
    type: 'longtext'
  })
  md: string;

  @Column({
    type: 'longtext',
    nullable: true
  })
  comment: string;
}
