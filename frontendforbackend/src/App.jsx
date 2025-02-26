import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function App() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Id: "",
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
      const response = await fetch("https://localhost:7078/api/projects");
      const data = await response.json();
      setProjects(data.result);
    };
    fetchData();
  }, [isEditing]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    await fetch(`https://localhost:7078/api/projects/${id}`, {
      method: "DELETE",
    });
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  const handleEdit = async (id, e) => {
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

    const updatedFormData = {
      Id: id,
      ProjectName: formData.ProjectName,
      Description: formData.ProjectDescription,
      TimeLineId: parseInt(formData.TimeLineId),
      StatusId: parseInt(formData.StatusId),
      ClientId: parseInt(formData.ClientId),
      ProjectManagerId: parseInt(formData.ProjectManagerId),
      ProjectTypeId: parseInt(formData.ProjectTypeId),
    };

    await fetch("https://localhost:7078/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFormData),
    });

    setFormData({
      Id: "",
      ProjectName: "",
      ProjectDescription: "",
      TimeLineId: "",
      StatusId: "",
      ClientId: "",
      ProjectManagerId: "",
      ProjectTypeId: "",
    });
    setIsEditing(false);
  };

  return projects?.length === 0 ? (
    <div>No project found...</div>
  ) : (
    <div className="projectsContainer">
      {projects?.map((project) => (
        <div key={project.id} className="projectCard">
          <Link to={`/project/${project.id}`}>
            <h1 className="projectTitle">{project.projectName}</h1>
            <h2 className="projectStatus">{project.status.statusName}</h2>
          </Link>
          <div className="deleteEdit">
            <button
              onClick={() => handleDelete(project.id)}
              className="trashIcon"
            >
              <FaTrash />
            </button>
            <button onClick={() => setIsEditing(true)} className="editIcon">
              <FaEdit />
            </button>
          </div>
          <div className={`editModal ${isEditing ? "show" : ""}`}>
            <div className="modalContent">
              <button
                className="closeButton"
                onClick={() => setIsEditing(false)}
              >
                X
              </button>
              <h1>Edit project</h1>
              <form
                className="uploadForm"
                onSubmit={(e) => handleEdit(project.id, e)}
              >
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

                <button type="submit">edit Project</button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
