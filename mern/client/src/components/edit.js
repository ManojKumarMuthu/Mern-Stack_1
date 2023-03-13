import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

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
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
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

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
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

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
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
        <div className="form-group">
          <input
            type="submit"
            value="Update Agent"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
