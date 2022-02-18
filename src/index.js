import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import Detail from './components/Detail'
import './index.css'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<Link
					to={'/'}
					style={{
						padding: '10px 0',
						marginBottom: '20px',
						backgroundColor: '#34b3e3',
						textAlign: 'center',
					}}
				>
					<h1>
						React with<span style={{ fontWeight: 400 }}> Recoil</span>
					</h1>
				</Link>
				<Routes>
					<Route path="/" element={<App />}></Route>
					<Route path=":indexTodo" element={<Detail />}></Route>
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
