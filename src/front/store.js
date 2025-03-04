
export const initialStore = () => {
  return {
    message: null,
    authToken: localStorage.getItem('authToken') || null,  
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    
    case 'set_auth_token':
      localStorage.setItem('authToken', action.payload); 
      return {
        ...store,
        authToken: action.payload
      };

    
    case 'clear_auth_token':
      localStorage.removeItem('authToken'); 
      return {
        ...store,
        authToken: null
      };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    default:
      throw Error('Unknown action.');
  }
}
