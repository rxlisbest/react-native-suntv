let domain = process.env.API_DOMAIN

export async function post(url, data) {
  try {
    console.log(domain + url)
    let reponse = await fetch('https://shop.wzlingxu.com/index.php/index/baidu/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    console.log(reponse)
    return reponse
  } catch (error) {
    console.log(error)
  }
}