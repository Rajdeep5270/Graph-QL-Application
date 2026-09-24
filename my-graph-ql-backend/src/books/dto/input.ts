import { Field, InputType, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateBookInput {
    @Field()
    name: string;

    @Field(() => Int)
    price: number;

    @Field(() => String)
    authorId: string;
}

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field({ nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    price: number;

    @Field(() => String, { nullable: true })
    authorId: string;
}