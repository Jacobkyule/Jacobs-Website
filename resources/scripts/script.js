const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

const apiKey = "Yl2RnCi2QtFiSoX7Gmr5jg==LSZuC44oL3xzOqRT";
const baseUrl = "https://api.api-ninjas.com";


const fetchRandomQuote = async () => {
  const quoteRequestEndpoint = "/v1/quotes";
  const requestParams = `?api_key=${apiKey}`;
  const urlToFetch = `${baseUrl}${quoteRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch,  {
      headers: {
        "X-Api-Key": apiKey
      }
    });
       
    if (response.ok) {
      const jsonResponse = await response.json();
      
      const randomQuote = jsonResponse[0].quote
      const author = jsonResponse[0].author
      quoteElement.textContent = randomQuote;
      authorElement.textContent = author;
      setTimeout(fetchRandomQuote, 30000);
     
    } else {
        quoteElement.textContent = "Failed to fetch quote";
    }
  } catch (error) {
    console.log(error);
    quoteElement.textContent = "Failed to fetch quote";
  }
};
fetchRandomQuote();
