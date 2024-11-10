import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Row from '../components/Row';
import { useUser } from '../context/useUser';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:3001';

function Home() {
  const { user, signOut } = useUser();
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        alert(error.response?.data?.error || error.message);
      });
  }, []);

  const addTask = () => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .post(url + '/create', { description: task }, headers)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, { id: response.data.id, description: task }]);
        setTask('');
      })
      .catch((error) => {
        alert(error.response?.data?.error || error.message);
      });
  };

  const deleteTask = (id) => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .delete(url + '/delete/' + id, headers)
      .then(() => {
        const withoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(withoutRemoved);
      })
      .catch((error) => {
        alert(error.response?.data?.error || error.message);
      });
  };

  const handleLogOut = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <div id="container">
      <div className="header">
        <h3>Todos</h3>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <form className="task-form">
        <input
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>
      <ul className="task-list">
        {tasks.map((item) => (
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default Home;