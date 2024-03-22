export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_THEME = 'TOGGLE_THEME';


export const addTodo = (data) => ({
    type: ADD_TODO,
    payload: data
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    payload: id
});



