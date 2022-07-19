// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const swaggerUI = require('swagger-ui-express');

// const indexRouter = require('./routes/index');
// const customerRouter = require('./routes/customer');
// const usersRouter = require('./routes/users');
// const sellerRouter = require('./routes/sellers');
// const authRouter = require('./routes/auth');
// const itemRouter = require('./routes/item');
// const orderRoute = require('./routes/order');
// const categoryRouter = require('./routes/category');
// const swaggerDoc = require ('./api-docs');

// const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// app.use('/', indexRouter);
// app.use('/customers', customerRouter);
// app.use('/users', usersRouter);
// app.use('/sellers', sellerRouter);
// app.use('/auth', authRouter);
// app.use('/items', itemRouter);
// app.use('/orders', orderRoute);
// app.use('/categories', categoryRouter);

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


//<<<<<<<<<< FOR CHAT TEST >>>>>>>>>>> (localhost:3000/chat)
const express = require ('express');
const app = express();
const server = require('http').Server(app);
const cors = require ('cors');
const io = require ('socket.io')(server,{cors:{origin:"*"}})

app.set('views','./views')
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

const rooms = {}
const users = {}

app.get('/chat',(req,res)=>{
    res.render('chat', {rooms: rooms})
})

server.listen(3000, ()=>{
    console.log("Server is running on port", 3000);
})

io.on('connection', (socket) => {
    socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    })
  })