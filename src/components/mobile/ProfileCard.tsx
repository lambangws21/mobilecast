"use client";
import { Profile } from "@/types/mobile";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex items-center space-x-4">
      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-3xl">
        🧑‍🎓
      </div>
      <div>
        <p className="font-semibold text-slate-800">{profile.name}</p>
        <p className="text-xs text-slate-500">
          {profile.level} {"⭐".repeat(profile.stars)}
        </p>
      </div>
    </div>
  );
}
