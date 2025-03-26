import React, { useEffect, useState } from "react";
import './style.css';
import './PackingList.css';

export const PackingList = () => {
    const [newItem, setNewItem] = useState({
        item: "",
        category: "",
        destinationType: "",
        checked: false,
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        const get_list = async () => {
            try {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/packinglist");
                if (!resp.ok) {
                    throw new Error("Not able to get the list from the API");
                }
                const data = await resp.json();
                setItems(data);
            } catch (err) {
                console.error("Error fetching list:", err);
            }
        };
        get_list();
    }, []);

    const createItem = async (plItem, category, destinationType) => {
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/packinglist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "item": plItem,
                    "category": category,
                    "destination_type": destinationType,
                    "checked": false,
                }),
            });

            if (!resp.ok) {
                throw new Error(`Failed to add item: ${resp.statusText}`);
            }

            const data = await resp.json();
            setItems([...items, data]); 
            setNewItem({ item: "", category: "", destinationType: "", checked: false }); 
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            console.log("Attempting to delete item with ID:", itemId); // Debugging log
    
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/packinglist/${itemId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
    
            if (!resp.ok) {
                const errorData = await resp.json();
                throw new Error(`Failed to delete item: ${errorData.message || resp.statusText}`);
            }
    
            console.log("Item deleted successfully!"); 
            setItems(items.filter(item => item.id !== itemId)); 
    
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item. Check console for details.");
        }
    };    

    const handleCheckboxChange = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <div className="packing-list-container">
            <h2>ADD A NEW ITEM TO PACK</h2>
            <form onSubmit={(e) => {
                e.preventDefault(); 
                if (newItem.item && newItem.category && newItem.destinationType) {
                    createItem(newItem.item, newItem.category, newItem.destinationType);
                } else {
                    alert("Please fill in all fields before submitting.");
                }
            }}>
                <div className="form-group">
                    <label htmlFor="plItem">Item</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="plItem" 
                        id="plItem" 
                        value={newItem.item} 
                        onChange={(e) => setNewItem({...newItem, item: e.target.value})} 
                        placeholder="Enter New Item"
                    />
                </div>
                <div className="col-auto my-1">
                    <label className="mr-sm-2" htmlFor="categorySelect">Category</label>
                    <select 
                        className="custom-select mr-sm-2"  
                        name="category" 
                        value={newItem.category} 
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})} 
                        id="categorySelect"
                    >
                        <option value="">Choose...</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Toiletries">Toiletries</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Documents">Documents</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col-auto my-1">
                    <label className="mr-sm-2" htmlFor="destinationSelect">Destination Type</label>
                    <select 
                        className="custom-select mr-sm-2"  
                        name="destinationType" 
                        value={newItem.destinationType} 
                        onChange={(e) => setNewItem({...newItem, destinationType: e.target.value})} 
                        id="destinationSelect"
                    >
                        <option value="">Choose...</option>
                        <option value="Beach/Pool">Beach/Pool</option>
                        <option value="Outdoor Adventure">Outdoor Adventure</option>
                        <option value="Resort/Theme Park">Resort/Theme Park</option>
                        <option value="All">All</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h3>PACKING LIST</h3>
            <ul className="list-unstyled">
                {items.map(item => (
                    <li key={item.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        {item.item}
                        <button className="delete-button" onClick={() => deleteItem(item.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
