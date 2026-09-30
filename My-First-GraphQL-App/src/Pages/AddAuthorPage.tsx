import { useState } from 'react'
import { ADD_AUTHOR } from '../Query/addAuthor.query';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router';

export default function AddAuthorPage() {

    const navigate = useNavigate();

    const [addAuthor, { loading, error }] = useMutation(ADD_AUTHOR, {
        onCompleted: (data) => {
            console.log("Mutation Succeeded : ", data);
            setAuthorName("");
        },
        onError: (err) => {
            console.log("Mutation Failed : ", err);
        }
    });

    const [authorName, setAuthorName] = useState<string>("");

    const [authorNameError, setAuthorNameError] = useState<string>("");

    if (error) return <p>{error.message}</p>

    const onHandleSubmit = (e: any) => {
        e.preventDefault();

        if (!authorName) {
            setAuthorNameError("Author name is required");
            return;
        } else {
            setAuthorNameError("");
        }

        setAuthorName("");

        addAuthor({
            variables: { author_name: authorName }
        });

        navigate('/');
    }

    return <>
        <h2>Add Author Page</h2>

        <form onSubmit={onHandleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name='author_name' onChange={(e) => setAuthorName(e.target.value)} value={authorName} />
                {authorNameError && <p>{authorNameError}</p>}
            </div>
            <div>
                <button type='submit'>{loading ? "Submitting" : "Submit"}</button>
            </div>
        </form>
    </>
}
