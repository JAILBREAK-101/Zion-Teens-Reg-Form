// welcome.js

// Fetch a random Bible verse
async function fetchBibleVerse() {
    try {
      const response = await fetch("https://beta.ourmanna.com/api/v1/get/?format=json");
      const data = await response.json();
      const verse = data.verse.details.text;
      const reference = data.verse.details.reference;
  
      // Display the verse and reference
      document.getElementById("verse-content").textContent = verse;
      document.getElementById("verse-reference").textContent = `- ${reference}`;
    } catch (error) {
      console.error("Error fetching verse:", error);
      document.getElementById("verse-content").textContent = "Unable to load verse. Please try again later.";
    }
  }
  
  // Run the function on page load
  fetchBibleVerse();
  