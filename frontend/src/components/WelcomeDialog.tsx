"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

  DialogDescription,

} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/storage";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WelcomeDialog({
  setProfileOpen,
}: {
  isProfileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
}) {
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
      <DialogContent className="flex flex-col items-center gap-8">
        <DialogHeader className="flex flex-col items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={32} height={32} />
          <DialogTitle>Welcome to Perflexity!</DialogTitle>
        </DialogHeader>
        <DialogDescription className="w-9/10 text-center">
        <p>
  💪 Ready to lift <strong> smarter</strong>, not <strong>harder?</strong><br />
  🧠 Craving <strong>personalized</strong> workouts built for you?<br />
  🍽️ Looking for tips that <strong>match your lifestyle?</strong><br /><br />
  Create your <strong>fitness profile</strong> and unlock <strong>personalized workouts</strong>, 
  <strong>nutrition tips</strong>, and <strong>pro-level insights</strong>—all tailored just for you. <br /><br/>
            Let’s get swole the smart way. 
          </p>
        </DialogDescription>
        <div className="flex flex-row gap-8 justify-around w-full">
          <Button
            onClick={handleDismiss}
            className="bg-gray-400 hover:bg-red-600"
          >
            Skip
          </Button>
          <Button onClick={handleEditProfile} className="hover:bg-green-600">
            Create Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
