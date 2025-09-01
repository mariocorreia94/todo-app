import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import TodoFilterPage from './components/TodoFilterPage'
import NotFoundPage from './components/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/overdue" element={<TodoFilterPage filterType="overdue" />} />
        <Route path="/today" element={<TodoFilterPage filterType="today" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
