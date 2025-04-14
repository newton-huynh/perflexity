"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


import { toast } from "sonner";
import { UserProfile } from "@/lib/definitions";
export function LabelWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {children}
    </div>
  );
}

export default function ProfileModal({ isProfileOpen, setProfileOpen, setProfile, handleSave, handleReset, profile }: { isProfileOpen: boolean, setProfileOpen: (open: boolean) => void, setProfile: (profile: UserProfile) => void, handleSave: () => void, handleReset: (  ) => void, profile: UserProfile }) {


  return (
    <Dialog open={isProfileOpen} onOpenChange={setProfileOpen}>
      <DialogContent className=" max-w-3xl ">
        <DialogHeader>
          <DialogTitle>Edit Your Fitness Profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="goals">Fitness Goals</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* --- Basic Info --- */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <LabelWrapper>
                  <Label>Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder={profile.name}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Height</Label>
                  <Input
                    value={profile.height}
                    onChange={(e) => setProfile({...profile, height: e.target.value})}
                    placeholder={profile.height}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Weight (lbs)</Label>
                  <Input
                    value={profile.weight}
                    onChange={(e) => setProfile({...profile, weight: e.target.value})}
                    placeholder={profile.weight}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Gender</Label>
                  <Select
                    onValueChange={(val) => setProfile({...profile, gender: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={profile.gender || "Select gender"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Race</Label>
                  <Input
                    value={profile.race}
                    onChange={(e) => setProfile({...profile, race: e.target.value})}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Age</Label>
                  <Input
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: e.target.value})}
                  />
                </LabelWrapper>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Fitness Goals --- */}
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Fitness Goals</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <LabelWrapper>
                  <Label>Fitness Goal</Label>
                  <Select
                    onValueChange={(val) => setProfile({...profile, goal: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                      <SelectItem value="fat_loss">Fat Loss</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Diet</Label>
                  <Select onValueChange={(val) => setProfile({...profile, diet: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet" />
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
                  <Label>Gym Frequency</Label>
                  <Select onValueChange={(val) => setProfile({...profile, frequency: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1 - 2 days/week</SelectItem>
                      <SelectItem value="3-4">3 - 4 days/week</SelectItem>
                      <SelectItem value="5-6">5 - 6 days/week</SelectItem>
                      <SelectItem value="7">7 days/week</SelectItem>
                    </SelectContent>
                  </Select>
                </LabelWrapper>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Advanced --- */}
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <LabelWrapper>
                  <Label>Squat Max (lbs)</Label>
                  <Input
                    value={profile.squat}
                    onChange={(e) => setProfile({...profile, squat: e.target.value})}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Bench Max (lbs)</Label>
                  <Input
                    value={profile.bench}
                    onChange={(e) => setProfile({...profile, bench: e.target.value})}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Deadlift Max (lbs)</Label>
                  <Input
                    value={profile.deadlift}
                    onChange={(e) => setProfile({...profile, deadlift: e.target.value})}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Answer Style</Label>
                  <Select
                    onValueChange={(val) =>
                      setProfile({...profile, answerStyle: val})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="in-depth">In depth</SelectItem>
                    </SelectContent>
                  </Select>
                </LabelWrapper>
                <LabelWrapper className="col-span-2">
                  <Label>Favorite Influencer</Label>
                  <Input
                    value={profile.influencer}
                    onChange={(e) =>
                      setProfile({...profile, influencer: e.target.value})
                    }
                    placeholder="e.g. Jeff Nippard, Jessie James West"
                  />
                </LabelWrapper>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-2 flex gap-2 w-full justify-around ">
          <Button onClick={() => {handleReset(); toast.success("Profile cleared successfully")}} className="bg-red-300 hover:bg-red-600 self-start">Clear</Button>
          <Button onClick={() => {handleSave(); toast.success("Profile saved successfully")}} className="hover:bg-green-600">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
