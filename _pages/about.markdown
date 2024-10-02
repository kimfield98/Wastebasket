---
layout: page
title: 👩🏻‍💻 소개
permalink: /about/
---

<style>
.social-media-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  list-style: none;
}

.social-media-list .svg-icon {
  width: 20px;
  height: 20px;
}

</style>

<ul class="social-media-list">
  {% if site.linkedin_username %}
  <li>
    <a href="https://www.linkedin.com/in/{{ site.linkedin_username| cgi_escape | escape }}">
      <svg class="svg-icon"><use xlink:href="{{ '/assets/minima-social-icons.svg#linkedin' | relative_url }}"></use></svg>
      <span class="username">LinkedIn</span>
    </a>
  </li>
  {% endif %}

  {% if site.github_username %}
  <li>
    <a href="https://github.com/{{ site.github_username| cgi_escape | escape }}">
      <svg class="svg-icon"><use xlink:href="{{ '/assets/minima-social-icons.svg#github' | relative_url }}"></use></svg>
      <span class="username">GitHub</span>
    </a>
  </li>
  {% endif %}
</ul>