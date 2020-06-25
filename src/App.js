import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  async function handleAddRepository() {

    const repos = await api.post('repositories', {
      title: `Novo projeto: ${Date.now()}`,
      url: "http://github.com/batata",
	    techs : "React",
	    likes: "0"
    });

    const newRepository = repos.data;

    setRepositories([...repositories, newRepository]);

    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id != id));

    console.log(repositories);
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);  

  return (
    <div>
      <ul data-testid="repository-list">            
        {repositories.map(repo => <li key={repo.id}>{repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
