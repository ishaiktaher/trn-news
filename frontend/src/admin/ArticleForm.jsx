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
import axios from "../services/api";
import Sidebar from "../components/SideBar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data));
    if (isEditMode) {
      axios.get(`/articles/${id}`).then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
        setCategory(res.data.category);
      });
    }
  }, [id,isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, body, category };
    try {
      if (isEditMode) {
        await axios.put(`/articles/${id}`, payload);
      } else {
        await axios.post("/articles", payload);
      }
      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit" : "Add"} Article
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block">Body</label>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
              }}
            />
            {/* <ReactQuill theme="snow" value={body} onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
              }} />; */}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEditMode ? "Update" : "Create"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ArticleForm;
