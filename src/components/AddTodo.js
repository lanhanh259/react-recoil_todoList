import moment from 'moment'
import React, { useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { todoListState } from '../recoil_state'

function nextTodoId(list) {
	const maxId = list.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
	return maxId + 1
}
const AddTodo = () => {
	const [inputValue, setInputValue] = useState('')
	const setList = useSetRecoilState(todoListState)

	const inputRef = useRef()

	const handleAddTodo = (e) => {
		e.preventDefault()
		if (inputValue.trim()) {
			setList((oldList) => {
				const newList = [
					...oldList,
					{
						id: nextTodoId(oldList),
						data: inputValue,
						date: moment(),
					},
				]
				return newList
			})
		}
		setInputValue('')
		inputRef.current.focus()
	}
	return (
		<form>
			<input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Add todo"
				ref={inputRef}
			></input>
			<button onClick={handleAddTodo}>
				<i className="fal fa-plus-circle "></i>
			</button>
		</form>
	)
}

export default AddTodo
