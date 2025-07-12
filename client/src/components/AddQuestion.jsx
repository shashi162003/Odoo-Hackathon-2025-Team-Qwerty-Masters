import { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


const AddQuestion = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: 'Add description...',
      }),
    ],
    content: '',
  });

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        setIsUploading(true);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        setUploadedImageName(file.name);
        setUploadedImageUrl(data.secure_url);
        console.log('Image uploaded:', data.secure_url);
      } catch (err) {
        console.error('Image upload failed:', err);
      } finally {
        setIsUploading(false);
      }
    };
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editor?.getHTML();

    const questionData = {
      title,
      content,
      tags,
      imageUrl: uploadedImageUrl,
    };

    try {
      const res = await fetch('https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1/questions/createQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      const result = await res.json();
      console.log('Submitted:', result);

      // Reset form
      setTitle('');
      editor.commands.setContent('');
      setTags([]);
      setTagInput('');
      setUploadedImageName('');
      setUploadedImageUrl('');
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Ask a Question</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-gray-400/20 focus:ring-2 focus:ring-purple-500"
            placeholder="Enter a title"
            required
          />

          {/* Editor */}
         <div
  className={`rounded-xl border border-gray-400/30 p-4 min-h-[200px] transition-all bg-white/10 text-white placeholder-gray-300 focus-within:ring-2 focus-within:ring-purple-500`}
  onClick={() => editor?.commands.focus()}
>
  <EditorContent editor={editor} className="outline-none prose prose-sm max-w-none text-white" />
</div>


          {/* Upload Image Button + File Name Display + Loader */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={addImage}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition duration-200 flex items-center gap-2"
              disabled={isUploading}
            >
              {isUploading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
              )}
              Upload Image
            </button>
            {uploadedImageName && (
              <span className="text-sm text-white">{uploadedImageName} uploaded</span>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-white mb-2 font-medium">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-full space-x-2"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-white hover:text-gray-200"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="px-2 py-1 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type tag and press Enter"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-md hover:shadow-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
