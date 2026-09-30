import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react'
import { FETCH_ALL_AUTHOR } from '../Query/fetchAllAuthor.query';
import { ADD_BOOK } from '../Query/addBook.query';
import { useNavigate } from 'react-router';

export interface BookType {
    name: string,
    price: number,
    authorId: string
}

export default function AddBookPage() {

    const navigate = useNavigate();

    const { loading, error, data } = useQuery(FETCH_ALL_AUTHOR, {
        fetchPolicy: "cache-and-network"
    });

    const [addBook, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_BOOK, {
        onCompleted: (data) => {
            console.log("Mutation Completed", data);
            setForm({
                name: "",
                price: 0,
                authorId: ""
            });
        },

        onError: (err) => {
            console.log("Error : ", err);
        }
    });

    const [form, setForm] = useState<BookType>({
        name: "",
        price: 0,
        authorId: ""
    });

    if (loading) return <p>Loading...</p>

    if (error || mutationError) return <p>{error?.message || mutationError?.message}</p>

    const allAuthor = data?.findAllAuthor;

    function onHandleChange(e: any) {
        const { name, value } = e.target;

        setForm(prev => ({ ...prev, [name]: (name === 'price') ? Number(value) : value }));
    }

    function onHandleSubmit(e: any) {
        e.preventDefault();

        console.log(form);

        addBook({
            variables: { name: form.name, price: form.price, authorId: form.authorId }
        });

        setForm({
            name: "",
            price: 0,
            authorId: ""
        });

        navigate('/view-all-book');
    }

    return <>
        <h2>Add Book Page</h2>

        <form onSubmit={onHandleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name='name' onChange={onHandleChange} value={form.name} />
            </div>

            <div>
                <label>Price</label>
                <input type="text" name='price' onChange={onHandleChange} value={form.price} />
            </div>

            <div>
                <select name="authorId" onChange={onHandleChange}>
                    <option value="">Select</option>
                    {allAuthor?.map((author, authorIdx) => {
                        return <option key={authorIdx} value={author.id}>{author.author_name}</option>
                    })}
                </select>
            </div>

            <div>
                <button type='submit'>{mutationLoading ? "Submitting..." : "Submit"}</button>
            </div>
        </form>
    </>
}
