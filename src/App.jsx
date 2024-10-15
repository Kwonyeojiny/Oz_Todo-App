import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
      <header>
        <h1>권여진이의 TODO</h1>
      </header>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="DivAdd">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isEditClick, setIsEditClick] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const EditClickHandler = () => {
    setIsEditClick(!isEditClick);
  };

  return (
    <li>
      <div className="todo-content">
        <input 
          type="checkbox"
          onChange={() => setIsChecked(!isChecked)}
        />
        <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{todo.content}</span>
      </div>
      <div className="buttons">
        {!isEditClick && (
          <div>
            <button onClick={EditClickHandler}>수정</button>
              <button
              onClick={() => {
                setTodoList((prev) => {
                  return prev.filter((el) => el.id !== todo.id);
                });
              }}
            >
              삭제
            </button>
          </div>
        )}
        {isEditClick && (
          <div>
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button
              onClick={() => {
                setTodoList((prev) =>
                  prev.map((el) =>
                    el.id === todo.id ? { ...el, content: inputValue } : el
                  )
                );
                setInputValue("");
                setIsEditClick(!isEditClick);
              }}
            >
              수정완료
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default App;
