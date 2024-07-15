import {styled} from 'styled-components'
export function BalanceCard()
{
    return(
        <BalanceData>
        <div className="w-3">
            <div>
                 <div className="text-center">
                        <h2>Available Balance</h2>
                        <p> &#x20b9; 4000.00</p>
                 </div>
                 <div className="d-flex justify-content-evenly">
                    <div>
                            <h2>Total Income</h2>
                            <p>8000.00</p>
                    </div>
                    <div>
                            <h2>Expenses</h2>
                            <p>4000.00</p>
                    </div>
                 </div>
            </div>
        </div>
        </BalanceData>
    )
}
const BalanceData=styled.div`
    width: 450px;
    margin: 15px auto;
    background-color: #2e2929;
    color: #b7b7b7;
    @media (max-width:480px) {
            width: 80vw;
    }
`