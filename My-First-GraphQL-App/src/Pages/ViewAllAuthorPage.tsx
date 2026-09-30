import { useMutation, useQuery } from "@apollo/client/react"
import { FETCH_ALL_AUTHOR } from "../Query/fetchAllAuthor.query"
import { DELETE_AUTHOR } from "../Query/deleteSingleAuthor";
import { useState } from "react";
import { useNavigate } from "react-router";
import Table from "../Components/table";

export default function ViewAllAuthorPage() {

    const { loading: authorLoading, error: authorError, data: authorData } = useQuery(FETCH_ALL_AUTHOR);

    const [deleteAuthor, { error: deleteError }] = useMutation(DELETE_AUTHOR);

    const [isDeletingId, setIsDeletingId] = useState<string>("");

    const navigate = useNavigate();

    if (authorLoading) return <p>Loading...</p>

    if (authorError || deleteError) return <p>{authorError?.message || deleteError?.message}</p>

    const allAuthor = authorData?.findAllAuthor;

    function onHandleDelete(deleteId: string) {
        try {
            setIsDeletingId(deleteId);

            deleteAuthor({
                variables: { deleteId },
                refetchQueries: [
                    {
                        query: FETCH_ALL_AUTHOR
                    }
                ]
            });
        } catch (err) {
            console.log("Deleting author error : ", err);
        } finally {
            setIsDeletingId("");
        }
    }

    function onHandleEdit(editId: string) {
        navigate('/edit-author-page', { state: editId });
    }

    const onHandleDataFromChild = (operationId: string) => {
        if (operationId.includes('Edit')) {
            operationId = operationId.slice(5, operationId.length);
            onHandleEdit(operationId);
            return
        } else {
            operationId = operationId.slice(7, operationId.length);
            onHandleDelete(operationId);
            return;
        }
    }

    const tableHeading = ['No', 'Name', 'Actions'];
    const dataKeys = ['author_name'];
    const actionButtons = ['Edit', 'Delete'];

    return <>
        <h2>View All Author</h2>

        {/* <table border={10}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allAuthor?.map((author, authorIdx) => {
                    return <tr key={authorIdx}>
                        <td>{authorIdx + 1}</td>
                        <td>{author.author_name}</td>
                        <td>
                            <button onClick={() => onHandleEdit(author.id)}>Edit</button>
                            <button onClick={() => onHandleDelete(author.id)}>{isDeletingId ? "Deleting..." : "Delete"}</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table> */}

        <Table uiList={tableHeading} dataKeysList={dataKeys} dataList={allAuthor} onSendOperationId={onHandleDataFromChild} buttons={actionButtons} />
    </>
}
