import { Args, Int, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Book } from "./entity/book.entity";
import { BookService } from "./book.service";
import { CreateBookInput, UpdateBookInput } from "./dto/input";

@Resolver(() => Book)
export class BookResolver {
    constructor(
        private bookService: BookService
    ) { }

    @Query(() => [Book], { name: 'getAll' })
    getAll() {
        return this.bookService.fetchAllBooks();
    }

    @Query(() => Book, { name: 'getSingle' })
    getSingle(@Args('bookId') bookId: string) {
        return this.bookService.findById(bookId);
    }

    @Mutation(() => Book, { name: 'createBook' })
    createBook(@Args('input', { type: () => CreateBookInput }) input: CreateBookInput) {
        return this.bookService.addBook(input);
    }

    @Mutation(() => Book, { name: 'updateBook', nullable: true })
    updateBook(
        @Args('editId', { type: () => String }) editId: string,
        @Args('newData', { type: () => UpdateBookInput }) newData: UpdateBookInput
    ) {
        return this.bookService.updateBook(editId, newData);
    }

    @Mutation(() => Book, { name: 'deleteBook', nullable: true })
    deleteBook(@Args('deleteId', { type: () => String }) deleteId: string) {
        return this.bookService.deleteBook(deleteId);
    }
}