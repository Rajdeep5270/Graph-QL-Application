export default function Table({ uiList, dataKeysList, dataList, onSendOperationId, buttons }) {
    return <>
        <table border={10}>
            <thead>
                <tr>
                    {uiList.map((key: string, idx: number) => {
                        return <th key={idx}>{key}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {dataList.map((val, idx: number) => {
                    return <tr key={idx}>
                        <td>{idx + 1}</td>
                        {
                            dataKeysList.map((keys: string, keyIdx: number) => {
                                return <td key={keyIdx}>{val[keys]}</td>
                            })
                        }
                        <td>
                            <div>
                                {buttons.map((button: string, idx: number) => {
                                    return <button key={idx} onClick={() => onSendOperationId(`${button} ` + val.id)}>{button}</button>
                                })}
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table >
    </>
}
