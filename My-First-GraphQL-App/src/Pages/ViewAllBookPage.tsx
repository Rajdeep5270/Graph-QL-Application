import { useMutation, useQuery } from "@apollo/client/react"
import { DELETE_BOOK } from "../Query/deleteBook.query";
import { useState } from "react";
import { FETCH_ALL_BOOK } from "../Query/fetchAllBook.query";
import Table from "../Components/table";

export default function ViewAllBookPage() {

    const [isDeleteId, setIsDeleteId] = useState<string>("");

    const { loading: bookLoading, error: bookError, data: bookData } = useQuery(FETCH_ALL_BOOK, {
        fetchPolicy: "cache-and-network"
    });

    const [deleteBook, { error: deleteError }] = useMutation(DELETE_BOOK, {
        refetchQueries: [
            {
                query: FETCH_ALL_BOOK
            }
        ]
    });

    if (bookLoading) return <p>Loading...</p>

    if (bookError || deleteError) return <p>{bookError?.message || deleteError?.message}</p>

    const allBooks = bookData?.getAll;

    function onHandleDelete(deleteId: string) {
        // console.log("Delete ID Fetch Successfully : ", deleteId);
        try {
            setIsDeleteId(deleteId);

            deleteBook({
                variables: {
                    id: deleteId
                }
            });

            // console.log("Delete Book Data : ", deleteData);
        } catch (err) {
            console.log("Delete book error : ", err);
        } finally {
            setIsDeleteId("");
        }
    }

    const onHandleDataFromChild = (operationId: string) => {
        if (operationId.includes("Delete")) {
            operationId = operationId.slice(7, operationId.length);
            onHandleDelete(operationId)
        };
    }

    const tableHeading = ['No', 'Name', 'Price', 'Actions'];
    const dataKeys = ['name', 'price'];
    const actionButtons = ['Delete'];

    return <>
        <h2>View Book Page</h2>

        {/* <table border={10}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allBooks?.map((book, bookIdx) => {
                    return <tr key={bookIdx}>
                        <td>{bookIdx + 1}</td>
                        <td>{book.name}</td>
                        <td>{book.price}</td>
                        <td>
                            <div>
                                <button onClick={() => onHandleDelete(book.id)}>{isDeleteId === book.id ? "Deleting..." : "Delete"}</button>
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table> */}

        <Table uiList={tableHeading} dataKeysList={dataKeys} dataList={allBooks} onSendOperationId={onHandleDataFromChild} buttons={actionButtons} />
    </>
}
