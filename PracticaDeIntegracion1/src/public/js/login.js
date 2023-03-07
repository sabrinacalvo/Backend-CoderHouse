const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => obj[key] = value)

  const url = '/auth'
  const headers = {
   'Content-Type': 'application/json; charset=utf-8'
  }
  const method = 'POST'
  
  const body = JSON.stringify(obj)

  console.log("Body: ",body)

  fetch(url, {
    headers,
    method,
    body
  })
    .catch(error => console.log(error))
})