/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable import/newline-after-import */
/* eslint-disable semi */
const alert = require('alert');

const res = require('express');
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const sessions = require('express-session')
const { append } = require('express/lib/response');
hbs.registerPartials(__dirname + '/src/views/partials')
const { createSecretKey } = require('crypto');
const { pb } = require('./PB')
const { db } = require('./DB')
const { checkAuth } = require('./src/views/middlewares/chechAuth');
const server = express()
server.set('view engine', 'hbs')
server.set('views', path.join(process.cwd(), 'src', 'views'))
server.set('cookieName', 'sid')
server.use(express.json())
const secretKey = 'aaaaa'
// принимаем данные из формы
server.use(express.urlencoded({ extended: true }))
server.use(sessions({
  name: server.get('cookieName'),
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
    cookie: {
    httpOnly: true,
    maxAge: 86480 * 1e3,
  },
}))
server.use(express.static(path.join(process.cwd(), 'public')))

const PORT = 3000
server.get('/auth/signup', (req, res) => {
res.render('signUp')
})
server.post('/auth/signup', (req, res) => {
  const { name, email, password } = req.body
  pb.users.push({
    name,
    email,
    password,
  })
    req.session.user = {
    email,
  }
  res.redirect('/')
  })
  server.use((req, res, next) => {
   const currentEmail = req.session?.user?.email
    if (currentEmail) {
      const currentUser = pb.users.find((user) => user.email === currentEmail)
res.locals.name = currentUser.name
      }
next()
 })
  server.get('/auth/signin', (req, res) => {
    res.render('signIn')
    })
    server.post('/auth/signin', (req, res) => {
      const { email, password } = req.body
      const currentUser = pb.users.find((user) => user.email === email)
      if (currentUser) {
if (currentUser.password === password) {
  req.session.user = {
    email,
  }
   return res.redirect('/')
}
  }
     return res.redirect('/auth/signin')
            })

/* делаем проверку на регистрацию
server.get('/', checkAuth, (req, res) => {
  res.render('main')
}) */
/* удаляем куку */
  server.get('/auth/signout', (req, res) => {
req.session.destroy((err) => {
  if (err) return res.redirect('/')
  res.clearCookie(req.app.get('cookieName'))
return res.redirect('/')
  })
})

     server.get('/', checkAuth, function (req, res) {
  const usersQuery = req.query
  let kotikiForRender = db.kotiki
  for (let i = 0; i < kotikiForRender.length - 4; i++) {
    if (kotikiForRender[i].opisanie === 'delet') {
      kotikiForRender.splice(i, 1)
    }
    if (kotikiForRender[i].opisanie === 'delet') {
      kotikiForRender.splice(i, 1)
    }
  }
  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    kotikiForRender = db.kotiki.slice(0, usersQuery.limit)
  }
  if (usersQuery.reverse !== undefined && usersQuery.reverse === 'true') {
    kotikiForRender = db.kotiki.reverse()
  }
  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false && usersQuery.reverse !== undefined && usersQuery.reverse === 'true') {
    kotikiForRender = db.kotiki.slice(0, usersQuery.limit)
    kotikiForRender = kotikiForRender.reverse()
  }
         res.render('main', { listOfKotiki: kotikiForRender })
})
server.post('/kotohran', (req, res) => {
  const currentEmail = req.session?.user?.email
    if (currentEmail) {
      const currentUser = pb.users.find((user) => user.email === currentEmail)
const dataFromForm = req.body
db.kotiki.unshift(dataFromForm)
db.kotiki[0].id = currentUser.email

  res.redirect('/')
}
})

server.patch('/kotiki/:id', (req, res) => {
    const { id } = req.params
    const { action } = req.body
    const currentKot = db.kotiki.find((el) => el.id === id)
    const currentEmail = req.session?.user?.email
    if (currentEmail) {
      const currentUser = pb.users.find((user) => user.email === currentEmail)
      if (currentUser.email === currentKot.id) {
         if (action === 'delete') {
            currentKot.opisanie = 'delet'
                }
    res.json({
            opisanie: currentKot.opisanie,
          })
        } else {
          alert('Это не твой котег!')
        }
}
})
 // Затычка на 404
server.get('*', function (req, res) {
    res.send(` <div>
    <h1>404</h1>
    <a href='/'>Link to main page</a>
    </div>`)
  })
// Сообщение об успешном запуске
server.listen(PORT, () => {
console.log(`Server has been started on port: ${PORT}`)
})