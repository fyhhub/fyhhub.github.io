const addStrings = (num1, num2) => {
  let res = ''
  let i = num1.length - 1
  let j = num2.length - 1
  let flag = 0
  while(i >= 0 || j >= 0) {
    let sum = flag;
    if (i >= 0) sum += parseInt(num1[i--])
    if (j >= 0) sum += parseInt(num2[j--])

    flag = Math.floor(sum / 10)

    res = sum % 10 + res;
  }

  if (flag > 0) {
    res = flag + res;
  }

  return res;
};

console.log(addStrings("456231421242131414212", "45623142124213141421"));
