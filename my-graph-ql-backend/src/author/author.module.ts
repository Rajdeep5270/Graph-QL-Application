import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { BookModule } from '../books/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    BookModule
  ],
  providers: [AuthorResolver, AuthorService],
})
export class AuthorModule { }
