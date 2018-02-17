const { each } = require('./underbar-pt1');

/**
 * OBJECTS
 * =======
 *
 * In this section, we'll look at a couple of helpers for merging objects.
 */

// Extend a given object with all the properties of the passed in
// object(s).
//
// Example:
//   var obj1 = {key1: "something"};
//   _.extend(obj1, {
//     key2: "something new",
//     key3: "something else new"
//   }, {
//     bla: "even more stuff"
//   }); // obj1 now contains key1, key2, key3 and bla
const extend = function(obj) {
  // Hint: remember that Array.from can convert an array-like object to handy-dandy array for you.
  //一番目のオブジェクトを除いたそれ以降の引数を、Callbackで処理する
  each(Array.from(arguments).slice(1), function(object) {
    //オブジェクトのプロパティをを順に拡張したいオブジェクトに追加する
    each (object, function(value, key) {
      obj[key] = value;
    });
  });
  return obj;
};

// Like extend, but doesn't ever overwrite a key that already
// exists in obj
const defaults = function(obj) {
  // Your code here
  each(Array.from(arguments).slice(1), function(object) {
    //オブジェクトのプロパティをを順に拡張したいオブジェクトに追加する
    each (object, function(value, key) {
      (obj[key] === undefined) && (obj[key] = value);
    });
  });
  return obj;
};

/**
 * FUNCTIONS
 * =========
 *
 * Now we're getting into function decorators, which take in any function
 * and return out a new version of the function that works somewhat differently
 */

// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
const once = function(func) {
  // Hint: you're going to need to return another function that you create inside this function.
  //既に呼ばれたか
  let hasCalled = false;
  let result; 
  //関数を返す
  return function() {
    if(!hasCalled) {
      //呼ばれていないなら関数を返す
      result =  func.apply(this, arguments); //retultになっていた->eslintを導入
      hasCalled = true;
    }
    //既に呼ばれているときは何を返そう=>前に返したものと同じもの
    return result;
  };
};

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
// どういうこと?
const memoize = function(func) {
  // Hint: look up Function.apply
  // Your code here
  let cache = {};
  return function() {
    var args = JSON.stringify(arguments);
    if(!cache[args]) { //このへんの書き方、 nullやundefinedにあたりに弱い
      cache[args] = func.apply(func, arguments);
    }
    return cache[args];
  };
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms
const delay = function(func, wait) {
  // Hint: delay things with the global function setTimeout()
  // Hint: look up Function.apply
  //const args = arguments.slice(2);
  const args = Array.prototype.slice.call(arguments, 2);
  //funcをよぶ(apply, call)
  //2(1)番目の引数waitで遅延時間を設定(setTimeout)
  setTimeout(function() {
    return func.apply(null, args);
  }, wait);
  //スライスした後ろの引数をつかって関数を呼ぶ
};

// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
const shuffle = function(arr) {
  // Hint: See http://bost.ocks.org/mike/shuffle/ for an in-depth explanation of the
  // Fisher-Yates Shuffle
  //配列のコピーをつくる
  let array = arr.slice();
  let arrayLength = array.length; //とってこれる？AutoCompleteが弱いのでわかりにくい
  let temp, swapIndex;
  //入れ替えのロジック
  for (var i = 0; i < arrayLength; i++ ) {
    swapIndex = Math.floor(Math.random() * i);
    temp = array[i];
    array[i] = array[swapIndex];
    array[swapIndex] = temp;
  }
  //要素の回数だけ,idxの要素を任意の要素と入れ替える(情報工学的に覚えているが証明可能？)
  return array;
};

module.exports = {
  extend: extend,
  defaults: defaults,
  once: once,
  memoize: memoize,
  delay: delay,
  shuffle: shuffle
};
