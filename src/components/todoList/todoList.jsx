import './todoList.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const TodoList = ({ todoTable, handleDelete, handleEdit, handleComplete }) => {
    return (
        <div className='list-container'>
            {todoTable.map((data) => (
                <div className='list-row' key={data?.id} >
                    <div style={{ width: "400px", padding: "10px", textAlign: "left" }} onClick={() => handleComplete(data?.id)}>
                        <p className={data?.completed ? "complete-span-1" : 'complete-span-2'}> {data?.val}</p>
                    </div>
                    <span className='list-button'>
                        <button onClick={() => handleEdit(data?.id)}><EditIcon /></button>
                        <button onClick={() => handleDelete(data?.id)}><DeleteIcon /></button>
                    </span>
                </div>
            ))}
        </div>

    )
}

