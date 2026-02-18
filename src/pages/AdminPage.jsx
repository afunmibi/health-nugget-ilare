import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  createCategory,
  createNugget,
  deleteCategory,
  deleteNugget,
  getAllNuggets,
  getCategories,
  getWelcomeData,
  updateCategory,
  updateNugget,
  updateWelcomeData,
} from '../api/nuggetService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { isAdminAuthenticated, logoutAdmin } from '../utils/adminAuth';

const EMPTY_NUGGET_FORM = {
  title: '',
  category: '',
  type: 'text',
  mediaUrl: '',
  thumbnail: '',
  description: '',
  fullText: '',
  doctorNote: '',
  author: '',
  datePosted: '',
  tags: '',
};

const EMPTY_CATEGORY_FORM = {
  name: '',
  slug: '',
  icon: '',
};

const EMPTY_WELCOME_FORM = {
  message: '',
  author: '',
  bio: '',
  createdDate: '',
};

const normalizeNuggetPayload = (form) => ({
  title: form.title.trim(),
  category: form.category.trim(),
  type: form.type,
  mediaUrl: form.mediaUrl.trim() || null,
  thumbnail: form.thumbnail.trim() || null,
  description: form.description.trim(),
  fullText: form.fullText.trim(),
  doctorNote: form.doctorNote.trim(),
  author: form.author.trim() || 'Admin',
  datePosted: form.datePosted || new Date().toISOString().slice(0, 10),
  tags: form.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean),
});

const nuggetFormFromItem = (nugget) => ({
  title: nugget.title || '',
  category: nugget.category || '',
  type: nugget.type || 'text',
  mediaUrl: nugget.mediaUrl || '',
  thumbnail: nugget.thumbnail || '',
  description: nugget.description || '',
  fullText: nugget.fullText || '',
  doctorNote: nugget.doctorNote || '',
  author: nugget.author || '',
  datePosted: nugget.datePosted || '',
  tags: Array.isArray(nugget.tags) ? nugget.tags.join(', ') : '',
});

const categoryFormFromItem = (category) => ({
  name: category.name || '',
  slug: category.slug || '',
  icon: category.icon || '',
});

const welcomeFormFromItem = (welcome) => ({
  message: welcome?.message || '',
  author: welcome?.author || '',
  bio: welcome?.bio || '',
  createdDate: welcome?.createdDate || '',
});

const AdminPage = () => {
  const uploadBaseUrl = import.meta.env.VITE_UPLOAD_BASE_URL || 'http://localhost:3002';
  const [nuggets, setNuggets] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingNuggets, setLoadingNuggets] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [editingNuggetId, setEditingNuggetId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [activeSection, setActiveSection] = useState('nuggets');
  const [mediaInputMode, setMediaInputMode] = useState('link');

  const [nuggetForm, setNuggetForm] = useState(EMPTY_NUGGET_FORM);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY_FORM);
  const [welcomeForm, setWelcomeForm] = useState(EMPTY_WELCOME_FORM);

  const isEditingNugget = useMemo(() => editingNuggetId !== null, [editingNuggetId]);
  const isEditingCategory = useMemo(() => editingCategoryId !== null, [editingCategoryId]);

  const loadNuggets = async () => {
    try {
      setLoadingNuggets(true);
      const data = await getAllNuggets();
      setNuggets(data);
    } finally {
      setLoadingNuggets(false);
    }
  };

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await getCategories();
      setCategories(data);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadWelcome = async () => {
    const data = await getWelcomeData();
    setWelcomeForm(welcomeFormFromItem(data));
  };

  const loadAll = async () => {
    try {
      setError('');
      await Promise.all([loadNuggets(), loadCategories(), loadWelcome()]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logoutAdmin();
    window.location.href = '/admin/login';
  };

  const resetNuggetForm = () => {
    setEditingNuggetId(null);
    setNuggetForm(EMPTY_NUGGET_FORM);
    setMediaInputMode('link');
  };

  const resetCategoryForm = () => {
    setEditingCategoryId(null);
    setCategoryForm(EMPTY_CATEGORY_FORM);
  };

  const handleNuggetChange = (event) => {
    const { name, value } = event.target;
    setNuggetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWelcomeChange = (event) => {
    const { name, value } = event.target;
    setWelcomeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaModeChange = (event) => {
    const mode = event.target.value;
    setMediaInputMode(mode);

    if (mode === 'upload') {
      setNuggetForm((prev) => ({ ...prev, mediaUrl: '' }));
    }
  };

  const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${uploadBaseUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed.');
    }

    const data = await response.json();
    return data.path;
  };

  const handleMediaFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const path = await uploadFile(file, nuggetForm.type);
      setNuggetForm((prev) => ({
        ...prev,
        mediaUrl: path,
        thumbnail: nuggetForm.type === 'image' ? path : prev.thumbnail,
      }));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const path = await uploadFile(file, 'image');
      setNuggetForm((prev) => ({ ...prev, thumbnail: path }));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTextFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setNuggetForm((prev) => ({ ...prev, fullText: String(fileReader.result || '') }));
    };
    fileReader.readAsText(file);
  };

  const startNuggetEdit = (nugget) => {
    setEditingNuggetId(nugget.id);
    setNuggetForm(nuggetFormFromItem(nugget));
    setMediaInputMode('link');
    setError('');
    setNotice('');
    setActiveSection('nuggets');
  };

  const startCategoryEdit = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm(categoryFormFromItem(category));
    setError('');
    setNotice('');
    setActiveSection('categories');
  };

  const submitNugget = async (event) => {
    event.preventDefault();

    if (!nuggetForm.title.trim() || !nuggetForm.category.trim() || !nuggetForm.description.trim()) {
      setError('Nugget title, category, and description are required.');
      return;
    }

    if (nuggetForm.type !== 'text' && !nuggetForm.mediaUrl.trim()) {
      setError('Please provide a media link or upload a media file for this nugget type.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const payload = normalizeNuggetPayload(nuggetForm);

      if (isEditingNugget) {
        await updateNugget(editingNuggetId, payload);
        setNotice('Nugget updated.');
      } else {
        await createNugget(payload);
        setNotice('Nugget created.');
      }

      resetNuggetForm();
      await loadNuggets();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const removeNugget = async (id) => {
    if (!window.confirm('Delete this nugget?')) {
      return;
    }

    try {
      setSaving(true);
      setError('');
      await deleteNugget(id);
      if (editingNuggetId === id) {
        resetNuggetForm();
      }
      setNotice('Nugget deleted.');
      await loadNuggets();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submitCategory = async (event) => {
    event.preventDefault();

    if (!categoryForm.name.trim()) {
      setError('Category name is required.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const payload = {
        name: categoryForm.name.trim(),
        slug: (categoryForm.slug || categoryForm.name)
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-'),
        icon: categoryForm.icon.trim() || '',
      };

      if (isEditingCategory) {
        await updateCategory(editingCategoryId, payload);
        setNotice('Category updated.');
      } else {
        await createCategory(payload);
        setNotice('Category created.');
      }

      resetCategoryForm();
      await loadCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const removeCategory = async (id) => {
    if (!window.confirm('Delete this category?')) {
      return;
    }

    try {
      setSaving(true);
      setError('');
      await deleteCategory(id);
      if (editingCategoryId === id) {
        resetCategoryForm();
      }
      setNotice('Category deleted.');
      await loadCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submitWelcome = async (event) => {
    event.preventDefault();

    if (!welcomeForm.message.trim()) {
      setError('Welcome message is required.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await updateWelcomeData({
        message: welcomeForm.message.trim(),
        author: welcomeForm.author.trim(),
        bio: welcomeForm.bio.trim(),
        createdDate: welcomeForm.createdDate || new Date().toISOString().slice(0, 10),
      });
      setNotice('Welcome content updated.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Admin Dashboard</h1>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {notice && <div className="alert alert-success">{notice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        <aside className="col-12 col-lg-3">
          <div className="card border-0 shadow-sm admin-sidebar">
            <div className="list-group list-group-flush">
              <button
                type="button"
                className={`list-group-item list-group-item-action ${activeSection === 'nuggets' ? 'active' : ''}`}
                onClick={() => setActiveSection('nuggets')}
              >
                Nuggets
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action ${activeSection === 'categories' ? 'active' : ''}`}
                onClick={() => setActiveSection('categories')}
              >
                Categories
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action ${activeSection === 'welcome' ? 'active' : ''}`}
                onClick={() => setActiveSection('welcome')}
              >
                Welcome Content
              </button>
            </div>
          </div>
        </aside>

        <section className="col-12 col-lg-9">
          {activeSection === 'nuggets' && (
            <div className="row g-4">
              <div className="col-12 col-xl-5">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">{isEditingNugget ? 'Edit Nugget' : 'Create Nugget'}</h2>
                    <form onSubmit={submitNugget}>
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input name="title" className="form-control" value={nuggetForm.title} onChange={handleNuggetChange} required />
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-6">
                          <label className="form-label">Category</label>
                          <input name="category" className="form-control" value={nuggetForm.category} onChange={handleNuggetChange} required />
                        </div>
                        <div className="col-6">
                          <label className="form-label">Type</label>
                          <select name="type" className="form-select" value={nuggetForm.type} onChange={handleNuggetChange}>
                            <option value="text">Text</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                            <option value="image">Image</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Media Source</label>
                        <select className="form-select" value={mediaInputMode} onChange={handleMediaModeChange}>
                          <option value="link">Use Link</option>
                          <option value="upload">Upload Local File</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control" rows="2" value={nuggetForm.description} onChange={handleNuggetChange} required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Full Text</label>
                        <textarea name="fullText" className="form-control" rows="4" value={nuggetForm.fullText} onChange={handleNuggetChange} />
                      </div>

                      {nuggetForm.type === 'text' && mediaInputMode === 'upload' && (
                        <div className="mb-3">
                          <label className="form-label">Upload Text File (.txt)</label>
                          <input type="file" accept=".txt,text/plain" className="form-control" onChange={handleTextFileUpload} />
                          <div className="form-text">Uploaded file content will fill the Full Text field.</div>
                        </div>
                      )}

                      {mediaInputMode === 'link' && (
                        <div className="mb-3">
                          <label className="form-label">Media URL</label>
                          <input
                            name="mediaUrl"
                            className="form-control"
                            placeholder={nuggetForm.type === 'video' ? 'YouTube embed/video URL' : 'https://...'}
                            value={nuggetForm.mediaUrl}
                            onChange={handleNuggetChange}
                          />
                        </div>
                      )}

                      {mediaInputMode === 'upload' && nuggetForm.type !== 'text' && (
                        <div className="mb-3">
                          <label className="form-label">
                            Upload {nuggetForm.type === 'video' ? 'Video' : nuggetForm.type === 'audio' ? 'Audio' : 'Image'} File
                          </label>
                          <input
                            type="file"
                            accept={
                              nuggetForm.type === 'video'
                                ? 'video/*'
                                : nuggetForm.type === 'audio'
                                  ? 'audio/*'
                                  : nuggetForm.type === 'image'
                                    ? 'image/*'
                                    : '*/*'
                            }
                            className="form-control"
                            onChange={handleMediaFileUpload}
                          />
                          <div className="form-text">File is saved to /public/uploads and the path is stored in db.json.</div>
                        </div>
                      )}

                      {mediaInputMode === 'upload' && (nuggetForm.type === 'video' || nuggetForm.type === 'audio') && (
                        <div className="mb-3">
                          <label className="form-label">Upload Thumbnail (optional)</label>
                          <input type="file" accept="image/*" className="form-control" onChange={handleThumbnailUpload} />
                        </div>
                      )}

                      {mediaInputMode === 'link' && (
                        <div className="mb-3">
                          <label className="form-label">Thumbnail URL</label>
                          <input name="thumbnail" className="form-control" value={nuggetForm.thumbnail} onChange={handleNuggetChange} />
                        </div>
                      )}

                      <div className="row g-3 mb-3">
                        <div className="col-6">
                          <label className="form-label">Author</label>
                          <input name="author" className="form-control" value={nuggetForm.author} onChange={handleNuggetChange} />
                        </div>
                        <div className="col-6">
                          <label className="form-label">Date Posted</label>
                          <input type="date" name="datePosted" className="form-control" value={nuggetForm.datePosted} onChange={handleNuggetChange} />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Tags (comma-separated)</label>
                        <input name="tags" className="form-control" value={nuggetForm.tags} onChange={handleNuggetChange} />
                      </div>

                      <div className="d-flex gap-2">
                        <button className="btn btn-success" type="submit" disabled={saving}>
                          {saving ? 'Saving...' : isEditingNugget ? 'Update' : 'Create'}
                        </button>
                        {isEditingNugget && (
                          <button className="btn btn-outline-secondary" type="button" onClick={resetNuggetForm}>
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-7">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">Manage Nuggets</h2>
                    {loadingNuggets ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="table-responsive">
                        <table className="table align-middle">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Category</th>
                              <th>Type</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {nuggets.map((nugget) => (
                              <tr key={nugget.id}>
                                <td>{nugget.title}</td>
                                <td>{nugget.category}</td>
                                <td className="text-capitalize">{nugget.type}</td>
                                <td className="text-end">
                                  <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => startNuggetEdit(nugget)}>
                                      Edit
                                    </button>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => removeNugget(nugget.id)}>
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'categories' && (
            <div className="row g-4">
              <div className="col-12 col-xl-5">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">{isEditingCategory ? 'Edit Category' : 'Create Category'}</h2>
                    <form onSubmit={submitCategory}>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input name="name" className="form-control" value={categoryForm.name} onChange={handleCategoryChange} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Slug</label>
                        <input name="slug" className="form-control" value={categoryForm.slug} onChange={handleCategoryChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Icon</label>
                        <input name="icon" className="form-control" value={categoryForm.icon} onChange={handleCategoryChange} />
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-success" type="submit" disabled={saving}>
                          {saving ? 'Saving...' : isEditingCategory ? 'Update' : 'Create'}
                        </button>
                        {isEditingCategory && (
                          <button className="btn btn-outline-secondary" type="button" onClick={resetCategoryForm}>
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-7">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">Manage Categories</h2>
                    {loadingCategories ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-sm align-middle">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Slug</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((category) => (
                              <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>{category.slug}</td>
                                <td className="text-end">
                                  <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => startCategoryEdit(category)}>
                                      Edit
                                    </button>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => removeCategory(category.id)}>
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'welcome' && (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h5 mb-3">Welcome Content</h2>
                <form onSubmit={submitWelcome}>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea name="message" className="form-control" rows="5" value={welcomeForm.message} onChange={handleWelcomeChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input name="author" className="form-control" value={welcomeForm.author} onChange={handleWelcomeChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea name="bio" className="form-control" rows="4" value={welcomeForm.bio} onChange={handleWelcomeChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Created Date</label>
                    <input type="date" name="createdDate" className="form-control" value={welcomeForm.createdDate} onChange={handleWelcomeChange} />
                  </div>
                  <button className="btn btn-success" type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Update Welcome Content'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;