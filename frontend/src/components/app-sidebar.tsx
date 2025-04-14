"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveProfile, getProfile, clearProfile } from "@/lib/storage";
import Image from "next/image";
import { UserProfile } from "@/lib/definitions";
import { toast } from "sonner";
import WelcomeDialog from "./WelcomeDialog";
import ProfileModal from "./ProfileModal";
const defaultProfile: UserProfile = {
  name: "",
  height: "",
  weight: "",
  gender: "",
  race: "",
  age: "",
  goal: "",
  diet: "",
  frequency: "",
  squat: "",
  bench: "",
  deadlift: "",
  answerStyle: "",
  influencer: "",
  responseLength: 5,
  toggleCitations: false,
};

function LabelWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 justify-start items-start ${className}`}
    >
      {children}
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [profile, setProfile] = useState(defaultProfile);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const saved = getProfile();
    if (saved) setProfile(saved);
  }, []);

  const update = (key: string, value: any) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveProfile(profile);
  };

  const handleReset = () => {
    clearProfile();
    setProfile(defaultProfile);
  };

  return (
    <Sidebar
      className="h-[calc(100svh-var(--header-height))] overflow-y-auto mt-(--header-height)"
      {...props}
    >
      <WelcomeDialog
        isProfileOpen={isProfileOpen}
        setProfileOpen={setIsProfileOpen}
      />
      <ProfileModal
        isProfileOpen={isProfileOpen}
        setProfileOpen={setIsProfileOpen}
        setProfile={setProfile}
        handleSave={handleSave}
        handleReset={handleReset}
        profile={profile}
      />

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    Perflexity Playground
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Where gains begin
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-4 p-4 overflow-y-auto">
        {/* Section: Basic Info */}
        <Card>
          <CardHeader className="flex justify-center">
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <LabelWrapper>
              <Label>Name:</Label>
              <Input
                value={profile.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Name"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Height:</Label>
              <Input
                value={profile.height}
                onChange={(e) => update("height", e.target.value)}
                placeholder="Height"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Weight:</Label>
              <Input
                value={profile.weight}
                onChange={(e) => update("weight", e.target.value)}
                placeholder="Weight"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Race:</Label>
              <Input
                value={profile.race}
                onChange={(e) => update("race", e.target.value)}
                placeholder="Race"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Age:</Label>
              <Input
                value={profile.age}
                onChange={(e) => update("age", e.target.value)}
                placeholder="Age"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Gender:</Label>
              <Select onValueChange={(val) => update("gender", val)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={profile.gender || "Select Gender"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </LabelWrapper>
          </CardContent>
        </Card>

        {/* Section: Goals */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <LabelWrapper>
              <Label>Goal:</Label>
              <Select onValueChange={(val) => update("goal", val)}>
                <SelectTrigger>
                  <SelectValue placeholder={profile.goal || "Goal"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="fat_loss">Fat Loss</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </LabelWrapper>
            <LabelWrapper>
              <Label>Diet:</Label>
              <Select onValueChange={(val) => update("diet", val)}>
                <SelectTrigger>
                  <SelectValue placeholder={profile.diet || "Diet"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="halal">Halal</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </LabelWrapper>
            <LabelWrapper>
              <Label>Gym Frequency:</Label>
              <Select onValueChange={(val) => update("frequency", val)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={profile.frequency || "Gym Frequency"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 days</SelectItem>
                  <SelectItem value="3-4">3-4 days</SelectItem>
                  <SelectItem value="5-6">5-6 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                </SelectContent>
              </Select>
            </LabelWrapper>
          </CardContent>
        </Card>

        {/* Section: Advanced */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Advanced</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <LabelWrapper>
              <Label>Squat Max:</Label>
              <Input
                value={profile.squat}
                onChange={(e) => update("squat", e.target.value)}
                placeholder="Squat Max"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Bench Max:</Label>
              <Input
                value={profile.bench}
                onChange={(e) => update("bench", e.target.value)}
                placeholder="Bench Max"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Deadlift Max:</Label>
              <Input
                value={profile.deadlift}
                onChange={(e) => update("deadlift", e.target.value)}
                placeholder="Deadlift Max"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Favorite Influencer:</Label>
              <Input
                value={profile.influencer}
                onChange={(e) => update("influencer", e.target.value)}
                placeholder="Favorite Influencer"
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label>Answer Style:</Label>
              <Select onValueChange={(val) => update("answerStyle", val)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={profile.answerStyle || "Answer Style"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="in-depth">In-depth</SelectItem>
                </SelectContent>
              </Select>
            </LabelWrapper>
          </CardContent>
        </Card>

        {/* Section: Extras */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Extras</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row justify-between">
            <LabelWrapper className="flex flex-col gap-4">
              <Label>Response Length:</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[profile.responseLength ? profile.responseLength : 5]}
                onValueChange={([val]) => update("responseLength", val)}
              />
            </LabelWrapper>
            <LabelWrapper className="flex flex-col items-center justify-center text-center">
              <Label>Toggle Inline Citations:</Label>
              <Switch  className="align-center" checked={profile.toggleCitations} onCheckedChange={(val) => update("toggleCitations", val)}  />
            </LabelWrapper>
          </CardContent>
        </Card>
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-2 p-4">
        <Button variant="outline" onClick={() => {handleReset(); toast.success("Profile reset successfully")}} className="hover:bg-red-400 hover:text-white transition-all duration-300">
          Reset
        </Button>
        <Button onClick={() => {handleSave(); toast.success("Profile saved successfully")}} className="hover:bg-emerald-400 hover:text-white transition-all duration-300">Save</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
