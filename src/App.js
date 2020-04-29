import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(res=>{
      setRepositories(res.data);
    });
  }, [repositories]);

  async function handleAddRepository() {
    api.post('/repositories', {title: 'Teste React', url: 'http:localhost//', techs: ['reactjs']}).then(res=>{
        repositories.push(res.data);
        setRepositories(repositories);
      
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    api.get('/repositories').then(res=>{
      setRepositories(res.data);
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
