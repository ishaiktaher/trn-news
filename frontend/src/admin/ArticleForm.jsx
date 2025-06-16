/*
 * Copyright (C) 2025 TRN news
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>.
 */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../services/api';
import Sidebar from "../components/SideBar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import debounce from 'lodash.debounce';
import CustomUploadAdapter from "../components/CustomUploadAdapter";
const BASE_URL = process.env.REACT_APP_API_URL;

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [article, setArticle] = useState(null);
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const CustomEditorConfig = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    mediaEmbed: {
      previewsInData: true, // ensures embeds are saved in data
    },
  };

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      new CustomUploadAdapter(loader);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await api.get("/categories");
        setCategories(categoryRes.data);

        if (isEditMode && id) {
          const articleRes = await api.get(`/articles/${id}`);
          const { title, content, category, tags, featuredImage } = articleRes.data;
          setArticle(articleRes.data);

          setTitle(title);
          setBody(content);
          setCategory(category?._id || '');
          setTags(tags?.join(', ') || '');
          if (featuredImage) {
            setPreviewImage(`${BASE_URL}/uploads/${featuredImage}`);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // const autoSaveDraft = debounce(async () => {
  //   if (!title && !body && !category && !body) return;
  //   const payload = { title, content: body, category, tags: tags.split(',').map(t => t.trim()), status: "draft" };
  //   try {
  //     if (!isEditMode) {
  //       const res = await api.post("/articles", payload);
  //       console.log("Draft saved:", res.data);
  //     }
  //   } catch (err) {
  //     console.warn("Draft auto-save failed:", err);
  //   }
  // }, 60000);

  const autoSaveDraft = debounce(async () => {
    if (!title && !body && !category) return;
  
    const payload = {
      title,
      content: body,
      category,
      tags: tags.split(',').map(t => t.trim()),
      status: 'draft'
    };
  
    try {
      let res;
      if (!isEditMode && !article) {
        // First time saving draft — create new
        res = await api.post('/articles', payload);
        setArticle(res.data); // ✅ Save _id for future updates
      } else {
        // Already saved a draft or editing existing one
        res = await api.put(`/articles/${article._id}`, payload);
        setArticle(res.data); // ✅ Update article in state
      }
  
      console.log('Auto-saved draft at', new Date().toLocaleTimeString());
    } catch (err) {
      console.warn('Auto-save draft failed:', err);
    }
  }, 60000); // 30 seconds debounce
  

  useEffect(() => {
    autoSaveDraft();
    return autoSaveDraft.cancel;
  }, [title, body, category, tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const tagList = tags.split(',').map(t => t.trim());

    formData.append("title", title);
    formData.append("content", body);
    formData.append("category", category);
    formData.append("status", "published");
    tagList.forEach(tag => formData.append("tags[]", tag));
    if (featuredImage) formData.append("featuredImage", featuredImage);

    try {
      if (isEditMode) {
        await api.put(`/articles/${article._id}`, formData);
      } else {
        await api.post("/articles", formData);
      }
      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "An unexpected error occurred";
      setFormError(msg);
    }
  };

  const handleCancel = () => {
    navigate("/admin/articles");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await api.delete(`/articles/${article._id}`);
        navigate("/admin/articles");
      } catch (err) {
        console.error("Error deleting article:", err);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {isEditMode ? "Edit" : "Add"} Article
          </h2>
          <button
            onClick={() => navigate("/admin/articles")}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
          >
            ← Back
          </button>
        </div>
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {formError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full rounded"
              required
            >
              <option value="">Select</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="e.g., health, politics, economy"
            />
            {tags && (
              <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                {tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block">Featured Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 h-40 rounded"
              />
            )}
          </div>

          <div className="w-full">
            <label className="block">Body</label>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              config={CustomEditorConfig}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
              }}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded`}
            >
              {isEditMode ? "Update" : "Create - Article"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            )}
          </div>
          {article?.status === "draft" && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Draft auto-saved at{" "}
              {new Date(article.updatedAt).toLocaleTimeString()}
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default ArticleForm;
