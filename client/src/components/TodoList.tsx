import { useState } from 'react'
import { Todo } from '../types/todo'
import TodoEdit from './TodoEdit'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, updatedTodo: Partial<Todo>) => void
}

const TodoList = ({ todos, onToggle, onDelete, onUpdate }: TodoListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null)

  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No todos yet. Add one above!
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = (id: number, updatedTodo: Partial<Todo>) => {
    onUpdate(id, updatedTodo)
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          {editingId === todo.id ? (
            <TodoEdit
              todo={todo}
              onSave={(updatedTodo) => handleSave(todo.id, updatedTodo)}
              onCancel={handleCancel}
            />
          ) : (
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3
                    onClick={() => handleEdit(todo.id)}
                    className={`text-lg font-medium cursor-pointer hover:text-blue-600 transition-colors ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Due: {formatDate(todo.dueDate)}
                    </span>
                    <button
                      onClick={() => onDelete(todo.id)}
                      className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {todo.description && (
                  <p
                    className={`text-gray-600 ${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Created: {formatDate(todo.createdAt)}</span>
                  <span>Updated: {formatDate(todo.updatedAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TodoList
