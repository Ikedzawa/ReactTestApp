import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span>
        {todo.text}
      </span>
      <div class="done">
        { todo.isDone ? 'Завершено!' : '' }
      </div>
      <div class="controls">
        <Button variant="outline-success"
                disabled={todo.isDone}
                Color={todo.isDone ? 'muted' : undefined}
                onClick={() => markTodo(index)}>
          Завершить
        </Button>
        <Button variant="outline-danger"
                onClick={() => removeTodo(index)}>
          Удалить
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label>
        <h3>Мое новое интересное дело:</h3>
      </Form.Label>
      <Form.Control type="text"
                    className="input"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Название дела"/>
    </Form.Group>
    <Button className="button" type="submit">
      Добавить
    </Button>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Первое дело (инициализация)",
      isDone: true
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="data">
      <div className="container">
        <h1 className="text-center">
          Список дел
        </h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo key={index}
                      index={index}
                      todo={todo}
                      markTodo={markTodo}
                      removeTodo={removeTodo}/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
