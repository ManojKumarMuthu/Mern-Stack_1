// import React, { useState } from "react";
// import { useNavigate } from "react-router";


// export default function Create() {
//   const [form, setForm] = useState({
//     First_Name: "",
//     Last_Name: "",
//     Email: "",
//     Region: "",
//     Rating: "",
//     Fee: "",
//     Sale: ""
//   });
//   const navigate = useNavigate();

//   // These methods will update the state properties.
//   function updateForm(value) {
//     return setForm((prev) => {
//       return { ...prev, ...value };
//     });
//   }

//   // This function will handle the submission.
//   async function onSubmit(e) {
//     e.preventDefault();

//     // When a post request is sent to the create url, we'll add a new record to the database.
//     const newPerson = { ...form };

//     await fetch("http://localhost:5000/record/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newPerson),
//     })
//     .catch(error => {
//       window.alert(error);
//       return;
//     });

//     setForm({ 
//     First_Name: "",
//     Last_Name: "",
//     Email: "",
//     Region: "",
//     Rating: "",
//     Fee: "",
//     Sale: "" });
//     navigate("/recordList");
//   }

//   // This following section will display the form that takes the input from the user.
//   return (
//     <div>
//       <h3>Create New Agent</h3>
//       <form onSubmit={onSubmit}>
//         <div className="form-group">
//           <label htmlFor="First_Name">First Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="First_Name"
//             value={form.First_Name}
//             onChange={(e) => updateForm({ First_Name: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Last_Name">Last Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="Last_Name"
//             value={form.Last_Name}
//             onChange={(e) => updateForm({ Last_Name: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Email">Email</label>
//           <input
//             type="text"
//             className="form-control"
//             id="Email"
//             value={form.Email}
//             onChange={(e) => updateForm({ Email: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Rating">Rating</label>
//           <input
//             type="text"
//             className="form-control"
//             id="Rating"
//             value={form.Rating}
//             onChange={(e) => updateForm({ Rating: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Fee">Fee</label>
//           <input
//             type="text"
//             className="form-control"
//             id="Fee"
//             value={form.Fee}
//             onChange={(e) => updateForm({ Fee: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Sale">Sale</label>
//           <input
//             type="text"
//             className="form-control"
//             id="Sale"
//             value={form.Sale}
//             onChange={(e) => updateForm({ Sale: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="regionOptions"
//               id="regionEast"
//               value="East"
//               checked={form.Region === "East"}
//               onChange={(e) => updateForm({ Region: e.target.value })}
//             />
//             <label htmlFor="regionEast" className="form-check-label">East</label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="regionOptions"
//               id="regionWest"
//               value="West"
//               checked={form.Region === "West"}
//               onChange={(e) => updateForm({ Region: e.target.value })}
//             />
//             <label htmlFor="regionWest" className="form-check-label">West</label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="regionOptions"
//               id="regionNorth"
//               value="North"
//               checked={form.Region === "North"}
//               onChange={(e) => updateForm({ Region: e.target.value })}
//             />
//             <label htmlFor="regionNorth" className="form-check-label">North</label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="regionOptions"
//               id="regionSouth"
//               value="South"
//               checked={form.Region === "South"}
//               onChange={(e) => updateForm({ Region: e.target.value })}
//             />
//             <label htmlFor="regionSouth" className="form-check-label">South</label>
//           </div>
//         </div>
//         <div className="form-group">
//           <input
//             type="submit"
//             value="Create Agent"
//             className="btn btn-primary"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Region: "",
    Rating: "",
    Fee: "",
    Sale: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form };
    const confirmation = window.confirm(
      "Are you sure you want to create a new transaction?"
    );
    if (!confirmation) {
      return;
    }

    try {
      await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });

      setForm({
        First_Name: "",
        Last_Name: "",
        Email: "",
        Region: "",
        Rating: "",
        Fee: "",
        Sale: "",
      });
      navigate("/recordList");
    } catch (error) {
      window.alert(error);
      return;
    }
  }

  return (
    <div>
      <h3>Create New Agent</h3>
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
            id="Last_Name"
            value={form.Last_Name}
            onChange={(e) => updateForm({ Last_Name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            className="form-control"
            id="Email"
            value={form.Email}
            onChange={(e) => updateForm({ Email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Rating">Rating</label>
          <input
            type="text"
            className="form-control"
            id="Rating"
            value={form.Rating}
            onChange={(e) => updateForm({ Rating: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Fee">Fee</label>
          <input
            type="text"
            className="form-control"
            id="Fee"
            value={form.Fee}
            onChange={(e) => updateForm({ Fee: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Sale">Sale</label>
          <input
            type="text"
            className="form-control"
            id="Sale"
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
              id="regionEast"
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
              id="regionWest"
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
              id="regionNorth"
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
              id="regionSouth"
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
            value="Create Agent"
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



