import { useState } from "react";
import "./App.css";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) {

    } else if (name && isEditing) {

    } else {
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])

      setName('')

    }
  }
  return (
    <section className="section-center">
    <form onSubmit={handleSubmit} className="grocery-form">
      {alert.show && <Alert />}
      <h3>Grocery Bud</h3>
      <div className="form-control">
      <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit" className="submit-btn">
      { isEditing ? 'Edit' : 'Submit' }</button>
      </div>
    </form>

    {list.length > 0 && <div className="grocery-container">
    <List items={list} />
    <button className="clear-btn">Clear Items</button>
    </div> }
    </section>
  );
}

export default App;
