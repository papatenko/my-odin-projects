const api_url = "https://zenquotes.io/api/quotes/";

async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();

  const objectTest = {
    quote: data[0].q,
    author: data[0].a,
  };
  console.log(objectTest.quote);
  console.log(objectTest.author);
}

getapi(api_url);
