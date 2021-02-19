const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      let newCollection = collection instanceof Array ? collection : Object.values(collection); 

      for (let element of newCollection) {
        callback(element);
      }

      return collection;
    },

    map: function(collection, callback) {
      if (!(collection instanceof Array)) collection = Object.values(collection);
      let newArray = [];

      for (let element of collection) {
        newArray.push(callback(element));
      }

      return newArray;
    },

    reduce: function(collection, callback, acc) {
      if (!acc) {
        acc = collection[0];
        collection = collection.slice(1);
      }

      for (let element of collection) {
        acc = callback(acc, element, collection)
      }

      return acc;
    },

    find: function(collection, predicate) {
      for (let element of collection) {
        if (predicate(element)) return element;
      }

      return undefined;
    },

    filter: function(collection, predicate) {
      let newCollection = [];

      for (let element of collection) {
        if (predicate(element)) newCollection.push(element);
      }

      return newCollection;
    },

    size: function(collection) {
      if (collection instanceof Array) {
        return collection.length;
      } else {
        return Object.keys(collection).length;
      }
    },

    first: function(array, n) {
      return (n) ? array.slice(0, n) : array[0];
    },

    last: function(array, n) {
      return (n) ? array.slice(-n) : array[array.length - 1];
    },

    compact: function(array) {
      let newArray = [];

      for (let element of array) {
        if (element) newArray.push(element);
      }

      return newArray;
    },

    sortBy: function(array, callback) {
      let newArray = [...array];
      
      return newArray.sort(function(a, b) {
        return callback(a) - callback(b);
      })
    },

    unpack: function(newArray, arr) {
      for (let element of arr) {
        newArray.push(element)
      }
    },

    flatten: function(arr, str, newArr=[]) {
      if (!Array.isArray(arr)) return newArr.push(arr);

      if (str === true) {
        for (let element of arr)
          Array.isArray(element) ? this.unpack(newArr, element) : newArr.push(element); 
      } else {
        for (let element of arr) {
          this.flatten(element, false, newArr);
        }
      }

      return newArr;
    },

    uniqSorted: function(arr, callback) {
      let sorted = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
        if (sorted[i - 1] !== arr[i]) sorted.push(arr[i]);
      }
      return sorted;
    },

    uniq: function(arr, isSorted, callback) {
      if (isSorted === true) {
        return fi.uniqSorted(arr, callback)
      } else if (!callback) {
        return Array.from(new Set(arr));
      } else {
        const modifiedArr = new Set();
        const uniqElements = new Set();

        for (let element of arr) {
          const modifiedElement = callback(element);
          
          if (!modifiedArr.has(modifiedElement)) {
            modifiedArr.add(modifiedElement);
            uniqElements.add(element);
          }
        }
        return Array.from(uniqElements);
      }
    },

    keys: function(object) {
      const keys = [];

      for (let element in object) {
        keys.push(element);
      }

      return keys;
    },

    values: function(object) {
      const values = [];

      for (let element in object) {
        values.push(object[element]);
      }

      return values;
    }, 

    functions: function(object) {
      const funcNames = [];

      for (let element in object) {
        if (typeof object[element] === "function") {
          funcNames.push(element);
        }
      }

      return funcNames.sort();
    }
  }
})();

fi.libraryMethod();