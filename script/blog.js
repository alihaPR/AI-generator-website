  async function loadWordPressPosts() {
    const container = document.getElementById("blog-posts");
    const feedUrl = "https://dreammorphblog.wordpress.com/feed/";

    try {
      const response = await fetch(feedUrl);
      const text = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      const items = xml.querySelectorAll("item");
      let html = "";

      items.forEach((el, index) => {
        if (index < 5) { // فقط 5 پست اول رو نشون می‌ده
          const title = el.querySelector("title").textContent;
          const link = el.querySelector("link").textContent;
          const description = el.querySelector("description").textContent;

          html += 
            <div class="post" style="margin-bottom: 40px;">
              <h2><a href="${link}" target="_blank">${title}</a></h2>
              <p>${description.substring(0, 200)}...</p>
            </div>
          ;
        }
      });

      container.innerHTML = html;
    } catch (err) {
      console.error("Error loading posts:", err);
      container.innerHTML = "<p>Failed to load posts.</p>";
    }
  }

  loadWordPressPosts();