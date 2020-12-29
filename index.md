---
layout: page
title: Home
---

{% for category in site.categories %}

  <h2>{{ category[0] }}</h2>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url | relative_url }}"> {{ post.title | escape }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
