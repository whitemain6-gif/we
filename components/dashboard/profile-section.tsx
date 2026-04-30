'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit2, Check, X, Camera } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  position: string;
  phone: string;
  avatar: string;
  initials: string;
  tier: string;
  joinDate: string;
}

export function ProfileSection() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Jimmy Fallon',
    email: 'jimmy.fallon@corefinity.com',
    position: 'Manager',
    phone: '+1 (555) 123-4567',
    avatar: '/images/profile-jimmy.jpg',
    initials: 'JF',
    tier: 'Enterprise Plan',
    joinDate: 'January 1, 2024',
  });

  const [editedName, setEditedName] = useState(profile.name);
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [editedPosition, setEditedPosition] = useState(profile.position);
  const [editedPhone, setEditedPhone] = useState(profile.phone);

  const handleSaveName = () => {
    setProfile({ ...profile, name: editedName });
    setIsEditingName(false);
  };

  const handleCancelName = () => {
    setEditedName(profile.name);
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    setProfile({ ...profile, email: editedEmail });
    setIsEditingEmail(false);
  };

  const handleCancelEmail = () => {
    setEditedEmail(profile.email);
    setIsEditingEmail(false);
  };

  const handleSavePosition = () => {
    setProfile({ ...profile, position: editedPosition });
    setIsEditingPosition(false);
  };

  const handleCancelPosition = () => {
    setEditedPosition(profile.position);
    setIsEditingPosition(false);
  };

  const handleSavePhone = () => {
    setProfile({ ...profile, phone: editedPhone });
    setIsEditingPhone(false);
  };

  const handleCancelPhone = () => {
    setEditedPhone(profile.phone);
    setIsEditingPhone(false);
  };

  return (
    <Card className="bg-card shadow-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">Profile Information</CardTitle>
        <CardDescription className="text-xs">Manage your account details and profile picture</CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="space-y-6">
          
          {/* Avatar Section */}
          <div className="flex items-center gap-4 pb-5 border-b border-border/40">
            <div className="relative group cursor-pointer shrink-0">
              <Avatar className="h-16 w-16 shadow-card">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <Camera className="text-white h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{profile.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                JPG, GIF or PNG. Max size 800K
              </p>
              <Button variant="secondary" size="sm" className="h-7 text-xs px-3">
                Upload Image
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Name Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Full Name</label>
                {!isEditingName && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {isEditingName ? (
                <div className="flex gap-1.5">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1 h-8 text-sm"
                    placeholder="Enter your name"
                    autoFocus
                  />
                  <Button size="sm" variant="default" onClick={handleSaveName} className="h-8 w-8 p-0">
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelName} className="h-8 w-8 p-0">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-foreground font-medium h-8 flex items-center border border-border/40 px-3 bg-muted/20 rounded-md">
                  {profile.name}
                </p>
              )}
            </div>

            {/* Email Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email Address</label>
                {!isEditingEmail && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingEmail(true)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {isEditingEmail ? (
                <div className="flex gap-1.5">
                  <Input
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="flex-1 h-8 text-sm"
                    placeholder="Enter your email"
                    autoFocus
                  />
                  <Button size="sm" variant="default" onClick={handleSaveEmail} className="h-8 w-8 p-0">
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEmail} className="h-8 w-8 p-0">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-foreground font-medium h-8 flex items-center border border-border/40 px-3 bg-muted/20 rounded-md truncate">
                  {profile.email}
                </p>
              )}
            </div>

            {/* Position Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Position</label>
                {!isEditingPosition && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingPosition(true)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {isEditingPosition ? (
                <div className="flex gap-1.5">
                  <Input
                    value={editedPosition}
                    onChange={(e) => setEditedPosition(e.target.value)}
                    className="flex-1 h-8 text-sm"
                    placeholder="Enter your position"
                    autoFocus
                  />
                  <Button size="sm" variant="default" onClick={handleSavePosition} className="h-8 w-8 p-0">
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelPosition} className="h-8 w-8 p-0">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-foreground font-medium h-8 flex items-center border border-border/40 px-3 bg-muted/20 rounded-md">
                  {profile.position}
                </p>
              )}
            </div>

            {/* Phone Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone Number</label>
                {!isEditingPhone && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingPhone(true)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              {isEditingPhone ? (
                <div className="flex gap-1.5">
                  <Select defaultValue="+1">
                    <SelectTrigger className="w-[90px] h-8 text-xs">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">US (+1)</SelectItem>
                      <SelectItem value="+44">UK (+44)</SelectItem>
                      <SelectItem value="+91">IN (+91)</SelectItem>
                      <SelectItem value="+61">AU (+61)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="flex-1 h-8 text-sm"
                    placeholder="Enter phone number"
                  />
                  <Button size="sm" variant="default" onClick={handleSavePhone} className="h-8 w-8 p-0">
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelPhone} className="h-8 w-8 p-0">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-foreground font-medium h-8 flex items-center border border-border/40 px-3 bg-muted/20 rounded-md">
                  {profile.phone}
                </p>
              )}
            </div>

            {/* Plan & Join Date - side by side */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/40">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan</label>
                <p className="text-sm text-foreground h-8 flex items-center border border-border/40 px-3 bg-muted/20 rounded-md">
                  {profile.tier}
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Member Since</label>
                <p className="text-sm text-foreground h-8 flex items-center border border-border/40 px-3 bg-muted/20 rounded-md">
                  {profile.joinDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
