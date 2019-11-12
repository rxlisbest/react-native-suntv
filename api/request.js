let domain = process.env.API_DOMAIN
console.log(domain)

export async function post(url, data) {
  try {
    console.log(domain + url)
    let reponse = await fetch(domain + url, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((reponse) => {
      return reponse.json()
    })
    return reponse
  } catch (error) {
    console.log(error)
  }
}