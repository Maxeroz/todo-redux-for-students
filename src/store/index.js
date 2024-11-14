import { createStore } from 'redux';

let countId = 0;

const defaultState = [
    {
        id: countId++,
        text: 'Помыть кота',
        status: true,
    },
];

const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: countId++,
                    text: action.text,
                    status: false,
                },
            ];
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.id);

        // Возвращаем новое состояние при type = COMPLETE_TODO.
        case 'COMPLETE_TODO':
            return state.map((todo) =>
                todo.id === action.id ? { ...todo, status: !todo.status } : todo
            );
        default:
            return state;
    }
};

// Action Creator функция.
export function completeTodo(id) {
    return {
        type: 'COMPLETE_TODO',
        id,
    };
}

export const store = createStore(todoReducer);
