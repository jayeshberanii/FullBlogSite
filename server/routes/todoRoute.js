const Authorize = require('../Auth/Authorize')
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo, getPersonalTodos } = require('../controller/todocontroller')

const route = require('express').Router()

route.post('/', Authorize, getTodos)
route.post('/personal', Authorize, getPersonalTodos)
route.get('/:id', Authorize, getTodo)
route.post('/create', Authorize, createTodo)
route.put('/:id', Authorize, updateTodo)
route.delete('/:id', deleteTodo)

module.exports = route
