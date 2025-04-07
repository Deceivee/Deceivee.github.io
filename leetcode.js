var twoSum = function (nums, target) {
  const cache = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (cache.has(target - nums[i])) {
      return [cache.get(target - nums[i]), i];
    }
    cache.set(nums[i], i);
  }
};
console.log(twoSum([2, 7, 11, 15], 9));

function deepClone(target, cache = new WeakMap()) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  if (cache.has(target)) {
    return cache.get(target);
  }
  const result = Array.isArray(target) ? [] : {};
  cache.set(target, result);
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      result[key] = deepClone(target[key], cache);
    }
  }
  return result;
}

function throttle(fn, delay) {
  let lastTime = Date.now();
  return function () {
    let now = Date.now();
    if (now - lastTime > delay) {
      lastTime = now;
      fn.apply(this, arguments);
    }
  };
}
//找到数组中没有出现的最小正整数，要求时间复杂度O（n）、空间复杂度O（1）
function findMinPositive(nums) {
  // 第一步：将数组中的数字放到正确的位置
  for (let i = 0; i < nums.length; i++) {
    while (
      nums[i] > 0 &&
      nums[i] <= nums.length &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    }
  }

  // 第二步：遍历数组，找到第一个位置不正确的数字
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // 如果所有位置都正确，则返回数组长度+1
  return nums.length + 1;
}

// 测试用例
console.log(findMinPositive([3, 4, -1, 1])); // 输出: 2
console.log(findMinPositive([1, 2, 0])); // 输出: 3
console.log(findMinPositive([7, 8, 9, 11, 12])); // 输出: 1
