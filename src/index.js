const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000
const USERS_FILE = path.join(__dirname, 'users.json')
app.use(express.json())

const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    throw new Error('Error reading users file')
  }
}

const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8')
  } catch (error) {
    throw new Error('Error writing to users file')
  }
}

app.get('/users', (req, res) => {
  try {
    const users = readUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message })
  }
})

app.get('/users/:id', (req, res) => {
  try {
    const users = readUsers()
    const id = Number(req.params.id)
    const user = users.find((u) => u.id === id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message })
  }
})

app.post('/users', (req, res) => {
  try {
    const users = readUsers()
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: req.body.name,
    }
    users.push(newUser)
    writeUsers(users)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message })
  }
})

app.put('/users/:id', (req, res) => {
  try {
    const users = readUsers()
    const id = Number(req.params.id)
    const userIndex = users.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' })
    }
    users[userIndex].name = req.body.name
    writeUsers(users)
    res.json(users[userIndex])
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message })
  }
})

app.delete('/users/:id', (req, res) => {
  try {
    let users = readUsers()
    const id = Number(req.params.id)
    const newUsers = users.filter((u) => u.id !== id)
    if (users.length === newUsers.length) {
      return res.status(404).json({ error: 'User not found' })
    }
    writeUsers(newUsers)
    res.json(newUsers)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
