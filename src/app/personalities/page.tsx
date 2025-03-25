'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { getAllPersonalityProfiles, createPersonalityProfile, updatePersonalityProfile, deletePersonalityProfile } from '@/lib/services/personality';
import { Trash2, Check, Plus, ArrowLeftCircle } from 'lucide-react';

type PersonalityProfile = {
  id: string;
  name: string;
  joyLevel: number;
  sadnessLevel: number;
  angerLevel: number;
  fearLevel: number;
  disgustLevel: number;
  isActive: boolean;
  createdAt: number;
};

export default function PersonalitiesPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<PersonalityProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProfile, setNewProfile] = useState({
    name: '',
    joyLevel: 50,
    sadnessLevel: 50,
    angerLevel: 50,
    fearLevel: 50,
    disgustLevel: 50,
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const fetchedProfiles = await getAllPersonalityProfiles();
        // Convert Date objects to numbers to match PersonalityProfile type
        const fixedProfiles = fetchedProfiles.map(profile => ({
          ...profile,
          createdAt: profile.createdAt instanceof Date ? 
            profile.createdAt.getTime() : profile.createdAt
        }));
        setProfiles(fixedProfiles);
      } catch (error) {
        console.error('Failed to load personality profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfiles();
  }, []);
  
  const handleCreateProfile = async () => {
    if (!newProfile.name.trim()) {
      console.error('Please provide a name for your personality profile');
      return;
    }
    
    try {
      setIsLoading(true);
      const createdProfile = await createPersonalityProfile(
        newProfile.name,
        newProfile.joyLevel,
        newProfile.sadnessLevel,
        newProfile.angerLevel,
        newProfile.fearLevel,
        newProfile.disgustLevel,
        // Set as active if it's the first profile
        profiles.length === 0
      );
      
      // Convert Date to number if needed to match PersonalityProfile type
      const fixedCreatedProfile = {
        ...createdProfile,
        createdAt: createdProfile.createdAt instanceof Date ? 
          createdProfile.createdAt.getTime() : createdProfile.createdAt
      };
      
      setProfiles(prev => [...prev, fixedCreatedProfile]);
      setNewProfile({
        name: '',
        joyLevel: 50,
        sadnessLevel: 50,
        angerLevel: 50,
        fearLevel: 50,
        disgustLevel: 50,
      });
      setIsCreateDialogOpen(false);
      console.log('Personality profile created successfully');
    } catch (error) {
      console.error('Failed to create personality profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSetActive = async (id: string) => {
    try {
      setIsLoading(true);
      await updatePersonalityProfile(id, { isActive: true });
      
      // Update local state to reflect changes
      setProfiles(prev => 
        prev.map(profile => ({
          ...profile,
          isActive: profile.id === id
        }))
      );
      
      console.log('Active personality updated');
    } catch (error) {
      console.error('Failed to update active personality:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateProfile = async (id: string, updates: Partial<PersonalityProfile>) => {
    try {
      setIsLoading(true);
      const updatedProfile = await updatePersonalityProfile(id, updates);
      
      // Convert Date to number if needed to match PersonalityProfile type
      const fixedProfile = {
        ...updatedProfile,
        createdAt: typeof updatedProfile.createdAt === 'object' ? 
          updatedProfile.createdAt.getTime() : updatedProfile.createdAt
      };
      
      // Update local state
      setProfiles(prev => 
        prev.map(profile => 
          profile.id === id ? fixedProfile : profile
        )
      );
      
      console.log('Personality profile updated');
    } catch (error) {
      console.error('Failed to update personality profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteProfile = async (id: string) => {
    try {
      setIsLoading(true);
      await deletePersonalityProfile(id);
      
      // Remove from local state
      setProfiles(prev => prev.filter(profile => profile.id !== id));
      
      console.log('Personality profile deleted');
    } catch (error) {
      console.error('Failed to delete personality profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Personality Profiles</h1>
            <p className="text-neutral-400">
              Customize how your reflection machine thinks and feels
            </p>
          </div>
          <Button onClick={() => router.push('/')} variant="outline" className="flex items-center gap-2">
            <ArrowLeftCircle className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {profiles.map(profile => (
            <Card 
              key={profile.id} 
              className={`bg-neutral-800/50 border-neutral-700 transition-all ${
                profile.isActive ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-neutral-900' : ''
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{profile.name}</CardTitle>
                    <CardDescription>
                      {profile.isActive ? (
                        <span className="text-green-400 font-medium">Active Profile</span>
                      ) : 'Inactive Profile'}
                    </CardDescription>
                  </div>
                  {!profile.isActive && (
                    <Button 
                      size="sm" 
                      onClick={() => handleSetActive(profile.id)}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Set Active
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      Joy
                    </span>
                    <span>{profile.joyLevel}%</span>
                  </div>
                  <Slider 
                    value={[profile.joyLevel]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => {
                      handleUpdateProfile(profile.id, { joyLevel: value[0] });
                    }}
                    disabled={isLoading}
                    className="[&>span]:bg-yellow-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      Sadness
                    </span>
                    <span>{profile.sadnessLevel}%</span>
                  </div>
                  <Slider 
                    value={[profile.sadnessLevel]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => {
                      handleUpdateProfile(profile.id, { sadnessLevel: value[0] });
                    }}
                    disabled={isLoading}
                    className="[&>span]:bg-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      Anger
                    </span>
                    <span>{profile.angerLevel}%</span>
                  </div>
                  <Slider 
                    value={[profile.angerLevel]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => {
                      handleUpdateProfile(profile.id, { angerLevel: value[0] });
                    }}
                    disabled={isLoading}
                    className="[&>span]:bg-red-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      Fear
                    </span>
                    <span>{profile.fearLevel}%</span>
                  </div>
                  <Slider 
                    value={[profile.fearLevel]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => {
                      handleUpdateProfile(profile.id, { fearLevel: value[0] });
                    }}
                    disabled={isLoading}
                    className="[&>span]:bg-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      Disgust
                    </span>
                    <span>{profile.disgustLevel}%</span>
                  </div>
                  <Slider 
                    value={[profile.disgustLevel]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => {
                      handleUpdateProfile(profile.id, { disgustLevel: value[0] });
                    }}
                    disabled={isLoading}
                    className="[&>span]:bg-green-500"
                  />
                </div>
              </CardContent>
              <CardFooter>
                {!profile.isActive && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteProfile(profile.id)}
                    disabled={isLoading}
                    className="ml-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
          
          {/* Create new personality card */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Card className="bg-neutral-800/30 border-neutral-700 border-dashed cursor-pointer hover:bg-neutral-800/50 transition-all flex flex-col items-center justify-center min-h-[400px]">
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-medium">Create New Personality</p>
                  <p className="text-neutral-400 text-sm">
                    Customize a new emotional blend
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-neutral-700 text-neutral-50">
              <DialogHeader>
                <DialogTitle>Create New Personality Profile</DialogTitle>
                <DialogDescription>
                  Customize the emotional blend for your new AI personality.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="profile-name" className="text-sm font-medium">
                    Profile Name
                  </label>
                  <Input
                    id="profile-name"
                    value={newProfile.name}
                    onChange={(e) => setNewProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Optimistic, Analytical, Balanced"
                    className="bg-neutral-900 border-neutral-700"
                  />
                </div>
                
                <div className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        Joy
                      </span>
                      <span>{newProfile.joyLevel}%</span>
                    </div>
                    <Slider 
                      value={[newProfile.joyLevel]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => {
                        setNewProfile(prev => ({ ...prev, joyLevel: value[0] }));
                      }}
                      className="[&>span]:bg-yellow-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        Sadness
                      </span>
                      <span>{newProfile.sadnessLevel}%</span>
                    </div>
                    <Slider 
                      value={[newProfile.sadnessLevel]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => {
                        setNewProfile(prev => ({ ...prev, sadnessLevel: value[0] }));
                      }}
                      className="[&>span]:bg-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        Anger
                      </span>
                      <span>{newProfile.angerLevel}%</span>
                    </div>
                    <Slider 
                      value={[newProfile.angerLevel]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => {
                        setNewProfile(prev => ({ ...prev, angerLevel: value[0] }));
                      }}
                      className="[&>span]:bg-red-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        Fear
                      </span>
                      <span>{newProfile.fearLevel}%</span>
                    </div>
                    <Slider 
                      value={[newProfile.fearLevel]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => {
                        setNewProfile(prev => ({ ...prev, fearLevel: value[0] }));
                      }}
                      className="[&>span]:bg-purple-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        Disgust
                      </span>
                      <span>{newProfile.disgustLevel}%</span>
                    </div>
                    <Slider 
                      value={[newProfile.disgustLevel]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={(value) => {
                        setNewProfile(prev => ({ ...prev, disgustLevel: value[0] }));
                      }}
                      className="[&>span]:bg-green-500"
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProfile} disabled={isLoading}>
                  Create Profile
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="bg-neutral-800/50 border-neutral-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Personality Profiles Guide</CardTitle>
            <CardDescription>
              Understand how different emotions influence AI reflections
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-yellow-500 mb-3 flex items-center justify-center">
                <span className="text-xl">😊</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Joy</h3>
              <p className="text-neutral-300 text-sm">
                Optimistic perspectives, focusing on opportunities and positive aspects.
              </p>
            </div>
            
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-500 mb-3 flex items-center justify-center">
                <span className="text-xl">😢</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Sadness</h3>
              <p className="text-neutral-300 text-sm">
                Thoughtful and introspective, considering deeper meanings and what may be lost.
              </p>
            </div>
            
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-red-500 mb-3 flex items-center justify-center">
                <span className="text-xl">😠</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Anger</h3>
              <p className="text-neutral-300 text-sm">
                Direct and passionate, identifying problems and injustices that need to be addressed.
              </p>
            </div>
            
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-purple-500 mb-3 flex items-center justify-center">
                <span className="text-xl">😨</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Fear</h3>
              <p className="text-neutral-300 text-sm">
                Cautious and vigilant, anticipating risks and considerations for safety.
              </p>
            </div>
            
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-green-500 mb-3 flex items-center justify-center">
                <span className="text-xl">🤢</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Disgust</h3>
              <p className="text-neutral-300 text-sm">
                Discerning and critical, identifying what doesn't align with core values and standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}