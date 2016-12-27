export const survivor =  {
  "name": 'Test',
  "age": 10,
  "gender": 'M',
  "id": '12345',
  "lonlat": 'POINT (5.0 35.0)'
}

export const mySurvivor = {...survivor, id: '31283261', name: 'mySurvivorTest'};

export const items = {
  Water: 4,
  Food: 2,
  Medication: 1,
  Ammunition: 21,
}

export const raw_items = [
  {
    "quantity": 4,
    "item": {
      "name": "Water",
      "points": 4
    }
  },
  {
    "quantity": 2,
    "item": {
      "name": "Food",
      "points": 3
    }
  },
  {
    "quantity": 21,
    "item": {
      "name": "Ammunition",
      "points": 1
    }
  },
  {
    "quantity": 1,
    "item": {
      "name": "Medication",
      "points": 2
    }
  }
]

export const survivorList = [
  survivor, survivor, survivor,
  survivor, survivor, survivor,
  survivor, survivor, survivor,
  survivor, survivor, survivor];

const data = {
  name: survivor.name,
  age: 10,
  gender: 'M',
  location: 'http://zssn-backend-example.herokuapp.com/api/people/456',
  lonlat: 'POINT (1.0 2.0)'
}

export const rawSurvivorList = [
  data, data, data,
  data, data, data,
  data, data, data,
  data, data, data
];
