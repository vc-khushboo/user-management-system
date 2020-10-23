const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./server/users.json');
const userdb = JSON.parse(fs.readFileSync('./server/users.json', 'UTF-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
  const userss = JSON.parse(fs.readFileSync('./server/users.json', 'UTF-8'));
  return userss.users.find(
    (user) => user.username == username && user.password == password
  );
}

function isExist({ username }) {
  const userList = JSON.parse(fs.readFileSync('./server/users.json', 'UTF-8'));
  console.log(userList);
  return userList.users.find((user) => user.username === username);
}

// Add New User
server.post('/user/add', (req, res) => {
  console.log('register endpoint called; request body:');
  console.log(req.body);
  const { username, password, phone, address, age, name } = req.body;

  if (isExist({ username })) {
    const status = 400;
    const message = 'Username and Password already exist';
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile('./server/users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      username: username,
      password: password,
      userrole: '2',
      age: age,
      address: address,
      phone: phone,
      name: name,
    }); //add some data
    var writeData = fs.writeFile(
      './server/users.json',
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  res.status(200).json({ result: 'success' });
});

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log('login endpoint called; request body:');
  console.log(req.body);
  const { username, password } = req.body;
  const user = isAuthenticated({ username, password });
  console.log(user);
  if (!isAuthenticated({ username, password })) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ username, password });
  console.log('Access Token:' + access_token);
  res.status(200).json({
    token: access_token,
    user: { username: user.username, userrole: user.userrole, id: user.id },
  });
});

// Edit User
server.put('/user/edit', (req, res) => {
  console.log('edit user endpoint called; request body:');
  console.log(req.body);
  req.body.userrole = '2';
  const { username, id } = req.body;

  fs.readFile('./server/users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    var data = JSON.parse(data.toString());

    const checkUser = data.users.find(
      (user) => user.username === username && user.id !== id
    );
    if (checkUser) {
      const status = 400;
      const message = 'Username already exist';
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var foundIndex = data.users.findIndex((user) => user.id === id);
    console.log(foundIndex);
    data.users[foundIndex] = req.body;
    //Add new user
    var writeData = fs.writeFile(
      './server/users.json',
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
    res.status(200).json({ result: 'success' });
  });
});

// Edit User
server.get('/user/:userId', (req, res) => {
  console.log('get user endpoint called; request id:');
  console.log(req.params);
  const userId = Number(req.params.userId);

  fs.readFile('./server/users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    var data = JSON.parse(data.toString());
    // Get current users data
    var userInfo = data.users.find((user) => user.id === userId);
    res.status(200).json(userInfo);
  });
});

server.get('/users', (req, res) => {
  fs.readFile('./server/users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    var data = JSON.parse(data.toString());
    const result = data.users.filter((el) => el.userrole === '2');
    res.status(200).json(result);
  });
});

server.put('/profile', (req, res) => {
  console.log(req.body);
  req.body.userrole = '2';
  const { password, phone, address, age, id, name } = req.body;

  fs.readFile('./server/users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    var data = JSON.parse(data.toString());

    // Get current users data
    var foundIndex = data.users.findIndex((user) => user.id === id);
    var userDetails = data.users.find((user) => user.id === id);
    userDetails.password = password;
    userDetails.age = age;
    userDetails.address = address;
    userDetails.phone = phone;
    userDetails.name = name;
    data.users[foundIndex] = userDetails;

    //Add new user
    var writeData = fs.writeFile(
      './server/users.json',
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
    res.status(200).json({ result: 'success' });
  });
});

server.delete('/user/:userId', (req, res) => {
  console.log('get user endpoint called; request id:');
  console.log(req.params);
  const userId = Number(req.params.userId);

  fs.readFile('./server/users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    var data = JSON.parse(data.toString());
    var foundIndex = data.users.findIndex((user) => user.id === userId);
    data.users.splice(foundIndex, 1);

    // Get current users data
    var writeData = fs.writeFile(
      './server/users.json',
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
    res.status(200).json({ result: 'success' });
  });
});

server.use(router);

server.listen(8000, () => {
  console.log('Run Auth API Server');
});
