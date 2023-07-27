const sidebar = document.getElementById('sidebar')
const icon = document.getElementById('sidekickmenu')
const handleSidebar = () => {
  if (sidebar.style.display === 'flex') {
    sidebar.style.display = 'none'; // Hide the sidebar if it's currently visible
  } else {
    sidebar.style.display = 'flex'; // Show the sidebar if it's currently hidden
  }
};

icon.onclick = handleSidebar;