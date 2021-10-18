import './transactions.scss';

export default function Transactions ({userData}) {
    const data = userData.userTransactions;
    const name = userData.userName;
    const email = userData.userEmail;
    return(
        <div className="container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Transaction Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Beneficiary Name</th>
                        <th scope="col">Check No.</th>
                        <th scope="col">Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((e,i)=>{
                        return(
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{e.txnType}</td>
                                <td className = {e.amount>0?"positive":"negative"}>{e.amount}</td>
                                <td>{e.beneficiaryName===name?"Self":e.beneficiaryName}</td>
                                <td>{e.chequeNo}</td>
                                <td>{Date(e.txnDate).slice(0,25)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    )
}

// function NewTransaction({getTransactions})