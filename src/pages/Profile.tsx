import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../utils/uploadImage";
import { User, Mail, Phone, Camera, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch or create profile data
  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone_number, avatar_url")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        // Profile exists → set state
        setFullName(data.full_name || "Default Name");
        setPhoneNumber(data.phone_number || "0000000000");
        setAvatarUrl(data.avatar_url || "");
      } else {
        // Profile does not exist → create default row
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          full_name: "Default Name",
          phone_number: "0000000000",
          avatar_url: ""
        });

        if (insertError) {
          console.error("Error creating profile:", insertError.message);
        } else {
          setFullName("Default Name");
          setPhoneNumber("0000000000");
          setAvatarUrl("");
        }
      }
    };

    fetchOrCreateProfile();
  }, [user]);

  // Save profile updates
  const handleSave = async () => {
  if (!user) return;
  setLoading(true);

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: fullName,
      phone_number: phoneNumber,
      avatar_url: avatarUrl,
    });

  setLoading(false);

  if (error) {
    alert("Update failed: " + error.message);
  } else {
    alert("Profile updated!");
  }
};


  // Handle avatar change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;
    const file = e.target.files[0];
    const url = await uploadImage(file, user.id);
    if (url) setAvatarUrl(url);
  };

  // Logout and redirect to login
  const handleLogout = async () => {
    await logout();
    navigate("/longin");
  };

  if (!user) return <div>No user logged in</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <img
          src={avatarUrl || `https://ui-avatars.com/api/?name=${fullName || "User"}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600"
        />
        <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer text-blue-500">
          <Camera className="w-4 h-4" /> Change Photo
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
      </div>

      {/* Full Name */}
      <div>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
          <User className="w-4 h-4" /> Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
          <Mail className="w-4 h-4" /> Email
        </label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
          <Phone className="w-4 h-4" /> Phone Number
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
