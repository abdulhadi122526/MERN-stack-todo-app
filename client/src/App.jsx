import axios from "axios"
import { useEffect, useState } from "react"
import { BsPlus } from "react-icons/bs";



const App = () => {
  let [input, setInput] = useState()
  const [addTaskBtn, setAddTaskBtn] = useState(false);
  const [data, setData] = useState(null)
  const [description, setDescription] = useState(null)
  const [editTitleInput, setEditTitleInput] = useState()
  const [editDescriptionInput, setEditDescriptionInput] = useState()


  const addTask = () => {
    setAddTaskBtn(true)
  }

  // get todo 
  
  const getTodo = async () => {
    const res = await axios("https://qualified-octopus-ebwizardsco-e6e37a3e.koyeb.app/api/v1/todo")
    console.log(res.data.data);
    setData(res.data.data)
  }

  useEffect(() => {
    getTodo()
  }, [])

  // add todo
  const addTodo = async (e) => {
    e.preventDefault()

    const response = await axios.post("https://qualified-octopus-ebwizardsco-e6e37a3e.koyeb.app/api/v1/todo", {
      title: input,
      description
    })
    console.log(response);

    getTodo();
    setAddTaskBtn(false)


  }
  // delete todo 
  const deleteTodo = async (id) => {
    const res = await axios.delete(`https://qualified-octopus-ebwizardsco-e6e37a3e.koyeb.app/api/v1/todo/${id}`)
    console.log(res);

    if (res) {

      getTodo()
      return
    }



  }

  // edit todo

  const editTodo = async (id) => {
    // const updatedTitle = prompt("Update yor todo")
    // const updateDescription = prompt("Description")
    const res = await axios.put(`https://qualified-octopus-ebwizardsco-e6e37a3e.koyeb.app/api/v1/todo/${id}`, {
      title: editTitleInput,
      description: editDescriptionInput
    })
    console.log(res);
    getTodo()
  }




  return (
    <>
      <div className="text-center mt-10 mb-5">
        <h1 className="text-2xl">Todo App</h1>
      </div>

      <div className="main-div px-2">

        {data && data.map((item) => {
          return <div key={item?._id} className=" px-5 mt-5 border-b-2">
            <p className="font-semibold">{item.title}</p>
            <p>{item.description}</p>
            <button className="delete btn btn-sm mt-4 mb-2 me-3 bg-blue-700 text-white" onClick={() => { deleteTodo(item._id) }}>Delete</button>
            <button className="btn btn-sm mt-4 mb-2 me-3 bg-red-700 text-white" onClick={() => document.getElementById('my_modal_1').showModal()}>Edit</button>
            
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" placeholder="Add your todo" name="title" onChange={(e) => { setEditTitleInput(e.target.value) }} />
                <input type="text" className="input input-bordered input-sm w-full max-w-xs" placeholder="Description" name="description" onChange={(e) => { setEditDescriptionInput(e.target.value) }} />
                <div className="modal-action">
                  <form method="dialog">
                    <button className="edit btn btn-sm mt-4 mb-2 me-3 bg-red-700 text-white" onClick={()=>{editTodo(item._id)}}>Update</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        })}

        {addTaskBtn ? <div>
          <form onSubmit={addTodo} className="mt-2 border rounded-lg p-5">
            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" placeholder="Add your todo" name="title" onChange={(e) => { setInput(e.target.value) }} /> <br />
            <input type="text" className="input input-bordered input-sm w-full max-w-xs" placeholder="Description" name="description" onChange={(e) => { setDescription(e.target.value) }} />
            <button type="submit" className="btn btn-sm ms-5 bg-slate-700 text-white"> Add todo </button>
          </form>
        </div> : <button onClick={addTask} className="ms-4 mt-2 hover:text-red-700  "> <BsPlus className="inline text-2xl" /> Add Task</button>}

      </div>



    </>
  )
}

export default App


{/* Open the modal using document.getElementById('ID').showModal() method */ }
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog> */}