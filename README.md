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

### Create a Record

```js
await Users.init();

users.push({
    email: 'test@domain.com',
    password: 'password'
});

users.save();
```
