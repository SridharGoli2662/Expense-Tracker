export function Transactions(props)
{
    return(
        <div >
            <div className="d-flex justify-content-center">
                <p>{props.data.desc}</p>
                <h1>{props.data.value}</h1>
            </div>
        </div>
    )
}