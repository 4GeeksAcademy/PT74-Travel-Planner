import React, { useEffect, useState } from "react"
import './style.css';



export const PackingList = () => {

    const [newItem, setNewItem] = useState({
        item: "",
        category: "",
        destination_type: null,
        checked: false,
    })

    const [items, setItems] = useState([
        { id: 1, item: 'Item 1', destination_type: 'beach', checked: false },
        { id: 2, item: 'Item 2', destination_type: 'beach', checked: false },
        { id: 3, item: 'Item 3', destination_type: 'beach', checked: true },
    ]);


    useEffect(() => {
        const get_list = () => {
            fetch("https://legendary-cod-r4pprgvg6p46h5qg5-3001.app.github.dev/api/packinglist")
                .then((resp) => {
                    if (!resp.ok) {
                        throw Error("Not able to get the list from the API");
                    }
                    const data = response.json();
                    setItems(...items,data);
                    console.log(items);
                })
                .catch((err) => {
                    console.error(err);
                    fetch("", {
                        method: "POST"
                    });
                });
        }

        get_list();

    }, []);

    
    const createItem = async (newItem) => {
        const resp = await fetch("https://legendary-cod-r4pprgvg6p46h5qg5-3001.app.github.dev/api/packinglist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        const data = await resp.json();
        console.log(data,setNewItem);
        setItems([...items, data]);
      }
    

    const handleCheckboxChange = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleKeyDown = (event) => {
        console.log('Enter key pressed:', event.key,newItem);
        if (event.key === 'Enter' && newItem.item !== "") {
          setItems([...items,newItem]);
          createItem(newItem);
          setNewItem({
            item: "",
            category: "",
            destination_type: null,
            checked: false,
        });
        }
      };

    return (
        <div class="container text-center">
            <div class="row justify-content-center">
                <div class="col-6">
                    <div>ADD A NEW ITEM TO PACK</div>
                    <input
                        type="text"
                        autoFocus={true}
                        onKeyUp={(ev) => handleKeyDown(ev)}
                        value={newItem.label}
                        onChange={(ev) => setNewItem({ item: ev.target.value, is_done: false })}
                        id="item"
                        className="newItem"
                        placeholder="What needs to be added?"
                    />
                    <div>PACKING LIST</div>
                    <ul class="list-unstyled">
                        {items.map(item => (
                            <li key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                                {item.item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}