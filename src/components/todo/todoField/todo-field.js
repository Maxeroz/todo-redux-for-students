import { React, useRef, useState } from 'react';
import './todo-field.css';
import { useDispatch } from 'react-redux';
import { completeTodo } from '../../../store';

const TodoField = ({ text, id, status }) => {
    const [disabled, setDisabled] = useState(false);
    const [fieldValue, setFieldValue] = useState(text);
    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const deleteTodo = () => {
        dispatch({ type: 'DELETE_TODO', id: id });
    };

    const showInput = () => {
        setDisabled((prev) => !prev);
        setTimeout(() => {
            inputRef.current.focus();
        }, 100);
    };

    const changeField = (e) => {
        setFieldValue(e.target.value);
    };

    const keyDownField = (e) => {
        if (e.key === 'Enter') {
            inputRef.current.blur();
        }
    };

    // Функция handler для отметки task = выполнено.
    const handleComplete = () => dispatch(completeTodo(id));

    return (
        <div className="fieldWraper">
            {disabled ? (
                <input
                    value={fieldValue}
                    className="toDoField"
                    onBlur={() => setDisabled((prev) => !prev)}
                    onChange={changeField}
                    onKeyDown={keyDownField}
                    ref={inputRef}
                />
            ) : (
                <span
                    className={`toDoPharagraph ${
                        status ? 'toDoPharagraphDone' : 'totoDoPharagraphActive'
                    }`}
                    onClick={showInput}
                >
                    {fieldValue}
                </span>
            )}
            <button className="delBtn" onClick={deleteTodo}>
                🗑️
            </button>
            <button className="complitedBtn" onClick={handleComplete}>
                ✔️
            </button>
        </div>
    );
};

export default TodoField;
