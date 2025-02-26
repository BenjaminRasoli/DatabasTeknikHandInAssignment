import React, { useEffect, useState } from "react";
import "./Upload.css";
import { useNavigate } from "react-router";

function Upload() {
  const [formData, setFormData] = useState({
    ProjectName: "",
    ProjectDescription: "",
    TimeLineId: "",
    StatusId: "",
    ClientId: "",
    ProjectManagerId: "",
    ProjectTypeId: "",
  });

  const [statuses, setStatuses] = useState([]);
  const [clients, setClients] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [timeLines, setTimeLines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          statusesRes,
          clientsRes,
          projectManagersRes,
          projectTypesRes,
          timeLinesRes,
        ] = await Promise.all([
          fetch("https://localhost:7078/api/status"),
          fetch("https://localhost:7078/api/clients"),
          fetch("https://localhost:7078/api/employees"),
          fetch("https://localhost:7078/api/projectTypes"),
          fetch("https://localhost:7078/api/timeLines"),
        ]);

        const statusesData = await statusesRes.json();
        const clientsData = await clientsRes.json();
        const projectManagersData = await projectManagersRes.json();
        const projectTypesData = await projectTypesRes.json();
        const timeLinesData = await timeLinesRes.json();

        setStatuses(statusesData);
        setClients(clientsData);
        setProjectManagers(projectManagersData);
        setProjectType(projectTypesData);
        setTimeLines(timeLinesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.ProjectName === "" ||
      formData.ProjectDescription === "" ||
      formData.TimeLineId === "" ||
      formData.StatusId === "" ||
      formData.ClientId === "" ||
      formData.ProjectManagerId === "" ||
      formData.ProjectTypeId === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    await fetch("https://localhost:7078/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({
      ProjectName: "",
      ProjectDescription: "",
      TimeLineId: "",
      StatusId: "",
      ClientId: "",
      ProjectManagerId: "",
      ProjectTypeId: "",
    });
    navigate("/");
  };

  return (
    <div className="uploadWrapper">
      <div className="upload">
        <h1>Upload a project</h1>
        <form className="uploadForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="ProjectName"
            value={formData.ProjectName}
            placeholder="Input project Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="ProjectDescription"
            value={formData.ProjectDescription}
            placeholder="Input project description"
            onChange={handleChange}
          />
          <select
            name="StatusId"
            value={formData.StatusId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Status
            </option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.statusName}
              </option>
            ))}
          </select>

          <select
            name="ClientId"
            value={formData.ClientId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Client
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.clientName}
              </option>
            ))}
          </select>

          <select
            name="ProjectManagerId"
            value={formData.ProjectManagerId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Project Manager
            </option>
            {projectManagers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.firstName} {manager.lastName}
              </option>
            ))}
          </select>

          <select
            name="ProjectTypeId"
            value={formData.ProjectTypeId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Project Type
            </option>
            {projectType.map((type) => (
              <option key={type.id} value={type.id}>
                {type.typeName}
              </option>
            ))}
          </select>

          <select
            name="TimeLineId"
            value={formData.TimeLineId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Project time line
            </option>
            {timeLines.map((timeLine) => (
              <option key={timeLine.id} value={timeLine.id}>
                {timeLine.days} days
              </option>
            ))}
          </select>

          <button type="submit">Upload Project</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
