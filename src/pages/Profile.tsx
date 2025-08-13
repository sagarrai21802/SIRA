import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";
import { User, Mail, LogOut } from "lucide-react";

interface ProfileData {
  id: string;
  full_name?: string;
  avatar_url?: string;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const userId = user.id ?? user.user?.id;
      if (!userId) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data as ProfileData);
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="text-gray-600 dark:text-gray-300">
        No user logged in
      </div>
    );
  }

  const avatarUrl =
    profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.full_name || user.user_metadata?.name || "User"
    )}`;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-4">
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600"
        />

        {/* Name & Email */}
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User className="w-5 h-5" />{" "}
          {profile?.full_name || user.user_metadata?.name || "No name set"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Mail className="w-4 h-4" /> {user.email}
        </p>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}
