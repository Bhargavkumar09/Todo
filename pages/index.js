import { useState, useRef } from "react";

export default function Home() {
  const [todo, setTodo] = useState({ message: "", lastUpdate: 0 });
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const span = useRef(null);

  const inputHandler = (e) => {
    setTodo({ message: e.target.value });
  };

  const addTodo = () => {
    setCount(count + 1);
    const _todo = {
      id: count,
      message: todo.message,
      description: "description",
      done: false,
      lastUpdate: Date.now(),
      edit: false,
    };

    todo.message && setItems([_todo, ...items]);

    setTodo({ message: "" });
  };

  const handleEdit = (item) => {
    const _items = [...items];
    const index = _items.indexOf(item);
    const _item = _items[index];
    _item.message = prompt("Edit ToDo", item.message);
    setItems(_items);
  };

  const handleDelete = (todo) => {
    let _items = items.filter((item) => item.id !== todo.id);
    setItems(_items);
  };

  const handleToggle = (todo) => {
    let _items = items.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });

    let _itemsNotDone = _items.filter((item) => item.done === false);
    let _itemsDone = _items.filter((item) => item.done === true);

    _itemsNotDone = _itemsNotDone.sort(
      (item1, item2) => item2.lastUpdate - item1.lastUpdate
    );
    _itemsDone = _itemsDone.sort(
      (item1, item2) => item2.lastUpdate - item1.lastUpdate
    );

    setItems([..._itemsNotDone, ..._itemsDone]);
  };

  return (
    <>
      <h1>My Todo App</h1>
      <input type="text" value={todo.message} onChange={inputHandler} />
      <button type="submit" onClick={addTodo}>
        Add
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span
              ref={span}
              className={item.done ? "done" : ""}
              onClick={() => handleToggle(item)}
              contentEditable={item.edit}
            >
              {item.message}
            </span>
            <input
              type="text"
              value={item.value}
              style={{ display: "none" }}
            ></input>
            <button onClick={() => handleDelete(item)}>delete</button>
            <button onClick={() => handleEdit(item)}>edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}
