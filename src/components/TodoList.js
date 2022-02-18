import React from 'react'
import { useRecoilValue } from 'recoil'
import { todoListState } from '../recoil_state'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'

const TodoList = () => {
	const list = useRecoilValue(todoListState)
	return (
		<div>
			<h2>Todo List</h2>
			<AddTodo />
			<ul>
				{Array.isArray(list) &&
					list.map((item, index) => (
						<TodoItem key={item.id} index={index} item={item} />
					))}
			</ul>
		</div>
	)
}

export default TodoList
