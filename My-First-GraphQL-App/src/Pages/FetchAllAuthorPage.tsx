import { useQuery } from "@apollo/client/react"
import { FETCH_ALL_AUTHOR } from "../Query/fetchAllAuthor.query"

export default function FetchAllAuthorPage() {

    const { loading, error, data } = useQuery(FETCH_ALL_AUTHOR)

    if (loading) return <p>Loading...</p>

    if (error) return <p>{error.message}</p>

    const allData = data.findAllAuthor;

    console.log(allData);

    return <>
        <h2>Fetch all author page</h2>

        <table border={10}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                </tr>
            </thead>

            <tbody>
                {allData.map((author, idx) => {
                    return <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{author.author_name}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
}
