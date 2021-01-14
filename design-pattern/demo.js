class EventBus {
  events = new Map();

  emit(type, ...args) {
    if (this.events.has(type)) {
      this.events.get(type)(...args);
    }
  }

  on(type, fn) {
    this.events.set(type, fn);
  }

  off(type) {
    if (this.events.has(type)) {
      this.events.delete(type);
    }
  }
}

arr = [1, 2, 4, 2, 1, 5];

function fn(arr) {
  const newArr = [];
  for (const item of arr) {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  }
  return newArr;
}

console.log(1);
setTimeout(() => {
  console.log(2);
});
let asyncFn = (a) => {
  return new Promise((resolve, reject) => {
    console.log(3);
    setTimeout(() => {
      console.log(4);
      resolve(a);
    });
  });
};

let data = await asyncFn(5);
console.log(data);

1, 3, 2, 4, 5;

const sku = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
  ["C1", "C2", "C3"],
];

function generate(sku) {
  function fn(first, last) {
    const list = [];
    for (let one of first) {
      for (const two of last) {
        list.push(`${one}-${two}`);
      }
    }
    return list;
  }

  let first = sku[0];
  for (let i = 1; i < sku.length; i++) {
    first = fn(first, sku[i]);
  }
  return first;
}

function getUserId(cb) {
  setTimeout(() => {
    let id = "1000";
    cb(id);
  }, 1000);
}

function getUserInfo(cb) {
  setTimeout(() => {
    let info = {
      name: "vue",
      age: 10,
    };
    cb(info);
  }, 1000);
}

function promisfy(fn) {
  return new Promise((resolve, reject) => {
    fn(resolve);
  });
}

const userId = await promisfy(getUserId);
console.log(userId);
const userInfo = await promisfy(getUserInfo);
console.log(userInfo);

async function getInfo() {
  setTimeout(() => {
    return "good use";
  }, 1500);
}

function singleInstancePromise(asyncFunc) {
  let promiseInstance = undefined;
  return function(that, ...args) {
    if (promiseInstance) {
      return promiseInstance;
    }
    promiseInstance = asyncFunc
      .bind(that)(...args)
      .then((resp) => {
        promiseInstance = undefined;
        return Promise.resolve(resp);
      })
      .catch((e) => {
        promiseInstance = undefined;
        return Promise.reject(e);
      });
    return promiseInstance;
  };
}
