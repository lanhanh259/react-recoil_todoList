import { atom } from 'recoil'

const todoListState = atom({
	key: 'todoListState',
	default: [],
	effects: [
		({ setSelf }) => {
			setSelf(JSON.parse(localStorage.getItem('list')))
		},
		({ onSet }) => {
			onSet((newTodo, oldTodo) => {
				localStorage.setItem('list', JSON.stringify(newTodo))
			})
		},
	],
})

const activeTodoState = atom({
	key: 'activeTodoState',
	default: {},
})

export { todoListState, activeTodoState }
