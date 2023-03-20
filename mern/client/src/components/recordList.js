import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";


export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const handleClose = () => {
    setShow(false);
    setRecordToDelete(null);}
  
    const handleShow = (agentId) => {
    setShow(true);
    setRecordToDelete(agentId);}

  const Record = (props) => (
    <tr>
      <td>{props.record.First_Name}</td>
      <td>{props.record.Last_Name}</td>
      <td>{props.record.Email}</td>
      <td>{props.record.Region}</td>
      <td>{props.record.Rating}</td>
      <td>{props.record.Fee}</td>
      <td>{props.record.Sale}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            handleShow(props.record._id)
            // setRecordToDelete(props.record._id)
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
  
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
      
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

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
          handleShowDeleteModal={handleShow}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteRecord(recordToDelete);
              handleClose()
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <NavLink className="btn btn-secondary mt-2" to="/create">
          Create Agent
        </NavLink>
      </div>
      <h3 style={{ textAlign: "center" }}>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Rating</th>
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


