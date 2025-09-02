"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

const BecomeSeller = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    category: "",
    agreedToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    "Electronics",
    "Fashion & Clothing",
    "Home & Garden",
    "Books & Media",
    "Sports & Outdoors",
    "Health & Beauty",
    "Toys & Games",
    "Food & Beverages",
    "Automotive",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required";
    } else if (formData.storeName.trim().length < 2) {
      newErrors.storeName = "Store name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on successful submission
      setFormData({
        storeName: "",
        phone: "",
        category: "",
        agreedToTerms: false,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting seller application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        storeName: "",
        phone: "",
        category: "",
        agreedToTerms: false,
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Become a Seller
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Store Name */}
          <div>
            <label
              htmlFor="storeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Store Name *
            </label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Enter your store name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.storeName ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            />
            {errors.storeName && (
              <p className="mt-1 text-sm text-red-500">{errors.storeName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Business Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Business Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Terms Agreement */}
          <div>
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-orange-600">Terms of Service</span> and{" "}
                <span className="text-orange-600">Seller Policy</span>*
              </span>
            </label>
            {errors.agreedToTerms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.agreedToTerms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Become a Seller"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller;
