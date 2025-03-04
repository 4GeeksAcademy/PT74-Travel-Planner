import React, { useEffect, useState } from "react"
import './style.css';



export const PackingList = () => {

    // const [newItem, setNewItem] = useState({
    //     item: "",
    //     category: "",
    //     destination_type: null,
    // checked: false,
    //   })

    const [items, setItems] = useState([
        { id: 1, item: 'Item 1', destination_type: 'beach', checked: false },
        { id: 2, item: 'Item 2', destination_type: 'beach', checked: false },
        { id: 3, item: 'Item 3', destination_type: 'beach', checked: false },
    ]);

    const handleCheckboxChange = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    // useEffect(() => {
    //     fetch("")
    //     .then((resp) => {
    //       if (!resp.ok) {
    //         throw Error("Not able to get the list from the API");
    //       }

    //       resp.json().then((data) => setItems(data.items));
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       fetch("", {
    //         method: "POST"
    //       });
    //     });    
    //   }, []);

    return (
        <div class="container text-center">
            <div class="row justify-content-center">
                <div class="col-6">
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