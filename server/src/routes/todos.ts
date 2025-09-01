import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all todos
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

// Create a new todo
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' })
    }

    if (!dueDate) {
      return res.status(400).json({ error: 'Due date is required' })
    }

    const parsedDueDate = new Date(dueDate)
    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ error: 'Invalid due date format' })
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        dueDate: parsedDueDate,
        completed: false
      }
    })
    
    res.status(201).json(todo)
  } catch (error) {
    console.error('Error creating todo:', error)
    res.status(500).json({ error: 'Failed to create todo' })
  }
})

// Update a todo
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, dueDate, completed } = req.body
    const todoId = parseInt(id)
    
    if (isNaN(todoId)) {
      return res.status(400).json({ error: 'Invalid todo ID' })
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id: todoId }
    })

    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      return res.status(400).json({ error: 'Title must be a non-empty string' })
    }

    if (dueDate !== undefined) {
      const parsedDueDate = new Date(dueDate)
      if (isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({ error: 'Invalid due date format' })
      }
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        title: title !== undefined ? title.trim() : undefined,
        description: description !== undefined ? (description?.trim() || null) : undefined,
        dueDate: dueDate !== undefined ? new Date(dueDate) : undefined,
        completed: completed !== undefined ? completed : undefined
      }
    })
    
    res.json(updatedTodo)
  } catch (error) {
    console.error('Error updating todo:', error)
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

// Toggle todo completion status
router.patch('/:id/toggle', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const todoId = parseInt(id)
    
    if (isNaN(todoId)) {
      return res.status(400).json({ error: 'Invalid todo ID' })
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id: todoId }
    })

    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { completed: !existingTodo.completed }
    })
    
    res.json(updatedTodo)
  } catch (error) {
    console.error('Error toggling todo:', error)
    res.status(500).json({ error: 'Failed to toggle todo' })
  }
})

// Delete a todo
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const todoId = parseInt(id)
    
    if (isNaN(todoId)) {
      return res.status(400).json({ error: 'Invalid todo ID' })
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id: todoId }
    })

    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    await prisma.todo.delete({
      where: { id: todoId }
    })
    
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting todo:', error)
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

export default router
