// API key for accessing the news API
const apikey = 'f26685b982af42c7a526f5746a7c6749';

// Get DOM elements for displaying articles and handling user input
const blockContainer = document.getElementById("blockContainer");
const searchField = document.getElementById('searchBox');
const searchButton = document.getElementById('navButton');

// Function to fetch random news articles from the API
async function fetchRandomNews() {
    try {
        // Construct API URL for fetching top headlines in the US
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apikey}`; // Fixed: added "=" after "apiKey"
        const response = await fetch(apiUrl); // Fetch data from the API
        const data = await response.json(); // Parse JSON response
        return data.articles; // Return the articles array
    } catch (error) {
        console.log("Error occurs", error); // Log any errors encountered
        return []; // Return an empty array if an error occurs
    }
}

// Event listener for the search button click
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim(); // Get the search query
    if (query !== "") { // Check if the query is not empty
        try {
            const articles = await fetchNewsQuery(query); // Fetch articles based on the query
            displayBlogs(articles); // Display the fetched articles
        } catch (error) {
            console.log('error fetching news', error); // Log any errors encountered
        }
    }
});

// Function to fetch news articles based on a search query
async function fetchNewsQuery(query) {
    try {
        // Construct API URL for searching news articles
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=${apikey}`; // Fixed: added "=" after "apiKey"
        const response = await fetch(apiUrl); // Fetch data from the API
        const data = await response.json(); // Parse JSON response
        return data.articles; // Return the articles array
    } catch (error) {
        console.log("Error occurs", error); // Log any errors encountered
        return []; // Return an empty array if an error occurs
    }
}

// Function to display the fetched articles in the UI
function displayBlogs(articles) {
    blockContainer.innerHTML = ""; // Clear the container before displaying new articles
    articles.forEach((article) => {
        const blockCard = document.createElement("div"); // Create a new div for each article
        blockCard.classList.add("blockCard"); // Add a class for styling

        const img = document.createElement("img"); // Create an image element for the article image
        img.src = article.urlToImage; // Set the image source
        img.alt = article.title; // Set the alt text for the image

        const title = document.createElement("h2"); // Create an h2 element for the article title
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title; // Truncate title if too long
        title.textContent = truncatedTitle; // Set the title text

        const description = document.createElement("p"); // Create a paragraph element for the article description
        const truncatedDescription = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description; // Truncate description if too long
        description.textContent = truncatedDescription; // Set the description text

        // Append elements to the article card
        blockCard.appendChild(img);
        blockCard.appendChild(title);
        blockCard.appendChild(description);
        
        // Add click event to open the article URL in a new tab
        blockCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blockContainer.appendChild(blockCard); // Append the article card to the container
    });
}

// Immediately invoked function to fetch and display random news articles on page load
(async () => {
    try {
        const articles = await fetchRandomNews(); // Fetch random articles
        displayBlogs(articles); // Display the articles
    } catch (error) {
        console.log("Error occurs", error); // Log any errors encountered
    }
})();
