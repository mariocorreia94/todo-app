import { useNavigate } from 'react-router-dom'
import SideMenu from './SideMenu'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SideMenu todos={[]} onSearch={() => {}} />
      <div className="ml-64 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
              404
            </h1>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The page you're looking for seems to have wandered off into the digital wilderness.
            </p>
          </div>

          {/* Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Main circle */}
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {/* Helpful Links */}
          <div className="text-sm text-gray-500">
            <p className="mb-2">Or try one of these:</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/today')}
                className="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-200"
              >
                Today's Todos
              </button>
              <button
                onClick={() => navigate('/overdue')}
                className="text-red-500 hover:text-red-600 hover:underline transition-colors duration-200"
              >
                Overdue Todos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
