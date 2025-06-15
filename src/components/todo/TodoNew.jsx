import { useState } from "react";

const TodoNew = (props) => {

    const { addNewTodo } = props;

    const [value, setValue] = useState("");

    const handleClick = () => {
        addNewTodo(value);
        setValue("");
    }

    return (
        <div className='todo-new'>
            <input type="text" onChange={(e) => setValue(e.target.value)} value={value} />
            <button onClick={handleClick}>Add</button>
            <div>My input is {value}</div>
        </div>
    )
}

export default TodoNew;
