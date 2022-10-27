import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = (props) => {
  // console.log(props)
  return (
    <div className="grocery-list">
      {props.items.map((item) => {
        const { id, title } = item;
        // console.log(item)
        // console.log(title);
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" type="button" onClick={() => props.editItem(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => props.removeItem(id)} type="button">
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
