import React, { useEffect, useState } from "react"
import './style.css';
import './PackingList.css'


export const PackingList = () => {

    const [newItem, setNewItem] = useState({
        item: "",
        category: "",
        destinationType: "",
        checked: false,
    })
 
    const [items, setItems] = useState([
        // { id: 1, item: 'Item 1', destination_type: 'beach', checked: false },
        // { id: 2, item: 'Item 2', destination_type: 'beach', checked: false },
        // { id: 3, item: 'Item 3', destination_type: 'beach', checked: true },
    ]);


    useEffect(() => {
        const get_list = () => {
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/packinglist")
                .then((resp) => {
                    if (!resp.ok) {
                        throw Error("Not able to get the list from the API");
                    }
                    return resp.json();
                }).then((data) => {
                    setItems(data);
                }).catch((err) => {
                    console.error(err);
                    // fetch("", {
                    //     method: "POST"
                    // });
                });
        }

        get_list();

    }, []);


    const createItem = async (plItem, category, destinationType) => {
        console.log(plItem, category, destinationType);
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/packinglist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "item": plItem,
                    "category": category,
                    "destination_type": destinationType,
                    "checked": false,
                }
            ),
        });
        const data = await resp.json();
        console.log(data);
        setItems([...items, data]);
    }

    const deleteItem = async (itemId) => {
        try {
            const resp = await fetch (import.meta.env.VITE_BACKEND_URL + "/api/packinglist", {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json"
                },
            });
            
            if (!resp.ok) {
                throw new Error("failed to delete item")
            }

            setItems(items.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };


    const handleCheckboxChange = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    // const handleKeyDown = (event) => {
    //     console.log('Enter key pressed:', event.key, newItem);
    //     if (event.key === 'Enter' && newItem.item !== "") {
    //         setItems([...items, newItem]);
    //         createItem(newItem);
    //         setNewItem({
    //             item: "",
    //             category: "",
    //             destination_type: null,
    //             checked: false,
    //         });
    //     }
    // };

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-6">
                    <div>ADD A NEW ITEM TO PACK</div>
                    <form onSubmit={(e) => 

                        createItem(newItem.item, newItem.category, newItem.destinationType)}>
                        <div className="form-group">
                            <label htmlFor="plItem">Item</label>
                            <input type="text" className="form-control" name="plItem" id="plItem" value={newItem.item} onChange={(e) => setNewItem({...newItem, item:e.target.value})} placeholder="Enter New Item"/>
                        </div>
                        <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Category</label>
                            <select className="custom-select mr-sm-2"  name="category" value={newItem.category} onChange={(e) => setNewItem({...newItem, category:e.target.value})} id="inlineFormCustomSelect">
                                <option value>Choose...</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Toiletries">Toiletries</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Documents">Documents</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Destination Type </label>
                            <select className="custom-select mr-sm-2"  name="destinationType" value={newItem.destinationType} onChange={(e) => setNewItem({...newItem, destinationType:e.target.value})} id="inlineFormCustomSelect">
                                <option value>Choose...</option>
                                <option value="Beach/Pool">Beach/Pool</option>
                                <option value="Outdoor Adventure">Outdoor Adventure</option>
                                <option value="Resort/Theme Park">Resort/Theme Park</option>
                                <option value="All">All</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <div>PACKING LIST</div>
                    <ul className="list-unstyled">
                        {items.map(item => (
                            <li key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                                {item.item}
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteItem(item.id)}>🗑️</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}