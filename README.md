# 高数复习论坛 GitHub Pages 版本

在线访问地址: https://mimi3m.github.io/breeze/

This folder contains the static site captured from `http://8.130.121.104:8010/`.

## Publish To GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open repository `Settings` -> `Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Select branch `main` and folder `/ (root)`.
6. Save and wait for the Pages URL to become available.

## Backend Notes

GitHub Pages only hosts static files. This build defaults to local mock data on `*.github.io` so the prototype can run as an interactive demo.

To connect a real backend later, define `window.API_BASE` before `app.js` loads, for example:

```html
<script>
  window.API_BASE = "https://your-api.example.com";
</script>
```
