import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FETCH_SINGLE_BOOK } from '../Query/fetchSingleBook.query';
import { FETCH_ALL_AUTHOR } from '../Query/fetchAllAuthor.query';
import type { BookType } from './AddBookPage';
import { UPDATE_BOOK } from '../Query/updateBook.query';

export default function EditBookPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState<BookType>({
        name: "",
        price: 0,
        authorId: ""
    });

    const { editId } = useParams();

    const {
        loading: loadingBook,
        error: errorBook,
        data: dataBook
    } = useQuery(FETCH_SINGLE_BOOK, {
        variables: {
            id: editId
        },
        fetchPolicy: "cache-and-network",
    });

    const {
        loading: loadingAuthors,
        error: errorAuthors,
        data: authorData
    } = useQuery(FETCH_ALL_AUTHOR);

    const [updateBook, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BOOK);

    useEffect(() => {
        if (dataBook?.getSingle) {
            const book = dataBook.getSingle;

            setForm({
                name: book.name,
                price: book.price,
                authorId: book.author.id
            });
        }
    }, [dataBook]);

    function onHandleChange(
        e: any
    ) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    }

    async function onHandleSubmit(e: any) {
        e.preventDefault();

        try {
            await updateBook({
                variables: { editId, name: form.name, price: form.price, authorId: form.authorId }
            });

            navigate('/', { replace: true });
        } catch (err) {
            console.log("Update Single Book Error : ", err);
        }
    }

    if (loadingBook || loadingAuthors) {
        return <p>Loading...</p>;
    }

    if (errorBook || errorAuthors || updateError) {
        return <p>{errorBook?.message || errorAuthors?.message || updateError?.message}</p>;
    }

    const allAuthor = authorData.findAllAuthor;

    return (
        <>
            <h2>Edit Book Page</h2>

            <form onSubmit={onHandleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onHandleChange}
                    />
                </div>

                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={onHandleChange}
                    />
                </div>

                <div>
                    <label>Author</label>

                    <select
                        name="authorId"
                        value={form.authorId}
                        onChange={onHandleChange}
                    >
                        <option value="">Select</option>

                        {allAuthor.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.author_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <button type="submit">
                        {updateLoading ? "Updating..." : "update"}
                    </button>
                </div>
            </form>
        </>
    );
}
