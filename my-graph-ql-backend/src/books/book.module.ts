import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book])
    ],
    controllers: [],
    providers: [BookResolver, BookService],
    exports: [BookService]
})

export class BookModule { }