import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Author } from '../../author/entities/author.entity';

@Entity()
@ObjectType()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field(() => Int)
    price: number;

    @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
    @JoinColumn()
    @Field(() => Author, { nullable: true })
    author: Author
}