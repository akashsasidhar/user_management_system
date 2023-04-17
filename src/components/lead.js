import React, { useState, useEffect } from "react";
import { fetchLead, updateLead } from "../actions/users";
import { validateJWT } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [file, setFile] = useState(null);
  const [decodedToken, setdecodedToken] = useState(null);

  const fetchLeads = async (id) => {
    try {
      console.log(decodedToken?.id);
      const response = await fetchLead(decodedToken?.id);
      setLeads(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  //   let decodedToken;
  const navigate = useNavigate();
  const handleFileUpload = async (e) => {
    try {
      e.preventDefault();
      const fileData = new FormData();
      fileData.append("excelFile", file);
      fileData.append("id", decodedToken?.id);
      await updateLead(fileData);
      setFile(null);
      await fetchLeads(decodedToken?.id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = validateJWT(navigate);
    setdecodedToken(token);
  }, []);
  useEffect(() => {
    fetchLeads(decodedToken?.id);
  }, [decodedToken]);
  return (
    <div className="container" style={{ marginTop: "4%" }}>
      <div className=" row d-flex ">
        <div className="container-fluid  ">
          <div
            style={{ textAlign: "left", marginTop: "2%", marginBottom: "2%" }}
          >
            <h2>Add Leads</h2>
            <form onSubmit={handleFileUpload}>
              <input
                name="file"
                type="file"
                onChange={handleFileChange}
                required={true}
              />
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </form>
          </div>
          <h1 style={{ textAlign: "center" }}>Leads</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.lead_id}>
                  <td>{lead.lead_name}</td>
                  <td>{lead.lead_email}</td>
                  <td>{lead.lead_mobileno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeadsPage;
