// components/CustomUploadAdapter.js
export default class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("upload", file); // ✅ important

          fetch("http://localhost:4000/api/uploads", {
            method: "POST",
            body: data,
          })
            .then(res => res.json())
            .then(res => resolve({ default: `http://localhost:4000${res.url}` }))
            .catch(err => reject(err));
        })
    );
  }

  abort() {
    // optional
  }
}
