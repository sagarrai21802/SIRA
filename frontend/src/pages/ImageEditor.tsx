import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';
import { Download, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { API_BASE } from '../lib/api';

const ImageEditor: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [store] = useState(() => createStore({ key: 'sira-image-editor', showCredit: false }));
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const imageUrl = location.state?.imageUrl;
  const imageData = location.state?.imageData;

  useEffect(() => {
    const initializeEditor = async () => {
      try {
        setLoading(true);

        // Ensure we have an active page
        let activePage: any = (store as any).activePage;
        if (!activePage) {
          const page = (store as any).addPage ? (store as any).addPage() : null;
          if (page) {
            if (typeof (store as any).setActivePage === 'function') {
              (store as any).setActivePage(page);
            } else {
              (store as any).activePage = page;
            }
            activePage = (store as any).activePage || page;
          }
        }

        if (!imageUrl && !imageData) {
          // No image provided – open empty canvas
          if (!activePage) {
            const page = (store as any).addPage ? (store as any).addPage() : null;
            if (page && typeof (store as any).setActivePage === 'function') {
              (store as any).setActivePage(page);
            }
          }
          setLoading(false);
          return;
        }

        // Preload image (supports URL or base64)
        const src = imageUrl || imageData;
        const img = new Image();
        if (src && !src.startsWith('data:')) {
          img.crossOrigin = 'anonymous';
        }
        await new Promise((resolve, reject) => {
          img.onload = () => resolve(null);
          img.onerror = (e) => reject(e);
          img.src = src as string;
        });

        const pageWidth = img.width;
        const pageHeight = img.height;

        // Resize page to match image
        if (typeof (activePage as any)?.set === 'function') {
          (activePage as any).set({ width: pageWidth, height: pageHeight });
        } else if (activePage) {
          (activePage as any).width = pageWidth;
          (activePage as any).height = pageHeight;
        }

        // Clear existing elements (keep page)
        try {
          const children = (activePage as any)?.children || [];
          if (Array.isArray(children) && children.length) {
            children.slice().forEach((el: any) => {
              if (el && typeof el.remove === 'function') el.remove();
            });
          }
        } catch {}

        const addImageToPage = async () => {
          if (typeof (activePage as any)?.addElement === 'function') {
            return await (activePage as any).addElement({
              type: 'image',
              src,
              width: pageWidth,
              height: pageHeight,
              x: 0,
              y: 0,
            });
          }
          throw new Error('Page does not have addElement method');
        };

        try {
          await addImageToPage();
        } catch (err) {
          // Retry by creating a fresh page
          const page = (store as any).addPage ? (store as any).addPage() : null;
          if (!page) throw err;
          if (typeof (store as any).setActivePage === 'function') {
            (store as any).setActivePage(page);
          } else {
            (store as any).activePage = page;
          }
          activePage = (store as any).activePage || page;
          if (typeof (activePage as any).set === 'function') {
            (activePage as any).set({ width: pageWidth, height: pageHeight });
          } else {
            (activePage as any).width = pageWidth;
            (activePage as any).height = pageHeight;
          }
          await addImageToPage();
        }

        if (typeof (store as any).zoomToFit === 'function') {
          (store as any).zoomToFit();
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to initialize editor:', err);
        if (imageUrl || imageData) {
          toast.error('Failed to load image for editing');
        }
        setLoading(false);
      }
    };

    initializeEditor();
  }, [imageUrl, imageData, store]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please log in to save your designs');
      return;
    }

    try {
      setSaving(true);
      const dataUrl = await store.toDataURL();
      const designJSON = store.toJSON();

      const response = await fetch(`${API_BASE}/api/save-edited-design`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          edited_image_url: dataUrl,
          edited_image_public_id: 'placeholder', // Will be set by server
          design_json: JSON.stringify(designJSON),
          original_image_url: imageUrl
        })
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && data?.item) {
        toast.success('Design saved successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data?.error || 'Failed to save design');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save design');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    const dataUrl = await store.toDataURL();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `sira-design-${Date.now()}.png`;
    link.click();
    toast.success('Design downloaded!');
  };

  const handleBack = () => {
    navigate('/images');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-14 h-14 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading image editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Images
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SIRA Studio - Image Editor
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Design'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Side Panel */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <SidePanel store={store} />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
            <Toolbar store={store} />
          </div>

          {/* Workspace */}
          <div className="flex-1 relative">
            <Workspace store={store} />
            <div className="absolute bottom-4 right-4">
              <ZoomButtons store={store} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;