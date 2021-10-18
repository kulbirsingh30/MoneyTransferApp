import { Chart } from "react-google-charts";

export default function Charts ({userData}) {
    const data = userData.userTransactions;
    const name = userData.userName;
    const email = userData.userEmail;
    return(
        <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Transaction Chart</div>}
            data={[
                ['Transactions', 'Percentage'],
                ['Incoming Transactions', data.filter(x=>x.amount>0).length],
                ['Outgoing Transactions', data.filter(x=>x.amount<0).length]
            ]}
            options={{
                title: 'My Activity',
                pieHole: 0.4,
            }}
            rootProps={{ 'data-testid': '3' }}
        />       
    )}