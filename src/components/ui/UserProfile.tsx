import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  LogOut,
  ChevronRight,
  X,
  Edit2,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

interface UserProfileProps {
  session: Session;
  handleLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  session,
  handleLogout,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "none" | "profile" | "settings" | "notifications"
  >("none");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile Form State
  const meta = session.user?.user_metadata || {};
  const userEmail = session.user?.email || "yourname@gmail.com";

  // Extract alphabetical prefix from email for default name
  const emailPrefix = userEmail.split("@")[0];
  const defaultNameFromEmail =
    emailPrefix.match(/^[a-zA-Z]+/)?.[0] || emailPrefix;
  const formattedDefaultName =
    defaultNameFromEmail.charAt(0).toUpperCase() +
    defaultNameFromEmail.slice(1);

  const [name, setName] = useState(meta.name || formattedDefaultName);
  const [mobile, setMobile] = useState(meta.mobile || "");
  const [location, setLocation] = useState(meta.location || "");
  const [avatarData, setAvatarData] = useState(
    meta.avatar || meta.avatar_url || meta.picture || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  // Advanced Settings State
  const [password, setPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    meta.two_factor_enabled || false,
  );
  const [currency, setCurrency] = useState(meta.currency || "USD");

  // Notification State
  const defaultNotifPrefs = {
    trade_alerts: true,
    market_news: false,
    mentorship: true,
    promotions: false,
  };
  const [notifPrefs, setNotifPrefs] = useState(
    meta.notification_prefs || defaultNotifPrefs,
  );
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  // Handlers
  const handleUpdatePassword = async () => {
    if (!password) return;
    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) alert("Error updating password: " + error.message);
      else {
        alert("Password updated successfully!");
        setPassword("");
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleToggle2FA = async (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    await supabase.auth.updateUser({ data: { two_factor_enabled: enabled } });
  };

  const handleCurrencyChange = async (newCurrency: string) => {
    setCurrency(newCurrency);
    await supabase.auth.updateUser({ data: { currency: newCurrency } });
  };

  const handleSaveNotifPrefs = async () => {
    setIsSavingPrefs(true);
    try {
      await supabase.auth.updateUser({
        data: { notification_prefs: notifPrefs },
      });
      closeModal();
    } finally {
      setIsSavingPrefs(false);
    }
  };
  const userName = name; // Update username dynamically
  const userInitials =
    userName.length > 0
      ? userName.charAt(0).toUpperCase()
      : userEmail.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const openModal = (modalName: "profile" | "settings" | "notifications") => {
    setActiveModal(modalName);
    setShowDropdown(false); // Close dropdown when opening a modal
  };

  const closeModal = () => setActiveModal("none");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 150;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // compress to jpeg 0.7
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setAvatarData(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, mobile, location, avatar: avatarData },
      });
      if (error) {
        alert("Error saving profile: " + error.message);
      } else {
        closeModal();
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative z-50 text-black">
      {/* Avatar Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white text-black flex items-center justify-center font-bold uppercase shadow-lg border border-gray-200 overflow-hidden"
      >
        {avatarData ? (
          <img
            referrerPolicy="no-referrer"
            src={avatarData}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg">{userInitials}</span>
        )}
      </button>

      {/* 1. Dropdown Menu */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-[280px] sm:w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden"
        >
          {/* User Info Header */}
          <div className="p-5 flex items-center gap-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xl shrink-0 overflow-hidden">
              {avatarData ? (
                <img
                  referrerPolicy="no-referrer"
                  src={avatarData}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                userInitials
              )}
            </div>
            <div className="truncate">
              <h4 className="font-semibold text-gray-900 text-sm truncate">
                {userName}
              </h4>
              <p className="text-gray-500 text-xs truncate">{userEmail}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={() => openModal("profile")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-700"
            >
              <div className="flex items-center gap-3">
                <User size={18} className="text-gray-500" />
                <span className="text-sm font-medium">My Profile</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>

            <button
              onClick={() => openModal("settings")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-700"
            >
              <div className="flex items-center gap-3">
                <SettingsIcon size={18} className="text-gray-500" />
                <span className="text-sm font-medium">Settings</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>

            <button
              onClick={() => openModal("notifications")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-gray-500" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 mt-1"
            >
              <LogOut size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Profile Modal */}
      {activeModal === "profile" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 border-b border-gray-100 pb-6 sm:pb-8 mb-6 sm:mb-8 text-center sm:text-left">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-3xl overflow-hidden border-2 border-white shadow-sm">
                    {avatarData ? (
                      <img
                        referrerPolicy="no-referrer"
                        src={avatarData}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      userInitials
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    <Edit2 size={12} />
                  </button>
                </div>
                <div className="mt-2 sm:mt-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {userName}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {userEmail}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 border-b border-gray-50 pb-3 sm:pb-4">
                  <span className="text-sm font-medium text-gray-500 sm:w-32 shrink-0">
                    Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-left sm:text-right text-gray-900 text-base sm:text-sm focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 border-b border-gray-50 pb-3 sm:pb-4">
                  <span className="text-sm font-medium text-gray-500 sm:w-32 shrink-0">
                    Email account
                  </span>
                  <input
                    type="text"
                    value={userEmail}
                    readOnly
                    className="w-full text-left sm:text-right text-gray-900 text-base sm:text-sm focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 border-b border-gray-50 pb-3 sm:pb-4">
                  <span className="text-sm font-medium text-gray-500 sm:w-48 shrink-0">
                    Mobile number{" "}
                    <span className="text-xs text-gray-400 font-normal ml-1">
                      (Optional)
                    </span>
                  </span>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Add number"
                    className="w-full text-left sm:text-right text-gray-900 text-base sm:text-sm focus:outline-none bg-transparent placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 pb-3 sm:pb-4">
                  <span className="text-sm font-medium text-gray-500 sm:w-32 shrink-0">
                    Location
                  </span>
                  <div className="w-full">
                    <input
                      type="text"
                      list="locations-list"
                      placeholder="Search location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-left sm:text-right text-gray-900 text-base sm:text-sm focus:outline-none bg-transparent placeholder:text-gray-400"
                    />
                    <datalist id="locations-list">
                      <option value="USA" />
                      <option value="UK" />
                      <option value="India" />
                      <option value="Canada" />
                      <option value="Australia" />
                      <option value="Germany" />
                      <option value="France" />
                      <option value="United Arab Emirates" />
                      <option value="Singapore" />
                    </datalist>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Change"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Settings Modal */}
      {activeModal === "settings" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Settings</h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8">
              {/* Security Section */}
              <section>
                <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">
                  Security
                </h4>
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Change Password
                        </p>
                        <p className="text-xs text-gray-500">
                          Update your account password
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <button
                        onClick={handleUpdatePassword}
                        disabled={isUpdatingPassword || !password}
                        className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        {isUpdatingPassword ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Two-Factor Auth
                      </p>
                      <p className="text-xs text-gray-500">
                        Add an extra layer of security
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => handleToggle2FA(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Preferences Section */}
              <section>
                <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">
                  Preferences
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Currency
                      </p>
                      <p className="text-xs text-gray-500">
                        Base display currency
                      </p>
                    </div>
                    <select
                      value={currency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* 4. Notifications Modal */}
      {activeModal === "notifications" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                Notification Preferences
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {[
                {
                  id: "trade_alerts",
                  title: "Trade Execution Alerts",
                  desc: "Get notified when a live trade setup is shared.",
                },
                {
                  id: "market_news",
                  title: "Market News & Updates",
                  desc: "Daily market recaps and breaking news alerts.",
                },
                {
                  id: "mentorship",
                  title: "Mentorship Reminders",
                  desc: "Alerts for upcoming live sessions and Q&As.",
                },
                {
                  id: "promotions",
                  title: "Promotions & Offers",
                  desc: "Updates on new courses and special discounts.",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={notifPrefs[item.id as keyof typeof notifPrefs]}
                      onChange={(e) =>
                        setNotifPrefs({
                          ...notifPrefs,
                          [item.id]: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-50 bg-gray-50/50">
              <button
                onClick={handleSaveNotifPrefs}
                disabled={isSavingPrefs}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium text-sm py-2.5 rounded-xl transition-colors shadow-sm"
              >
                {isSavingPrefs ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
