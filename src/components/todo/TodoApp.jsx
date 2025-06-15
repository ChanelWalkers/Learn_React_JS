import './todo.css'
import TodoData from './TodoData';
import TodoNew from './TodoNew';
import reactLogo from '../../assets/react.svg'
import { useState } from 'react';

const TodoApp = () => {
    const [todoList, setTodoList] = useState([]);

    const addNewTodo = (name) => {
        const newTodo = {
            name: name,
            id: randomInFromInterval(1, 100000)
        }

        setTodoList((items) => [...items, newTodo])
    }

    const deleteTodo = (id) => {
        setTodoList((items) => items.filter((item) => item.id !== id))
    }

    const randomInFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew addNewTodo={addNewTodo} />

            {/* {todoList &&
        <TodoData todoList={todoList} />
      }

      {!todoList.length &&
        <div className='todo-image'>
          <img src={reactLogo} className='logo' />
        </div>
      } */}

            {todoList.length > 0 ?
                <TodoData todoList={todoList} deleteTodo={deleteTodo} />
                :
                <div className='todo-image'>
                    <img src={reactLogo} className='logo' />
                </div>}
        </div>
    );
}

export default TodoApp;