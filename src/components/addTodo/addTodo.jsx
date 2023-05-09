import './addTodo.css'

export const AddTodo = ({ todoValue, handleChange, handleSubmit, isEdit }) => {
    return (
        <div className='input-container'>
            <form onSubmit={handleSubmit}>
                <input type="text" value={todoValue} placeholder="Text  here..." onChange={handleChange} />
                <button type="submit">Save</button>
                {isEdit ? <button>Cancel</button> : ""}
            </form>
        </div>
    )
}

