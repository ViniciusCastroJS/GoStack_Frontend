import React, {useEffect, useState} from "react";
import api from './services/api';
import "./styles.css";




function App() {
  
  const [repositories, setRepositories] = useState([])
  
  useEffect(() => {
    api.get('/repositories').then( response => setRepositories(response.data))
  }, [])
  
  async function handleAddRepository() {
    
    const res = await api.post('/repositories')
    
    const Added = res.data;
    
    setRepositories([...repositories, Added])

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`)
    
    const withoutId = repositories.filter( elem => elem.id !== id)

    setRepositories(withoutId)
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
      { repositories.map( repo => (
        <li key={repo.id}>
        <h2>{repo.title}</h2>
        <button onClick={() => handleRemoveRepository(repo.id)}>
          Remover
        </button>
        </li>
      ))}  
        
        
      </ul>
      {console.log(repositories)}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
