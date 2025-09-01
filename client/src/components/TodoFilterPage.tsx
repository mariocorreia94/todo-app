import { useState, useEffect } from 'react'
import { Todo } from '../types/todo'
import SideMenu from './SideMenu'

interface TodoFilterPageProps {
  filterType: 'overdue' | 'today'
}

const TodoFilterPage: React.FC<TodoFilterPageProps> = ({ filterType }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

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

  const toggleTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}/toggle`, {
        method: 'PATCH',
      })
      if (response.ok) {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
      }
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id))
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const getFilteredTodos = () => {
    const today = new Date().toISOString().split('T')[0]
    
    if (filterType === 'today') {
      return todos.filter(todo => {
        const todoDate = todo.dueDate.split('T')[0]
        return todoDate === today
      }).sort((a, b) => {
        // Incomplete todos first, then completed todos
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        // If both have same completion status, sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    } else if (filterType === 'overdue') {
      return todos.filter(todo => {
        const todoDate = todo.dueDate.split('T')[0]
        return todoDate < today && !todo.completed
      }).sort((a, b) => {
        // Sort overdue todos by due date (most overdue first)
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
    }
    
    return []
  }

  const getPageTitle = () => {
    return filterType === 'today' ? 'Todos Due Today' : 'Overdue Todos'
  }

  const getPageIcon = () => {
    if (filterType === 'today') {
      return (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    } else {
      return (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    }
  }

  const filteredTodos = getFilteredTodos()

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
      <div className="ml-64 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-gray-100 rounded-full mr-4">
              {getPageIcon()}
            </div>
            <h1 className="text-4xl font-bold text-gray-800">{getPageTitle()}</h1>
          </div>

          {/* Todo Count */}
          <div className="text-center mb-8">
            <p className="text-xl text-gray-600">
              {filteredTodos.length} {filterType === 'today' ? 'todo(s) due today' : 'overdue todo(s)'}
            </p>
          </div>

          {/* Todo List */}
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">✓</div>
              <p className="text-xl text-gray-600">
                {filterType === 'today' 
                  ? 'No todos due today!' 
                  : 'No overdue todos!'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                    todo.completed 
                      ? 'border-green-500 bg-green-50' 
                      : filterType === 'overdue' 
                        ? 'border-red-500' 
                        : 'border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <h3 className={`text-lg font-semibold ${
                          todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}>
                          {todo.title}
                        </h3>
                      </div>
                      {todo.description && (
                        <p className={`text-gray-600 mb-3 ${
                          todo.completed ? 'line-through' : ''
                        }`}>
                          {todo.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                        <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoFilterPage
