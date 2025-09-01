import { useState } from 'react'
import { Todo } from '../types/todo'

interface TodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => void
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate || new Date().toISOString().split('T')[0]
      })
      setTitle('')
      setDescription('')
      setDueDate('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
        <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Todo
          </button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm
