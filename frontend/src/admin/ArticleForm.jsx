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
import Select from 'react-select';
import debounce from 'lodash.debounce';

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [article, setArticle] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

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
          setTags(tags || []);
          setTagInput((tags || []).map(tag => ({ label: tag, value: tag })));
          if (featuredImage) {
            setPreviewImage(featuredImage);
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

  const handleTagChange = (selected) => {
    setTagInput(selected);
    setTags(selected.map(tag => tag.value));
  };

  const autoSaveDraft = debounce(async () => {
    if (!title && !body && !category) return;
    const payload = { title, content: body, category, tags, status: "draft" };
    try {
      if (!isEditMode) {
        const res = await api.post("/articles", payload);
        console.log("Draft saved:", res.data);
      }
    } catch (err) {
      console.warn("Draft auto-save failed:", err);
    }
  }, 30000); // 30 seconds debounce

  useEffect(() => {
    autoSaveDraft();
    return autoSaveDraft.cancel;
  }, [title, body, category, tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", body);
    formData.append("category", category);
    formData.append("status", "published");
    tags.forEach(tag => formData.append("tags[]", tag));
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
    }
  };

  const handleCancel = () => {
    navigate("/admin/articles");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit" : "Add"} Article</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Tags</label>
            <Select
              isMulti
              value={tagInput}
              onChange={handleTagChange}
              options={[]}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Add tags..."
              isClearable
              onCreateOption={(inputValue) => {
                const newOption = { label: inputValue, value: inputValue };
                setTagInput(prev => [...prev, newOption]);
                setTags(prev => [...prev, inputValue]);
              }}
              formatCreateLabel={(inputValue) => `Create tag: "${inputValue}"`}
              isValidNewOption={(inputValue) => !!inputValue}
            />
          </div>

          <div>
            <label className="block">Featured Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 h-40 rounded" />
            )}
          </div>

          <div>
            <label className="block">Body</label>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              config={{
                mediaEmbed: { previewsInData: true },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
              }}
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEditMode ? "Update" : "Create - Article"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </main>
    </div>
  );
};

export default ArticleForm;
