import { useMutation, useQuery } from '@apollo/client/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { FETCH_SINGLE_AUTHOR } from '../Query/fetchSingleAuthor.query';
import { UPDATE_AUTHOR } from '../Query/updateAuthor.query';

export default function EditAuthorPage() {

    const location = useLocation();
    const findId = location.state;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        author_name: ""
    });

    const { loading: fetchLoading, error: fetchError, data: fetchData } = useQuery(FETCH_SINGLE_AUTHOR, {
        variables: {
            findId
        },
        fetchPolicy: "cache-and-network"
    });

    const [updateAuthor, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_AUTHOR);

    useEffect(() => {
        if (fetchData?.author) {
            const author = fetchData?.author;

            setForm({
                author_name: author.author_name
            });
        }
    }, [fetchData]);

    if (fetchLoading) return <p>Loading...</p>

    if (fetchError || updateError) return <p>{fetchError?.message || updateError?.message}</p>

    function onHandleSubmit(e: any) {
        e.preventDefault();

        updateAuthor({
            variables: {
                updateId: findId,
                name: form.author_name
            }
        });

        navigate('/view-all-author', { replace: true });
    }

    return <>
        <h2>Edit Author Page</h2>

        <form onSubmit={onHandleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name='author_name' value={form.author_name} onChange={(e) => setForm(form => ({ ...form, 'author_name': e.target.value }))} />
            </div>

            <div>
                <button type='submit'>{updateLoading ? "Updating..." : "Update"}</button>
            </div>
        </form>
    </>
}
