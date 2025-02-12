<template>
  <div class="about-container">
    <div class="header">
      <h1 class="app-name">Wasfati</h1>
      <p class="app-description">An amazing application that simplifies recipe management.</p>

      <div class="features">
        <h2>Key Features</h2>
        <ul>
          <li>✔ Recipe Management</li>
          <li>✔ Simple User Interface</li>
          <li>✔ Import & Export</li>
        </ul>
      </div>
    </div>

    <div class="social-links">
      <h2>Connect with me:</h2>
      <ul>
        <li><a href="https://twitter.com/author" target="_blank">Twitter</a></li>
        <li><a href="https://github.com/author" target="_blank">GitHub</a></li>
        <li><a href="https://linkedin.com/in/author" target="_blank">LinkedIn</a></li>
      </ul>
    </div>
    <footer class="footer">
      &copy; {{ new Date().getFullYear() }} Wasfa. All rights reserved.
    </footer>
  </div>
</template>

<style>
.about-container {
  height: 100%;
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.app-name {
  font-size: 2rem;
  font-weight: bold;
}

.app-description {
  margin: 1rem 0;
  font-size: 1.2rem;
  color: var(--color-text);
}

.features {
  margin: 2rem auto;
  text-align: left;
  display: inline-block;
}

.features h2 {
  font-size: 1.5rem;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 0.75em;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  font-size: 1.1rem;
  margin: 5px 0;
}

.social-links {
  margin-top: 2rem;
}

.social-links ul {
  list-style: none;
  padding: 0;
}

.social-links li {
  display: inline;
  margin: 0 10px;
}

.social-links a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #777;
}
</style>
