import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(res=>{
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {title: 'Teste React', url: 'http:localhost//', techs: ['reactjs']}).then(res=>{
        setRepositories([...repositories, res.data]);
      
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(res => {
      const repoIndex = repositories.findIndex(repo => repo.id === id);
      const newState = [...repositories.slice(0, repoIndex),...repositories.slice(repoIndex + 1)];
      setRepositories(newState);

    });
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 

          <li key={repo.id}>
          {repo.title}

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
