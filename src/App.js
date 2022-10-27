import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";

const getLocalStorage = () => {
  const list = localStorage.getItem('list')

  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "All Items are cleared.", "danger");
    setList([])
  };

  const removeItem = (id) => {
    showAlert(true, "Item Removed", "danger")
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find ((item) => item.id === id)
    console.log(specificItem)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "Please Enter Value.", "danger");
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if(item.id === editID) {
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'Item Edited Successfully', 'success')
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);

      setName("");

      showAlert(true, "Item Added Successfully", "success");
    }
  };
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert alt={alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>Clear Items</button>
        </div>
      )}
    </section>
  );
}

export default App;
