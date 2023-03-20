import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Transaction = (props) => (
  <tr>
    <td>{props.transaction.agent_name}</td>
    <td>{props.transaction.transaction_number}</td>
    <td>{props.transaction.sale}</td>
    <td>{props.transaction.date}</td>
  </tr>
);

export default function TransactionList() {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    async function getTransaction() {
      const response = await fetch(`http://localhost:5000/transaction/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const transactions = await response.json();
      setTransaction(transactions);
    }

    getTransaction();
  }, []);

  function transactionList() {
    return transaction.map((transaction) => {
      return (
        <Transaction
          transaction={transaction}
          key={transaction._id}
        />
      );
    });
  }

  return (
    <div>
      <div>
        <NavLink className="btn btn-secondary mt-2" to="/CreateTransaction">
          Create Transaction
        </NavLink>
      </div>
      <h3>Transaction List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Transaction Number</th>
            <th>Sale</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{transactionList()}</tbody>
      </table>
    </div>
  );
}
