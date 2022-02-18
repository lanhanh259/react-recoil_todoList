import moment from 'moment'
import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { activeTodoState, todoListState } from '../recoil_state'

const TodoItem = ({ item, index }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [updateData, setUpdateData] = useState('')
	const [updateId, setUpdateId] = useState('')

	const [list, setList] = useRecoilState(todoListState)
	const setActiveTodo = useSetRecoilState(activeTodoState)

	const handleUpdate = () => {
		const newList = list.map((item, indexItem) => {
			if (indexItem === index)
				return {
					...item,
					id: updateId,
					data: updateData,
					date: moment(),
				}
			return item
		})
		setList(newList)
		setIsEditing(false)
	}

	const handleDelete = () => {
		const newList = [...list]
		newList.splice(index, 1)
		setList(newList)
	}
	const handleClickItem = () => {
		setActiveTodo(item)
	}
	return (
		<li>
			{isEditing ? (
				<>
					<input
						value={updateId}
						onChange={(e) => setUpdateId(e.target.value)}
						placeholder="id"
					/>
					<input
						value={updateData}
						onChange={(e) => setUpdateData(e.target.value)}
						placeholder="job name"
					/>
					<button className="btn" onClick={handleUpdate}>
						Save
					</button>
				</>
			) : (
				<Link to={`${index}`} onClick={handleClickItem}>
					<span>{item.id}. </span>
					<span
						style={{
							padding: 12,
							minWidth: '120px',
							display: 'inline-block',
							fontWeight: 500,
						}}
					>
						{item.data}
					</span>
					<span style={{ floatRight: 'right' }}>
						{moment(item.date).format(`DD/MM/YYYY hh:mm:ss A`)}
					</span>
				</Link>
			)}
			<button className="btn" onClick={() => setIsEditing(true)}>
				<i className="far fa-edit"></i>
			</button>
			<button className="btn" onClick={handleDelete}>
				<i className="far fa-times"></i>
			</button>
		</li>
	)
}

export default memo(TodoItem)
