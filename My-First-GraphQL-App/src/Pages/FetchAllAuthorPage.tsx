import { useMutation, useQuery } from "@apollo/client/react"
import { FETCH_ALL_AUTHOR } from "../Query/fetchAllAuthor.query"
import { DELETE_BOOK } from "../Query/deleteBook.query";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function FetchAllAuthorPage() {

    const navigate = useNavigate();

    const [deletingId, setDeletingId] = useState<string>("")

    const { loading, error, data, refetch } = useQuery(FETCH_ALL_AUTHOR, {
        fetchPolicy: "cache-and-network"
    });

    const [deleteBook, { error: deleteError }] = useMutation(DELETE_BOOK, {
        refetchQueries: [
            {
                query: FETCH_ALL_AUTHOR
            }
        ]
    });

    if (loading) return <p>Loading...</p>

    if (error || deleteError) return <p>{error?.message || deleteError?.message}</p>

    const allData = data?.findAllAuthor;

    async function onHandleDelete(deleteId: string) {
        try {
            setDeletingId(deleteId);
            await deleteBook({ variables: { id: deleteId } });
        } catch (err) {
            console.error("Error deleting book:", err);
        } finally {
            setDeletingId("");
        }
    }

    return <>
        <h2>Fetch all author books</h2>

        <table border={10}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Books</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {allData?.map((author: any, idx: number) => {
                    return (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{author.author_name}</td>
                            <td>{author.books.map((book: any, bookIdx: number) => (
                                <span key={bookIdx}>{book.name}<br /></span>
                            ))}</td>
                            <td>{author.books.map((book: any, bookIdx: number) => (
                                <span key={bookIdx}>{book.price}<br /></span>
                            ))}</td>
                            <td>{author.books.map((book: any, bookIdx: number) => (
                                <div key={bookIdx}>
                                    <button onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</button>
                                    <button onClick={() => onHandleDelete(book.id)}>{deletingId === book.id ? "Deleting" : "Delete"}</button>
                                </div>
                            ))}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

        <button onClick={() => refetch()}>Refresh</button>
    </>
}
