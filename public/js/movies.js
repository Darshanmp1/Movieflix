// TMDB API Configuration
// Get your API key from: https://www.themoviedb.org/settings/api
const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Check if user is logged in
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    window.location.href = '/';
}

// Display user name
document.getElementById('userName').textContent = `Welcome, ${user.name}`;

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = '/';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fetch movies from TMDB API
async function fetchMovies(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Fetch movies by genre
async function fetchMoviesByGenre(genreId) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        return [];
    }
}

// Create movie card HTML
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200x300?text=No+Image'}" 
             alt="${movie.title}" 
             class="movie-poster">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</div>
    `;
    
    card.addEventListener('click', () => showMovieDetails(movie));
    return card;
}

// Display movies in a row
function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (movies.length === 0) {
        container.innerHTML = '<div class="loading">No movies found</div>';
        return;
    }
    
    movies.forEach(movie => {
        if (movie.poster_path) {
            container.appendChild(createMovieCard(movie));
        }
    });
}

// Show movie details in modal
function showMovieDetails(movie) {
    const modal = document.getElementById('movieModal');
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalOverview').textContent = movie.overview || 'No description available.';
    document.getElementById('modalRelease').textContent = movie.release_date || 'N/A';
    document.getElementById('modalRating').textContent = movie.vote_average.toFixed(1);
    document.getElementById('modalPoster').src = movie.poster_path 
        ? IMAGE_BASE_URL + movie.poster_path 
        : 'https://via.placeholder.com/250x375?text=No+Image';
    
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('movieModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('movieModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Set hero background
async function setHeroBackground() {
    const movies = await fetchMovies('/movie/popular');
    if (movies.length > 0) {
        const randomMovie = movies[Math.floor(Math.random() * 5)];
        const hero = document.getElementById('hero');
        hero.style.backgroundImage = `url(${BACKDROP_BASE_URL}${randomMovie.backdrop_path})`;
        document.getElementById('heroTitle').textContent = randomMovie.title;
        document.getElementById('heroDescription').textContent = randomMovie.overview.substring(0, 200) + '...';
    }
}

// Load all movie categories
async function loadMovies() {
    // Set hero background
    await setHeroBackground();
    
    // Load different categories
    const trending = await fetchMovies('/trending/movie/week');
    displayMovies(trending, 'trendingMovies');
    
    const topRated = await fetchMovies('/movie/top_rated');
    displayMovies(topRated, 'topRatedMovies');
    
    const popular = await fetchMovies('/movie/popular');
    displayMovies(popular, 'popularMovies');
    
    const upcoming = await fetchMovies('/movie/upcoming');
    displayMovies(upcoming, 'upcomingMovies');
    
    // Action movies (Genre ID: 28)
    const action = await fetchMoviesByGenre(28);
    displayMovies(action, 'actionMovies');
    
    // Comedy movies (Genre ID: 35)
    const comedy = await fetchMoviesByGenre(35);
    displayMovies(comedy, 'comedyMovies');
}

// Initialize
loadMovies();
