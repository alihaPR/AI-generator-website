// آدرس API وردپرس تو
const apiURL = "https://public-api.wordpress.com/wp/v2/sites/dreammorphblog.wordpress.com/posts";

async function loadPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "<p>Loading posts...</p>";

  try {
    const res = await fetch(apiURL);
    const posts = await res.json();

    container.innerHTML = ""; // پاک کردن پیام Loading

    posts.forEach((post) => {
      const article = document.createElement("article");
      article.classList.add("post");

      // عنوان
      const title = document.createElement("h2");
      title.innerHTML = post.title.rendered;

      // خلاصه پست
      const excerpt = document.createElement("div");
      excerpt.innerHTML = post.excerpt.rendered;

      // لینک پست کامل
      const link = document.createElement("a");
      link.href = post.link;
      link.target = "_blank";
      link.textContent = "Read more →";

      // اضافه کردن عناصر
      article.appendChild(title);
      article.appendChild(excerpt);
      article.appendChild(link);

      container.appendChild(article);
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load posts 😢</p>";
    console.error("Error loading posts:", error);
  }
}
