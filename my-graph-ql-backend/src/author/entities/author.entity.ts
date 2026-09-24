import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entity/book.entity';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  author_name: string;

  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  @Field(() => [Book])
  books: Book[]
}
