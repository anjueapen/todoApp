import './todo.css'
import { AddTodo } from './addTodo/addTodo';
import { TodoList } from './todoList/todoList'
import { useState } from 'react';
import { useEffect } from 'react';
export const Todo = () => {
    const [todoValue, setTodoValue] = useState("");
    const [todoTable, setTodoTable] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [todoId, setTodoId] = useState(0);

    let id = Math.random();

    useEffect(() => {
        let dataLocalStorage = localStorage.getItem("todoTable");
        let parsedData = JSON.parse(dataLocalStorage);
        if (parsedData) {
            setTodoTable(parsedData);
        }
    }, [])
    const handleChange = (event) => {
        setTodoValue(event?.target?.value);
        setErrorMsg(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(todoValue);

        if (todoValue === "") {
            setErrorMsg(true);
        }
        else {
            let newData = {};
            if (isEdit) {
                const updated = {
                    id: todoId,
                    val: todoValue,
                    completed: false
                };

                const updatedTodo = todoTable?.map((tod) => {
                    if (tod.id === todoId) {
                        return updated;
                    } else {
                        return tod;
                    }
                });
                setTodoTable(updatedTodo); setIsEdit(false)
            }
            else {
                newData = [...todoTable, {
                    id: id + 1,
                    val: todoValue,
                    completed: false
                }];
                setTodoTable(newData)
            }
            localStorage.setItem('todoTable', JSON.stringify(newData));
            setTodoValue('')
        }

    }
    const handleDelete = (id) => {
        console.log(id);
        const newData = todoTable.filter(row => row.id !== id);
        localStorage.setItem('todoTable', JSON.stringify(newData));
        setTodoTable(newData);

    }
    const handleEdit = (id) => {
        setTodoId(id);
        const editData = todoTable.filter(row => {
            if (row.id === id) {
                setTodoValue(row.val);
            }
        });
        setIsEdit(true);
    }
    const handleComplete = (id) => {
        let completeVal = todoTable?.map((tod) => {
            if (tod.id === id && tod.completed === true) {
                return { ...tod, completed: false };

            } else if (tod.id === id) {
                return { ...tod, completed: true };
            } else {
                return tod;
            }
        });
        setTodoTable(completeVal);
    }
    return (
        <div className='main-container'>
            <h1>Todo List</h1>
            <AddTodo todoValue={todoValue} handleChange={handleChange} handleSubmit={handleSubmit} isEdit={isEdit} errorMsg={errorMsg} />
            <TodoList todoTable={todoTable} handleDelete={handleDelete} handleEdit={handleEdit} handleComplete={handleComplete} />
        </div>
    )
}

