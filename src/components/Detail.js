import moment from 'moment'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { activeTodoState, todoListState } from '../recoil_state'

const Detail = () => {
	const [isEditing, setIsEditing] = useState(false)
	const [updateData, setUpdateData] = useState('')
	const [updateId, setUpdateId] = useState('')

	const [list, setList] = useRecoilState(todoListState)
	const [activeTodo, setActiveTodo] = useRecoilState(activeTodoState)

	const indexActiveTodo = list.findIndex((item) => item.id === activeTodo?.id)
	const handleUpdate = () => {
		const newList = [...list]

		const mylist = newList.map((item, indexItem) => {
			if (indexItem === indexActiveTodo) {
				const newItem = {
					...activeTodo,
					id: updateId,
					data: updateData,
					date: moment(),
				}
				setActiveTodo(newItem)
				return newItem
			}
			return item
		})
		setList(mylist)

		setIsEditing(false)
	}

	const handleDelete = () => {
		const newList = [...list]
		newList.splice(indexActiveTodo, 1)
		setList(newList)
		setActiveTodo(null)
	}

	return (
		activeTodo && (
			<div className="item">
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
					<span style={{ flex: 1 }}>
						<span>{activeTodo.id}. </span>
						<span
							style={{
								padding: 12,
								minWidth: '50%',
								display: 'inline-block',
								fontWeight: 500,
								textAlign: 'center',
							}}
						>
							{activeTodo.data}
						</span>
						<span style={{ floatRight: 'right' }}>
							{moment(activeTodo.date).format(`DD/MM/YYYY hh:mm:ss A`)}
						</span>
					</span>
				)}
				<span>
					<button className="btn" onClick={() => setIsEditing(true)}>
						<i className="far fa-edit"></i>
					</button>
					<button className="btn" onClick={handleDelete}>
						<i className="far fa-times"></i>
					</button>
				</span>
			</div>
		)
	)
}

export default Detail
