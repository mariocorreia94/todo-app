import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoForm from './TodoForm'
import SideMenu from './SideMenu'
import Notification from './Notification'
import { Todo } from '../types/todo'

const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (todoData: { title: string; description?: string; dueDate: string }) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      })
      if (response.ok) {
        const newTodo = await response.json()
        setTodos([...todos, newTodo])
        showNotification('Todo added successfully!', 'success')
      } else {
        showNotification('Failed to add todo. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error adding todo:', error)
      showNotification('Failed to add todo. Please check your connection.', 'error')
    }
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      message,
      type,
      isVisible: true
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }))
  }

  const getTodayTodosCount = () => {
    const today = new Date().toISOString().split('T')[0]
    return todos.filter(todo => {
      const todoDate = todo.dueDate.split('T')[0]
      return todoDate === today
    }).length
  }

  const getOverdueTodosCount = () => {
    const today = new Date().toISOString().split('T')[0]
    return todos.filter(todo => {
      const todoDate = todo.dueDate.split('T')[0]
      return todoDate < today && !todo.completed
    }).length
  }

  const handleTodayClick = () => {
    navigate('/today')
  }

  const handleOverdueClick = () => {
    navigate('/overdue')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SideMenu todos={todos} onSearch={() => {}} />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      <div className="ml-64 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Welcome to Your Todo Dashboard
          </h1>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Today's Todos Card */}
            <button
              onClick={handleTodayClick}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-200 cursor-pointer text-left"
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800">{getTodayTodosCount()}</h2>
                  <p className="text-gray-600">Todos Due Today</p>
                </div>
              </div>
            </button>

            {/* Overdue Todos Card */}
            <button
              onClick={handleOverdueClick}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-200 cursor-pointer text-left"
            >
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-full">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800">{getOverdueTodosCount()}</h2>
                  <p className="text-gray-600">Overdue Todos</p>
                </div>
              </div>
            </button>
          </div>

          {/* Todo Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Todo</h2>
            <TodoForm onAdd={addTodo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
