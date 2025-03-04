"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, User, Edit2, Check, X } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

interface UserInfoCardProps {
  user: UserProfile;
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(
    `${user.first_name} ${user.last_name}`
  );

  const handleSave = () => {
    // In a real app, you would save changes to the database and split the full name
    // into first_name and last_name fields
    setIsEditing(false);
    // You would update the user object here by splitting the full name
    // const [first_name, ...lastNameParts] = fullName.split(' ');
    // const last_name = lastNameParts.join(' ');
    // updateUser({ first_name, last_name });
  };

  const handleCancel = () => {
    setFullName(`${user.first_name} ${user.last_name}`);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden mt-12">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-1" /> Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600"
                onClick={handleSave}
              >
                <Check className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-500 block">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700">{`${user.first_name} ${user.last_name}`}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-500 block">Email Address</label>
            <div className="flex items-center text-gray-700">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 border-t">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-500">
            Account Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-600">2</p>
              <p className="text-sm text-gray-600">Completed Trips</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-green-600">2</p>
              <p className="text-sm text-gray-600">Upcoming Trips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
