import { prisma } from '../db/client';
import { PersonalitySettings } from '@prisma/client';

export const PersonalityType = {
  JOY: "joy",
  SADNESS: "sadness",
  ANGER: "anger",
  FEAR: "fear",
  DISGUST: "disgust",
} as const;

export type PersonalityType = typeof PersonalityType[keyof typeof PersonalityType];

// Get all personality profiles
export async function getAllPersonalityProfiles(): Promise<PersonalitySettings[]> {
  return prisma.personalitySettings.findMany({
    orderBy: { createdAt: 'asc' }
  });
}

// Get the currently active personality profile
export async function getActivePersonalityProfile(): Promise<PersonalitySettings | null> {
  return prisma.personalitySettings.findFirst({
    where: { isActive: true }
  });
}

// Create a new personality profile
export async function createPersonalityProfile(
  name: string,
  joyLevel: number,
  sadnessLevel: number,
  angerLevel: number,
  fearLevel: number, 
  disgustLevel: number,
  setActive: boolean = false
): Promise<PersonalitySettings> {
  // If this profile should be active, deactivate all others
  if (setActive) {
    await prisma.personalitySettings.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    });
  }
  
  return prisma.personalitySettings.create({
    data: {
      name,
      joyLevel,
      sadnessLevel,
      angerLevel,
      fearLevel,
      disgustLevel,
      isActive: setActive
    }
  });
}

// Update an existing personality profile
export async function updatePersonalityProfile(
  id: string,
  updates: Partial<Omit<PersonalitySettings, 'id' | 'createdAt'>>
): Promise<PersonalitySettings> {
  // If setting this profile as active, deactivate all others first
  if (updates.isActive) {
    await prisma.personalitySettings.updateMany({
      where: { NOT: { id } },
      data: { isActive: false }
    });
  }
  
  return prisma.personalitySettings.update({
    where: { id },
    data: updates
  });
}

// Delete a personality profile
export async function deletePersonalityProfile(id: string): Promise<void> {
  const profileToDelete = await prisma.personalitySettings.findUnique({
    where: { id }
  });
  
  if (!profileToDelete) {
    throw new Error(`Profile with ID ${id} not found`);
  }
  
  // If this is the active profile, activate another one
  if (profileToDelete.isActive) {
    const otherProfile = await prisma.personalitySettings.findFirst({
      where: { NOT: { id } }
    });
    
    if (otherProfile) {
      await prisma.personalitySettings.update({
        where: { id: otherProfile.id },
        data: { isActive: true }
      });
    }
  }
  
  await prisma.personalitySettings.delete({
    where: { id }
  });
}