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
    const { text } = req.body
    
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required and must be a non-empty string' })
    }

    const todo = await prisma.todo.create({
      data: {
        text: text.trim(),
        completed: false
      }
    })
    
    res.status(201).json(todo)
  } catch (error) {
    console.error('Error creating todo:', error)
    res.status(500).json({ error: 'Failed to create todo' })
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
