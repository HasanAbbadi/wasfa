<script setup lang="ts"></script>

<template>
  <div class="about-container">
    <div class="about-header">
      <img class="app-logo" src="../../assets/logo-no-bg.svg" alt="Wasfati logo" />
      <p class="app-description">An amazing application that simplifies recipe management.</p>

      <div class="features">
        <h4>Key Features</h4>
        <ul>
          <li>✔ Recipe Management</li>
          <li>✔ Simple User Interface</li>
          <li>✔ Import & Export</li>
        </ul>
      </div>
    </div>

    <div class="social-links">
      <h5>Connect with me:</h5>
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

.about-container img {
  --deg: 190deg;
  filter: invert(70%) sepia(100%) saturate(9999%) hue-rotate(201deg) brightness(140%) contrast(60%);
  width: 128px;
  background-color: var(--color-border);
  border: 5px solid var(--color-border);
  border-radius: 50%;
  opacity: 0.9;
}

/*
.app-name {
  font-size: 2rem;
  font-weight: bold;
  background-image:
    radial-gradient(circle, transparent, var(--color-background-soft)),
    url('../assets/logo-no-bg.svg');
  background-size: contain;
  animation: scroll 15s linear infinite;
  margin-top: -0.25ch;
  padding-top: 0.25ch;
} */

@keyframes scroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.app-description {
  margin: 1rem 0;
  color: var(--color-text);
}

.features {
  margin: 2rem auto;
  text-align: left;
  display: inline-block;
}

.features h4 {
  color: var(--color-text);
  text-align: center;
  margin-bottom: 0.75em;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
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
