import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Transaction = (props) => (
  <tr>
    <td>{props.transaction.First_Name}</td>
    <td>{props.transaction.Last_Name}</td>
    <td>{props.transaction.Email}</td>
    <td>{props.transaction.R}</td>
    <td>{props.transaction.Fee}</td>
    <td>{props.transaction.Sale}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteTransaction(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function TransactionList() {
  const [Transaction, setTransaction] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getTransaction() {
      const response = await fetch(`http://localhost:5000/transaction/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    get Records();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Transaction List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>R</th>
            <th>Fee</th>
            <th>Sale</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}