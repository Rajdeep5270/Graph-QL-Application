import { Injectable } from '@nestjs/common';
import { Book } from './entity/book.entity';
import { CreateBookInput, UpdateBookInput } from './dto/input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepo: Repository<Book>
    ) { }

    async fetchAllBooks() {
        const allBooks = await this.bookRepo.find({
            relations: {
                author: true
            }
        });

        return allBooks;
    }

    findById(bookId: string) {
        return this.bookRepo.findOne({
            where: { id: bookId },
            relations: { author: true }
        });
    }

    addBook(data: CreateBookInput) {
        const { authorId, ...bookData } = data;
        const newData = this.bookRepo.create({
            ...bookData,
            author: { id: authorId }
        });

        return this.bookRepo.save(newData);
    }

    async updateBook(editId: string, data: UpdateBookInput) {
        const book = await this.bookRepo.findOneOrFail({ where: { id: editId } });

        const { authorId, ...bookData } = data;
        const updatedBook = this.bookRepo.merge(book, {
            ...bookData,
            ...(authorId === undefined ? {} : { author: { id: authorId } })
        });

        return this.bookRepo.save(updatedBook);
    }

    async deleteBook(deletedId: string) {
        const book = await this.bookRepo.findOneByOrFail({ id: deletedId });

        return this.bookRepo.remove(book);
    }
}