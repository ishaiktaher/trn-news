import api from '../services/api';

export default class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("upload", file);

          api.post("uploads", {
            body: data,
          })
            .then((res) => {
              resolve({ default: `http://localhost:4000/${res.data.url}` });
            })
            .catch((err) => reject(err));
        })
    );
  }

  abort() {
    // Optional: implement cancel support
  }
}
