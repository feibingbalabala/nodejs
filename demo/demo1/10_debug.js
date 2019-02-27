function fun () {
  let a = parseInt(Math.random() * 10);
  let b = parseInt(Math.random() * 10);
  let c = add(a, b)
}
function add (a, b) {
  if (a > b) {
    a += a * 2
  } else {
    b -= a
  }
  return a + b
}
fun()