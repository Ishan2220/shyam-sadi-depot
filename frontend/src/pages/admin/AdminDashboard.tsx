import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAdminAuth } from "../../stores/adminAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { CATEGORIES } from "../../lib/constants";
import {
  LogOut,
  Package,
  Edit3,
  Trash2,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Plus,
  LayoutDashboard,
  ShoppingBag,
  Shield,
  Image as ImageIcon,
  Star,
  Eye,
  EyeOff,
  MessageSquare,
  KeyRound,
} from "lucide-react";

type Product = {
  _id?: string;
  id?: string;
  name: string;
  retailPrice?: number;
  comparePrice?: number;
  wholesalePrice?: number;
  stock: number;
  category: string;
  subcategory: string;
  description?: string;
  shortDescription?: string;
  images: string[];
  slug?: string;
  fabrics?: string[];
  colors?: string[];
  tags?: string[];
  isAvailable?: boolean;
};

type Review = {
  _id?: string;
  id?: string;
  name: string;
  text: string;
  rating: number;
  isVisible: boolean;
};

type TabKey = "products" | "reviews" | "settings";

export default function AdminDashboard() {
  const { isAuthenticated, user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("products");

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // ─── Product State ───
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    retailPrice: "",
    stock: "",
    category: "",
    subcategory: "",
    description: "",
    shortDescription: "",
    images: [] as string[],
    fabrics: "",
    colors: "",
    tags: "",
    isAvailable: true,
  });

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // ─── Review State ───
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isAddReviewMode, setIsAddReviewMode] = useState(false);
  const [reviewDeleteConfirm, setReviewDeleteConfirm] = useState<string | null>(null);

  const [reviewFormData, setReviewFormData] = useState({
    name: "",
    text: "",
    rating: 5,
    isVisible: true,
  });

  // ─── Change Password State ───
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // ─── Toast ───
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const isFetching = useRef(false);
  const isReviewFetching = useRef(false);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, []);

  // ─── Product Fetch ───
  const fetchProducts = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const { data } = await api.get("/api/products");
      setProducts(data);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        showToast("Failed to sync inventory", "error");
      }
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [showToast]);

  // ─── Review Fetch ───
  const fetchReviews = useCallback(async () => {
    if (isReviewFetching.current) return;
    isReviewFetching.current = true;
    setReviewsLoading(true);
    try {
      const { data } = await api.get("/api/reviews/all");
      setReviews(data);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        showToast("Failed to load reviews", "error");
      }
    } finally {
      setReviewsLoading(false);
      isReviewFetching.current = false;
    }
  }, [showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, fetchProducts]);

  useEffect(() => {
    if (isAuthenticated && activeTab === "reviews" && reviews.length === 0 && !isReviewFetching.current) {
      fetchReviews();
    }
  }, [isAuthenticated, activeTab, fetchReviews, reviews.length]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // ─── Product Handlers ───
  const openAdd = () => {
    setIsAddMode(true);
    setEditingProduct(null);
    setFormData({
      name: "",
      retailPrice: "",
      stock: "",
      category: "",
      subcategory: "",
      description: "",
      shortDescription: "",
      images: [],
      fabrics: "",
      colors: "",
      tags: "",
      isAvailable: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setIsAddMode(false);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      retailPrice: product.retailPrice ? String(product.retailPrice) : "",
      stock: String(product.stock),
      category: product.category || "",
      subcategory: product.subcategory || "",
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      images: product.images || [],
      fabrics: product.fabrics ? product.fabrics.join(", ") : "",
      colors: product.colors ? product.colors.join(", ") : "",
      tags: product.tags ? product.tags.join(", ") : "",
      isAvailable: product.isAvailable ?? true,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_shyam"); // User's Cloudinary preset
        data.append("cloud_name", "dq8ewovor"); // User's Cloudinary cloud name

        const res = await fetch("https://api.cloudinary.com/v1_1/dq8ewovor/image/upload", {
          method: "POST",
          body: data,
        });
        const uploadedImage = await res.json();
        if (uploadedImage.secure_url) {
          uploadedUrls.push(uploadedImage.secure_url);
        } else {
          throw new Error("Upload failed for a file");
        }
      }
      
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      showToast(`${uploadedUrls.length} images uploaded successfully!`, "success");
    } catch (err) {
      showToast("Failed to upload some images. Please try again.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSave = async () => {
    // Basic Validation
    if (!formData.name || !formData.category || !formData.subcategory) {
      showToast("Please fill required fields (Name, Category, Subcategory)", "error");
      return;
    }

    const payload = {
      ...formData,
      retailPrice: formData.retailPrice ? Number(String(formData.retailPrice).replace(/,/g, "")) : undefined,
      comparePrice: formData.retailPrice ? Number(String(formData.retailPrice).replace(/,/g, "")) * 1.2 : undefined,
      wholesalePrice: formData.retailPrice ? Number(String(formData.retailPrice).replace(/,/g, "")) * 0.7 : undefined,
      stock: Number(formData.stock),
      images: formData.images,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(), // Unique slug
      fabrics: formData.fabrics.split(",").map(s => s.trim()).filter(Boolean),
      colors: formData.colors.split(",").map(s => s.trim()).filter(Boolean),
      tags: formData.tags.split(",").map(s => s.trim()).filter(Boolean),
    };

    try {
      if (isAddMode) {
        await api.post("/api/products", payload);
        showToast("Product added successfully", "success");
      } else {
        const productId = editingProduct?.id || editingProduct?._id;
        await api.put(`/api/products/${productId}`, payload);
        showToast("Product updated successfully", "success");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      showToast("Save failed. Check required fields.", "error");
    }
  };

  const handleDelete = async (product: Product) => {
    const productId = product.id || product._id;
    try {
      await api.delete(`/api/products/${productId}`);
      showToast("Product removed", "success");
      setDeleteConfirm(null);
      fetchProducts();
    } catch {
      showToast("Deletion failed", "error");
    }
  };

  const getProductImage = (p: Product) => p.images?.[0] || "";

  // ─── Review Handlers ───
  const openAddReview = () => {
    setIsAddReviewMode(true);
    setEditingReview(null);
    setReviewFormData({ name: "", text: "", rating: 5, isVisible: true });
    setIsReviewModalOpen(true);
  };

  const openEditReview = (review: Review) => {
    setIsAddReviewMode(false);
    setEditingReview(review);
    setReviewFormData({
      name: review.name,
      text: review.text,
      rating: review.rating,
      isVisible: review.isVisible,
    });
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = async () => {
    if (!reviewFormData.name || !reviewFormData.text) {
      showToast("Please fill name and review text", "error");
      return;
    }

    try {
      if (isAddReviewMode) {
        await api.post("/api/reviews", reviewFormData);
        showToast("Review added successfully", "success");
      } else {
        const reviewId = editingReview?.id || editingReview?._id;
        await api.put(`/api/reviews/${reviewId}`, reviewFormData);
        showToast("Review updated successfully", "success");
      }
      setIsReviewModalOpen(false);
      fetchReviews();
    } catch {
      showToast("Failed to save review", "error");
    }
  };

  const handleDeleteReview = async (review: Review) => {
    const reviewId = review.id || review._id;
    try {
      await api.delete(`/api/reviews/${reviewId}`);
      showToast("Review deleted", "success");
      setReviewDeleteConfirm(null);
      fetchReviews();
    } catch {
      showToast("Failed to delete review", "error");
    }
  };

  const handleToggleVisibility = async (review: Review) => {
    const reviewId = review.id || review._id;
    try {
      await api.put(`/api/reviews/${reviewId}`, { ...review, isVisible: !review.isVisible });
      showToast(
        review.isVisible ? "Review hidden from storefront" : "Review now visible on storefront",
        "success"
      );
      fetchReviews();
    } catch {
      showToast("Failed to toggle visibility", "error");
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const renderStars = (rating: number, interactive = false, onRate?: (r: number) => void) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={interactive ? 24 : 16}
          className={`${
            s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          onClick={interactive && onRate ? () => onRate(s) : undefined}
        />
      ))}
    </div>
  );

  // ─── Change Password Handler ───
  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      showToast("Please fill all fields", "error");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }

    setIsChangingPassword(true);
    try {
      await api.post("/api/auth/change-password", {
        email: user?.email,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      showToast("Password changed successfully!", "success");
      setIsPasswordModalOpen(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to change password";
      showToast(msg, "error");
    } finally {
      setIsChangingPassword(false);
    }
  };

  // ─── Tab Configuration ───
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "products", label: "Products", icon: <Package size={16} /> },
    { key: "reviews", label: "Reviews", icon: <MessageSquare size={16} /> },
    { key: "settings", label: "Settings", icon: <KeyRound size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[var(--primary)] font-sans">
      {/* Editorial Toast */}
      {toast && (
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl text-white text-sm font-bold tracking-wide animate-in fade-in slide-in-from-top duration-500 ${
            toast.type === "success" ? "bg-[var(--primary)]" : "bg-red-700"
          }`}
        >
          {toast.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-[#e5e1da] px-6 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white">
            <Shield size={20} />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold leading-tight uppercase tracking-tighter">
              Admin <span className="text-[var(--primary)]">Portal</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shyam Sadi Depot</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-sm font-bold">{user?.name || "Administrator"}</span>
            <span className="text-[10px] uppercase text-[var(--primary)] font-bold tracking-widest">Super Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--primary)] rounded-full text-xs font-bold hover:bg-[var(--primary)] hover:text-white transition-all"
          >
            <LogOut size={14} /> LOGOUT
          </button>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="sticky top-20 z-[90] bg-white border-b border-[#e5e1da]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
                activeTab === tab.key
                  ? "text-[var(--primary)]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--primary)] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* ════════════════════════════════════════ */}
        {/* PRODUCTS TAB */}
        {/* ════════════════════════════════════════ */}
        {activeTab === "products" && (
          <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Total Inventory', value: products.length, icon: Package, color: 'text-blue-600' },
                { label: 'Active Status', value: 'Live', icon: LayoutDashboard, color: 'text-green-600' },
                { label: 'Low Stock', value: products.filter(p => (p.stock ?? 0) < 10).length, icon: AlertCircle, color: 'text-red-600' },
                { label: 'Shop View', value: 'Public', icon: ShoppingBag, color: 'text-[var(--primary)]' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#e5e1da] shadow-sm">
                  <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{stat.label}</p>
                  <h4 className="text-2xl font-display font-bold">{stat.value}</h4>
                </div>
              ))}
            </div>

            {/* Content Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-display font-bold text-[var(--primary)]">Inventory Manager</h2>
                <p className="text-gray-500 max-w-md mt-2">Maintain your exquisite collection with precision. Updates reflect instantly across the storefront.</p>
              </div>
              <button 
                onClick={openAdd}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--primary)] text-white rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg"
              >
                <Plus size={18} /> ADD NEW PRODUCT
              </button>
            </div>

            {/* Product List */}
            {loading && products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Syncing with server...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="hidden lg:grid grid-cols-[100px_2fr_1fr_120px_100px_160px] gap-6 px-8 py-4 bg-white border border-[#e5e1da] rounded-2xl text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  <span>Preview</span>
                  <span>Product Details</span>
                  <span>Category</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Stock</span>
                  <span className="text-center">Controls</span>
                </div>

                {products.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="bg-white rounded-2xl border border-[#e5e1da] p-6 lg:px-8 lg:py-4 flex flex-col lg:grid lg:grid-cols-[100px_2fr_1fr_120px_100px_160px] gap-6 items-center hover:border-[var(--primary)] hover:shadow-md transition-all group"
                  >
                    <div className="w-24 h-32 lg:w-20 lg:h-24 bg-[#fcfbf9] rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                      {getProductImage(product) ? (
                        <img src={getProductImage(product)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                          <Package size={32} />
                        </div>
                      )}
                    </div>

                    <div className="w-full lg:w-auto text-center lg:text-left">
                      <h3 className="text-lg font-bold text-[var(--primary)] mb-1 leading-tight group-hover:text-[var(--primary)] transition-colors">
                        {product.name}
                      </h3>
                      <code className="text-[10px] font-mono bg-gray-50 px-2 py-1 rounded text-gray-400">#{product.id || product._id}</code>
                    </div>

                    <div className="hidden lg:block text-sm text-gray-500 font-medium">
                      {product.category}
                    </div>

                    <div className="w-full lg:w-auto flex justify-between lg:block border-t lg:border-t-0 border-gray-50 pt-4 lg:pt-0">
                      <span className="lg:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
                      <p className="text-xl lg:text-lg font-display font-bold text-right">
                        {product.retailPrice ? `₹${product.retailPrice.toLocaleString("en-IN")}` : "N/A"}
                      </p>
                    </div>

                    <div className="w-full lg:w-auto flex justify-between lg:block border-t lg:border-t-0 border-gray-50 pt-4 lg:pt-0">
                      <span className="lg:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</span>
                      <p className={`text-xl lg:text-lg font-bold text-right ${product.stock < 10 ? 'text-red-600' : 'text-green-700'}`}>
                        {product.stock}
                      </p>
                    </div>

                    <div className="w-full lg:w-auto flex gap-2 border-t lg:border-t-0 border-gray-50 pt-6 lg:pt-0">
                      <button
                        onClick={() => openEdit(product)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)] hover:text-white transition-all active:scale-95"
                      >
                        <Edit3 size={14} /> EDIT
                      </button>
                      
                      {deleteConfirm === (product.id || product._id) ? (
                        <button
                          onClick={() => handleDelete(product)}
                          className="flex-1 lg:flex-none bg-red-600 text-white px-5 py-3 rounded-full text-xs font-bold animate-pulse"
                        >
                          CONFIRM?
                        </button>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id || product._id || null)}
                          className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ════════════════════════════════════════ */}
        {/* REVIEWS TAB */}
        {/* ════════════════════════════════════════ */}
        {activeTab === "reviews" && (
          <>
            {/* Reviews Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-display font-bold text-[var(--primary)]">Reviews Manager</h2>
                <p className="text-gray-500 max-w-md mt-2">
                  Manage customer testimonials. Control which reviews are visible on the storefront.
                </p>
              </div>
              <button
                onClick={openAddReview}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--primary)] text-white rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg"
              >
                <Plus size={18} /> ADD NEW REVIEW
              </button>
            </div>

            {/* Review Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[
                { label: "Total Reviews", value: reviews.length, icon: MessageSquare, color: "text-blue-600" },
                { label: "Visible", value: reviews.filter((r) => r.isVisible).length, icon: Eye, color: "text-green-600" },
                { label: "Hidden", value: reviews.filter((r) => !r.isVisible).length, icon: EyeOff, color: "text-gray-400" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#e5e1da] shadow-sm">
                  <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{stat.label}</p>
                  <h4 className="text-2xl font-display font-bold">{stat.value}</h4>
                </div>
              ))}
            </div>

            {/* Review List */}
            {reviewsLoading && reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading reviews...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <MessageSquare size={48} className="text-gray-200" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No reviews yet</p>
                <p className="text-gray-400 text-sm">Add your first customer review to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <div
                    key={review._id || review.id}
                    className={`bg-white rounded-2xl border p-6 hover:shadow-md transition-all group ${
                      review.isVisible ? "border-[#e5e1da]" : "border-dashed border-gray-300 opacity-70"
                    }`}
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm tracking-wide flex-shrink-0">
                          {getInitials(review.name)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--primary)] leading-tight">{review.name}</h4>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                          review.isVisible
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {review.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      "{review.text}"
                    </p>

                    {/* Review Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-50">
                      <button
                        onClick={() => handleToggleVisibility(review)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                          review.isVisible
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {review.isVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                        {review.isVisible ? "HIDE" : "SHOW"}
                      </button>
                      <button
                        onClick={() => openEditReview(review)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)] hover:text-white transition-all"
                      >
                        <Edit3 size={13} /> EDIT
                      </button>
                      {reviewDeleteConfirm === (review.id || review._id) ? (
                        <button
                          onClick={() => handleDeleteReview(review)}
                          className="px-4 py-2 bg-red-600 text-white rounded-full text-xs font-bold animate-pulse"
                        >
                          CONFIRM?
                        </button>
                      ) : (
                        <button
                          onClick={() => setReviewDeleteConfirm(review.id || review._id || null)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all ml-auto"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ════════════════════════════════════════ */}
        {/* SETTINGS TAB */}
        {/* ════════════════════════════════════════ */}
        {activeTab === "settings" && (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-display font-bold text-[var(--primary)]">Account Settings</h2>
                <p className="text-gray-500 max-w-md mt-2">
                  Manage your admin account security and preferences.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Change Password Card */}
              <div className="bg-white rounded-2xl border border-[#e5e1da] p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <KeyRound size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-[var(--primary)]">Change Password</h3>
                    <p className="text-sm text-gray-400">Update your admin login password</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Keep your account secure by updating your password regularly. Your new password must be at least 6 characters long.
                </p>
                <button
                  onClick={() => {
                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    setIsPasswordModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--primary)] text-white rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg"
                >
                  <KeyRound size={16} /> CHANGE PASSWORD
                </button>
              </div>

              {/* Account Info Card */}
              <div className="bg-white rounded-2xl border border-[#e5e1da] p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-[var(--primary)]">Account Info</h3>
                    <p className="text-sm text-gray-400">Your admin account details</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</span>
                    <span className="text-sm font-bold text-[var(--primary)]">{user?.name || "Administrator"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</span>
                    <span className="text-sm font-bold text-[var(--primary)]">{user?.email || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-green-50 text-green-600">Super Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* ════════════════════════════════════════ */}
      {/* Product Drawer/Modal */}
      {/* ════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div
            className="absolute inset-0 bg-[var(--primary)]/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative flex flex-col bg-white w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-500">
            {/* Header - Fixed */}
            <div className="flex-none px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-display font-bold">{isAddMode ? "New Product" : "Edit Details"}</h3>
                <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.2em] mt-1">
                  {isAddMode ? "Adding to inventory" : `Product Ref: ${editingProduct?.id || editingProduct?._id}`}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Product Title *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Banarasi Silk Saree"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all text-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Price (₹) *</label>
                  <input
                    type="text"
                    value={formData.retailPrice}
                    onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Units in Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: "" })}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-bold text-gray-800"
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Subcategory *</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    disabled={!formData.category}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-bold text-gray-800 disabled:opacity-50"
                  >
                    <option value="">Select Subcategory</option>
                    {CATEGORIES.find(c => c.name === formData.category)?.subcategories.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Product Images *</label>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`w-full px-6 py-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${isUploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-[var(--primary)] hover:bg-orange-50'}`}>
                        {isUploading ? (
                          <>
                            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-2" />
                            <span className="text-sm font-bold text-gray-500">Uploading to Cloudinary...</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={32} className="text-[var(--primary)] mb-2" />
                            <span className="text-sm font-bold text-[var(--primary)]">Click or Drag Multiple Images Here</span>
                            <span className="text-xs text-gray-400 mt-1">High quality photos supported</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {formData.images.length > 0 && (
                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {formData.images.map((url, idx) => (
                          <div key={idx} className="relative w-24 h-32 sm:w-24 sm:h-32 rounded-xl overflow-hidden border border-gray-200 shrink-0 shadow-sm group">
                            <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            <button 
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Fabrics (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.fabrics}
                    onChange={(e) => setFormData({ ...formData, fabrics: e.target.value })}
                    placeholder="e.g. Pure Silk, Georgette"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-bold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Colors (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="e.g. Red & Gold, Deep Blue"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-bold text-gray-800"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g. wedding, festive, party"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-bold text-gray-800"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Short Description</label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    rows={2}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Full Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="flex-none bg-white p-6 md:p-8 border-t border-gray-100 rounded-b-3xl flex gap-4">
              <button
                onClick={handleSave}
                className="flex-[2] py-4 bg-[var(--primary)] text-white rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Save size={20} /> {isAddMode ? "ADD TO CATALOG" : "SYNC CHANGES"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-full font-bold text-sm transition-all flex items-center justify-center"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════ */}
      {/* Review Drawer/Modal */}
      {/* ════════════════════════════════════════ */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div
            className="absolute inset-0 bg-[var(--primary)]/80 backdrop-blur-sm"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative flex flex-col bg-white w-full max-w-lg h-auto max-h-[90vh] rounded-t-3xl md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="flex-none px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-display font-bold">{isAddReviewMode ? "New Review" : "Edit Review"}</h3>
                <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.2em] mt-1">
                  {isAddReviewMode ? "Adding customer testimonial" : `Review Ref: ${editingReview?.id || editingReview?._id}`}
                </p>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Customer Name *</label>
                <input
                  type="text"
                  value={reviewFormData.name}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Rating *</label>
                <div className="flex items-center gap-4">
                  {renderStars(reviewFormData.rating, true, (r) =>
                    setReviewFormData({ ...reviewFormData, rating: r })
                  )}
                  <span className="text-sm font-bold text-gray-500">{reviewFormData.rating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Review Text *</label>
                <textarea
                  value={reviewFormData.text}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, text: e.target.value })}
                  rows={4}
                  placeholder="Write the customer's review here..."
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all resize-y"
                />
              </div>

              <div className="flex items-center justify-between bg-gray-50 px-6 py-4 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-[var(--primary)]">Visibility</p>
                  <p className="text-xs text-gray-400">Show this review on the storefront</p>
                </div>
                <button
                  onClick={() =>
                    setReviewFormData({ ...reviewFormData, isVisible: !reviewFormData.isVisible })
                  }
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                    reviewFormData.isVisible ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      reviewFormData.isVisible ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-none bg-white p-6 md:p-8 border-t border-gray-100 rounded-b-3xl flex gap-4">
              <button
                onClick={handleSaveReview}
                className="flex-[2] py-4 bg-[var(--primary)] text-white rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Save size={20} /> {isAddReviewMode ? "ADD REVIEW" : "UPDATE REVIEW"}
              </button>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-full font-bold text-sm transition-all flex items-center justify-center"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════ */}
      {/* Change Password Modal */}
      {/* ════════════════════════════════════════ */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div
            className="absolute inset-0 bg-[var(--primary)]/80 backdrop-blur-sm"
            onClick={() => setIsPasswordModalOpen(false)}
          />
          <div className="relative flex flex-col bg-white w-full max-w-md h-auto max-h-[90vh] rounded-t-3xl md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="flex-none px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-display font-bold">Change Password</h3>
                <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.2em] mt-1">
                  Update your credentials
                </p>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Current Password *</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="Enter your current password"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">New Password *</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="Enter new password (min 6 chars)"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Confirm New Password *</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Re-enter new password"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-xl outline-none transition-all font-medium"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex-none bg-white p-6 md:p-8 border-t border-gray-100 rounded-b-3xl flex gap-4">
              <button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="flex-[2] py-4 bg-[var(--primary)] text-white rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    UPDATING...
                  </>
                ) : (
                  <>
                    <KeyRound size={20} /> UPDATE PASSWORD
                  </>
                )}
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-full font-bold text-sm transition-all flex items-center justify-center"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
