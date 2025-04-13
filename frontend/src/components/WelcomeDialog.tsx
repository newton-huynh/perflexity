"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/storage";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WelcomeDialog({ isProfileOpen, setProfileOpen }: { isProfileOpen: boolean, setProfileOpen: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const profile = getProfile();
    const dismissed = localStorage.getItem("welcomeDialogDismissed");

    if (!profile && !dismissed) {
      setOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("welcomeDialogDismissed", "true");
    setOpen(false);
  };

  const handleEditProfile = () => {
    localStorage.setItem("welcomeDialogDismissed", "true");
    setOpen(false);
    setProfileOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Perflexity</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Want personalized fitness recommendations? Create a profile to get
          started.
        </DialogDescription>
        <div className="flex flex-col gap-8">
          <Button onClick={handleDismiss}>Dismiss</Button>
          <Button onClick={handleEditProfile}>Edit Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
