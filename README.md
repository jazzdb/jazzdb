# jazzdb

> improvised data store for javascript

## Get Started

### Install

```sh
npm install -S jazzdb
```

## Defining Models

### Properties

- `name` (string) - the model name
- `attributes` (object) - the model attributes
    - &lt;attributeName&gt;
        - `required` (boolean) - is the attribute required?
        - `unique` (boolean) - should the attribute be unique?
        - `type` (string) - the attribute type

### Methods

#### Asynchronus

- `load()` - load model data
- `save()` - save model data

#### Synchronus

- `create(data)` - create a record
- `delete(id)` - delete a record
- `get(id)` - get a record
- `toArray()` - convert records to array
- `update(id, data)` - update a record

### Model Interface

Each model interface should contain types for all of the model attributes.

#### Default Attributes

These attributes are built-in and cannot be overriden.

- `_id` - the record id
- `_createdAt` - when the record was created
- `_deletedAt` - when the record was deleted
- `_updatedAt` - when the record was updated

### Example

```ts
export interface IInstrumentModel extends IModel {
    name: string;
    type: string;
}

export class InstrumentModel extends Model {
    name = 'instruments';
    attributes = {
        name: {
            required: true,
            unique: true,
            type: AttributeTypes.String
        },
        type: {
            required: true,
            type: AttributeTypes.String
        }
    };
    async load(): Promise<InstrumentModel> {
        return super.load();
    }
    async save(): Promise<InstrumentModel> {
        return super.save();
    }
    create(data: IInstrumentModel): IInstrumentModel {
        return super.create(data);
    }
    delete(id: string): IInstrumentModel {
        return super.delete(id);
    }
    get(id: string): IInstrumentModel {
        return super.get(id);
    }
    toArray(): IInstrumentModel[] {
        return super.toArray();
    }
    update(id: string, data: IInstrumentModel): IInstrumentModel {
        return super.update(id, data);
    }
}
```

## Reading / Writing Data

### Load Data

#### Usage

```
.load(): Promise<Model>
```

#### Example

```ts
const data = {
    instruments = await new InstrumentModel().load()
};
```

### Save Data

#### Usage

```
.load(): Promise<Model>
```

#### Example

```ts
await data.instruments.save();
```

## Managing Records

### Create a Record

#### Usage

```ts
.create(data: any)
```

#### Example

```ts
const newInstrument = data.instruments.create({
    name: 'Trumpet',
    type: 'brass'
});
```

### Delete a Record

#### Usage

```ts
.delete(id: string)
```

#### Example

```ts
const deletedInstrument = data.instruments.delete(
    '0f88c85e-2c18-46c8-a61a-22b80de0082e'
);
```

### Get a Record

#### Usage

```ts
.get(id: string)
```

#### Example

```ts
const existingInstrument = data.instruments.get(
    '0f88c85e-2c18-46c8-a61a-22b80de0082e'
);
```

### Update a Record

#### Usage

```ts
.update(id: string, data: any)
```

#### Example

```ts
data.instruments.update(
    '0f88c85e-2c18-46c8-a61a-22b80de0082e',
    {
        name: 'Trombone',
        type: 'brass'
    }
);
```

### Convert Records to Array

Converting records to an array makes it easy to query data using native array methods such as `.find()`, `.map()`, `.reduce()` and others.

#### Usage

```ts
.toArray()
```

#### Example

```ts
// convert instrument records to array
const instrumentsArray = data.instruments.toArray();

// find active instruments
const activeInstruments = instrumentsArray.filter((instrument) => {
    return instrument.status === 'active';
});

// sort instruments
const sortedInstruments = instrumentsArray.sort((instrument) => {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    }
    return 0;
});
```