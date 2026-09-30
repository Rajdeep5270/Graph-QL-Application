import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path';
import { BookModule } from './books/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entity/book.entity';
import { AuthorModule } from './author/author.module';
import { Author } from './author/entities/author.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123123',
      database: 'graph_ql_practice',
      entities: [Book, Author],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
    }),
    BookModule,
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }