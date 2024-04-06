export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return { ...state, [action.key]: action.value };
        case 'GET':
            return state[action.key];
        default:
            return state;
    }
};
