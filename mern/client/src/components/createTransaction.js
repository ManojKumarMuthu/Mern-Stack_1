import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    agent_name: "",
    transaction_number: "",
    sale: "",
    date: ""
  });
  const navigate = useNavigate();

  // Update the form state with the provided values
  function updateForm(values) {
    setForm(prev => ({ ...prev, ...values }));
  }

  // Handle form submission
  async function onSubmit(event) {
    event.preventDefault();

    // Show confirmation dialog before creating the transaction
    const confirmation = window.confirm(
      "Are you sure you want to create a new transaction?"
    );
    if (!confirmation) {
      return;
    }

    try {
      // Send a POST request to the backend to create a new transaction
      await fetch("http://localhost:5000/transaction/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Reset the form state and navigate to the transaction page
      setForm({
        agent_name: "",
        transaction_number: "",
        sale: "",
        date: ""
      });
      navigate("/transaction");
    } catch (error) {
      // Show an error alert if the request fails
      window.alert(error);
    }
  }

  // Render the form component
  return (
    <div>
      <h3>Create New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="agent_name">Agent Name</label>
          <select
            className="form-control"
            id="agent_name"
            value={form.agent_name}
            onChange={event => updateForm({ agent_name: event.target.value })}
          >
            <option value="">Select Agent</option>
            <option value="Goku">Goku</option>
            <option value="Lelouch">Lelouch</option>
            <option value="Naruto">Naruto</option>
            <option value="Bleach">Bleach</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="transaction_number">Transaction Number</label>
          <input
            type="text"
            className="form-control"
            id="transaction_number"
            value={form.transaction_number}
            onChange={event =>
              updateForm({ transaction_number: event.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="sale">Sale</label>
          <input
            type="number"
            className="form-control"
            id="sale"
            value={form.sale}
            min="0"
            onChange={event =>
              updateForm({ sale: Math.max(0, event.target.value) })
            }
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Transaction"
            className="btn btn-primary"
          />
        </div>
      </form>
      {/* Confirmation Modal */}
      <div
        className="modal fade"
        id="confirmationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmationModalLabel">
                Are you sure you want to create a new transaction?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Please confirm that you want to create a new transaction.</p>
            </div>
          <div className="modal-footer">
              <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              >
                Cancel
              </button>
              <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
              >
                Create Transaction
              </button>
          </div>
        </div>
      </div>
    </div>
</div>
);
}






