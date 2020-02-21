import Axios from 'axios';

const API = Axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getTarefas() {
    return API.get('/tarefas');
  },
  getTarefa(id) {
    return API.get(`/tarefas/${id}`);
  },
  postTarefa(tarefa) {
    return API.post('/tarefas', tarefa);
  },
  putTarefa(tarefa) {
    return API.put(`/tarefas/${tarefa.id}`, tarefa);
  },
  deleteTarefa(id) {
    return API.delete(`/tarefas/${id}`);
  }
}