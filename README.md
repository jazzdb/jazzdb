# jazzdb

> improvised data store for javascript

## Get Started

```
npm install -S jazzdb
```

## Usage

### Create a Model

```js
const Users = new ModelConfig({
    table: 'users',
    attributes: {
        email: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        password: {
            required: true,
            type: AttributeTypes.String
        }
    }
});
```

### Create Record

```js
const users = await Users.init();

users.push({
    email: 'test@domain.com',
    password: 'password'
});

// persist users
users.save();
```

### Get Record

```js
const users = await Users.init();

const foundUser = users.find((user) => {
    return user.id === '0f88c85e-2c18-46c8-a61a-22b80de0082e';
});
```

### Find Records

```js
const users = await Users.init();

const foundUsers = users.filter((user) => {
    return user.status === 'active';
});
```

### Update Record

```js
const users = await Users.init();

const user = users.find((u) => {
    return u.id === '0f88c85e-2c18-46c8-a61a-22b80de0082e';
});
user.email = 'new-email@domain.com';

// persist users
users.save();
```

### Delete Record

```js
const users = await Users.init();

const userIndex = users.findIndex((u) => {
    return u.id === '0f88c85e-2c18-46c8-a61a-22b80de0082e';
});

users.splice(userIndex, 1);

// persist users
users.save();
```

### Sort Records

```js
const users = await Users.init();

const sortedUsers = users.sort((user) => {
    if (a.email > b.email) {
        return -1;
    } else if (a.email > b.email) {
        return 1;
    }
    return 0;
});
```