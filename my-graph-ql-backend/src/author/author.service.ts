import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>
  ) { }

  async create(createAuthorInput: CreateAuthorInput) {
    const newAuthor = this.authorRepo.create(createAuthorInput);

    return this.authorRepo.save(newAuthor);
  }

  findAll() {
    return this.authorRepo.find({
      relations: { books: true }
    });
  }

  findOne(id: string) {
    return this.authorRepo.findOne({
      where: { id },
      relations: { books: true },
    });
  }

  async update(id: string, updateAuthorInput: UpdateAuthorInput) {
    const author = await this.authorRepo.findOneByOrFail({ id });
    this.authorRepo.merge(author, updateAuthorInput);

    return this.authorRepo.save(author);
  }

  async remove(id: string) {
    const author = await this.authorRepo.findOneByOrFail({ id });

    return this.authorRepo.remove(author);
  }
}
