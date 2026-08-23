import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useClickOutside from "../../hooks/ui/HandleClickOutside.js";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  uploadAvatar,
  updateUsername,
  updatePassword,
} from "../../service/user.js";
import defaultAvatar from "../../assets/images/Avatar.png";

export function useUserData({ isOpen, onClose, user }) {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Avatar & File State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    user?.avatar_url || user?.avatar || ""
  );

  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  // 1. React Query Mutation: Avatar Upload
  const { mutateAsync: uploadAvatarMutation, isPending: isUploading } =
    useMutation({
      mutationFn: (file) => uploadAvatar(file),
    });

  // 2. React Query Mutation: Username Update
  const { mutateAsync: updateUsernameMutation, isPending: isUpdatingUsername } =
    useMutation({
      mutationFn: (name) => updateUsername(name),
    });

  // 3. React Query Mutation: Password Update
  const { mutateAsync: updatePasswordMutation, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: (pass) => updatePassword(pass),
    });

  const isSaving = isUploading || isUpdatingUsername || isUpdatingPassword;

  // Sync state when user loads or modal opens
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setPreviewUrl(user.avatar_url || user.avatar || "");
      setSelectedFile(null);
    }
  }, [user, isOpen]);

  // Click outside to close modal
  useClickOutside(modalRef, () => {
    if (isOpen && onClose && !isSaving) onClose();
  });

  // File Picker Change Handler (Instant 0ms Preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // 🟢 Batch Handler: Updates Backend & Syncs AuthContext State Immediately!
  const handleSave = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    // 🟢 1. Username Validation (Top level - ALWAYS RUNS!)
    if (!username || username.trim().length < 3) {
      setFeedback({
        type: "error",
        message: "Tên người dùng không được để trống và phải có ít nhất 3 ký tự!",
      });
      return;
    }

    // 🟢 2. Password Validation (Runs ONLY if password fields are filled)
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setFeedback({
          type: "error",
          message: "Mật khẩu xác nhận không trùng khớp!",
        });
        return;
      }
      if (newPassword.length < 6) {
        setFeedback({
          type: "error",
          message: "Mật khẩu mới phải có ít nhất 6 ký tự!",
        });
        return;
      }
    }

    try {
      let avatarResult = null;
      let usernameResult = null;

      // Step A: Upload Avatar if selected
      if (selectedFile) {
        avatarResult = await uploadAvatarMutation(selectedFile);
      }

      // Step B: Update Username if changed
      if (username && username.trim() !== user?.username) {
        usernameResult = await updateUsernameMutation(username.trim());
      }

      // Step C: Update Password if filled
      if (newPassword) {
        await updatePasswordMutation(newPassword);
      }

      // 1. Invalidate React Query Cache
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // 2. SYNC AuthContext State Immediately (0ms update across app)!
      const newAvatarUrl = avatarResult?.avatar_url || previewUrl;
      const newUsernameText = usernameResult?.username || username.trim();

      setUser((prevUser) => ({
        ...prevUser,
        username: newUsernameText,
        avatar_url: newAvatarUrl,
        avatar: newAvatarUrl,
      }));

      if (avatarResult?.avatar_url) {
        setPreviewUrl(avatarResult.avatar_url);
      }

      setFeedback({
        type: "success",
        message: "Đã lưu thay đổi thành công!",
      });

      // Reset sensitive fields
      setNewPassword("");
      setConfirmPassword("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Save profile error:", error);
      setFeedback({
        type: "error",
        message: error?.message || "Đã xảy ra lỗi khi lưu thông tin!",
      });
    }
  };

  const initialLetter = (username || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return {
    username,
    setUsername,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    previewUrl,
    selectedFile,
    isSaving,
    fileInputRef,
    handleFileChange,
    feedback,
    modalRef,
    handleSave,
    initialLetter,
    defaultAvatar,
  };
}
