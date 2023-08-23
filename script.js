const longLink = document.querySelector(".longLink")
const inputUrl = longLink.children[1]
const submit = longLink.children[2]
const shortUrl = document.querySelector(".shortLink")
const result = shortUrl.children[1]

createUrl = (url) =>{
    result.innerText = url
}


submit.addEventListener('click',()=>{
    const getUrl = inputUrl.value;

    fetch('https://url-shortner10.p.rapidapi.com/lits.rocks/', {
    method: 'POST',
    body: JSON.stringify({
        url: getUrl,
    }),
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '5145d62dd6msh4e9ee53174955e6p1b2309jsn33fc2c2d9817',
        'X-RapidAPI-Host': 'url-shortner10.p.rapidapi.com'
    },
    })
    .then((response) => response.json())
    .then((data) => createUrl(data.shortUrl));

})
 



 