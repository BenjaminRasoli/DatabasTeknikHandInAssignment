import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Project.css";

function Project() {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://localhost:7078/api/projects/${id}`);
      const data = await response.json();
      setProject(data.result);
    };
    fetchData();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-container">
      <h1 className="project-title">{project.projectName}</h1>
      <p className="project-desc">{project.description}</p>
      <p className="project-manager-email">{project.projectManager.email}</p>
      <p className="project-manager-name">
        {project.projectManager.firstName} {project.projectManager.lastName}
      </p>
      <p>{project.timeLine.days} days</p>
      <p>{project.projectType.typeName}</p>

      <h2 className="project-status">{project.status.statusName}</h2>
    </div>
  );
}

export default Project;
