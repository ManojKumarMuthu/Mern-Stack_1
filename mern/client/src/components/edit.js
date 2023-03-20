import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// move the Modal component declaration here
function ConfirmationModal(props) {
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to update this record?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.confirmUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Edit() {
  const [form, setForm] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Region: "",
    Rating: "",
    Fee: "",
    Sale: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      First_Name: form.First_Name,
      Last_Name: form.Last_Name,
      Email: form.Email,
      Region: form.Region,
      Rating: form.Rating,
      Fee: form.Fee,
      Sale: form.Sale,
    };

    setShowModal(true); // show confirmation modal
  }

  async function confirmUpdate() {
    const editedPerson = {
      First_Name: form.First_Name,
      Last_Name: form.Last_Name,
      Email: form.Email,
      Region: form.Region,
      Rating: form.Rating,
      Fee: form.Fee,
      Sale: form.Sale,
    };

    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/recordList");
  }

  function closeModal() {
    setShowModal(false);
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
         <div className="form-group">
           <label htmlFor="First_Name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="First_Name"
            value={form.First_Name}
            onChange={(e) => updateForm({ First_Name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Last_Name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="Last_Name1"
            value={form.Last_Name}
            onChange={(e) => updateForm({ Last_Name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            className="form-control"
            id="Email1"
            value={form.Email}
            onChange={(e) => updateForm({ Email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Rating">Rating</label>
          <input
            type="text"
            className="form-control"
            id="Rating1"
            value={form.Rating}
            onChange={(e) => updateForm({ Rating: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Fee">Fee</label>
          <input
            type="text"
            className="form-control"
            id="Fee1"
            value={form.Fee}
            onChange={(e) => updateForm({ Fee: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Sale">Sale</label>
          <input
            type="text"
            className="form-control"
            id="Sale1"
            value={form.Sale}
            onChange={(e) => updateForm({ Sale: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionEast1"
              value="East"
              checked={form.Region === "East"}
              onChange={(e) => updateForm({ Region: e.target.value })}
            />
            <label htmlFor="regionEast" className="form-check-label">East</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionWest11"
              value="West"
              checked={form.Region === "West"}
              onChange={(e) => updateForm({ Region: e.target.value })}
            />
            <label htmlFor="regionWest" className="form-check-label">West</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionNorth1"
              value="North"
              checked={form.Region === "North"}
              onChange={(e) => updateForm({ Region: e.target.value })}
            />
            <label htmlFor="regionNorth" className="form-check-label">North</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionSouth1"
              value="South"
              checked={form.Region === "South"}
              onChange={(e) => updateForm({ Region: e.target.value })}
            />
            <label htmlFor="regionSouth" className="form-check-label">South</label>
          </div>
        </div>
        
          <Button type="submit" variant="primary">
             Save Changes
          </Button>
        </form>

  {/* render the modal component */}
        <ConfirmationModal
    showModal={showModal}
    closeModal={closeModal}
    confirmUpdate={confirmUpdate}
        />
</div>

);
}