// Function to increment the visitor count
function incrementVisitorCount() {
    // Retrieve the current visitor count from storage
    let count = localStorage.getItem('visitorCount');
    
    // Check if the visitor count exists in storage
    if (count) {
      count = parseInt(count); // Convert the count to a number
      count++; // Increment the count
    } else {
      count = 1; // Set the count to 1 if it doesn't exist in storage
    }
    
    // Save the updated visitor count to storage
    localStorage.setItem('visitorCount', count.toString());
    
    // Update the count on the page
    document.getElementById('visitor-count').textContent = count;
  }
  
  // Call the incrementVisitorCount function when the page loads
  window.addEventListener('load', incrementVisitorCount);
  