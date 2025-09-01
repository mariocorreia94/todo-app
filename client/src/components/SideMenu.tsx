import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../types/todo'

interface SideMenuProps {
  todos: Todo[]
  onSearch: (query: string) => void
}

const SideMenu: React.FC<SideMenuProps> = ({ todos, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim() === '') {
      onSearch('')
    }
  }

  const handleTodayClick = () => {
    navigate('/today')
  }

  const handleOverdueClick = () => {
    navigate('/overdue')
  }

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Search Section */}
      <div className="p-4 border-b border-gray-200">
        <form onSubmit={handleSearch} className="space-y-3">
          <input
            type="text"
            placeholder="Search TODOs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {/* Menu Section */}
      <div className="p-4">
        <div className="space-y-2">
          {/* My TODOs Main Menu */}
          <div className="space-y-1">
            <div className="text-lg font-semibold text-gray-800 py-2">
              My TODOs
            </div>
            
            {/* Sub-menu items */}
            <div className="ml-4 space-y-1">
              <button 
                onClick={handleTodayClick}
                className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">Today</span>
              </button>
              
              <button 
                onClick={handleOverdueClick}
                className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-gray-700">Overdue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
