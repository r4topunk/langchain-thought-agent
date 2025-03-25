#!/usr/bin/env node
import { prisma } from '../src/lib/db/client';
import { PersonalityType } from '../src/lib/services/personality';

async function main() {
  console.log('Setting up database...');

  // Check if we already have any personality profiles
  const existingProfiles = await prisma.personalitySettings.findMany();

  if (existingProfiles.length === 0) {
    console.log('Creating default personality profiles...');
    
    // Create default profiles based on Inside Out characters
    const defaultProfiles = [
      {
        name: 'Balanced',
        joyLevel: 50,
        sadnessLevel: 50,
        angerLevel: 50,
        fearLevel: 50,
        disgustLevel: 50,
        isActive: true
      },
      {
        name: 'Joy',
        joyLevel: 90,
        sadnessLevel: 20,
        angerLevel: 20,
        fearLevel: 20,
        disgustLevel: 20,
        isActive: false
      },
      {
        name: 'Sadness',
        joyLevel: 20,
        sadnessLevel: 90,
        angerLevel: 20,
        fearLevel: 40,
        disgustLevel: 20,
        isActive: false
      },
      {
        name: 'Anger',
        joyLevel: 20,
        sadnessLevel: 20,
        angerLevel: 90,
        fearLevel: 30,
        disgustLevel: 40,
        isActive: false
      },
      {
        name: 'Fear',
        joyLevel: 20,
        sadnessLevel: 40,
        angerLevel: 30,
        fearLevel: 90,
        disgustLevel: 30,
        isActive: false
      },
      {
        name: 'Disgust',
        joyLevel: 30,
        sadnessLevel: 20,
        angerLevel: 50,
        fearLevel: 20,
        disgustLevel: 90,
        isActive: false
      }
    ];

    // Insert all default profiles
    await Promise.all(
      defaultProfiles.map(profile => 
        prisma.personalitySettings.create({
          data: profile
        })
      )
    );
    
    console.log('Default personality profiles created successfully!');
  } else {
    console.log('Personality profiles already exist, skipping creation');
  }

  console.log('Database setup completed successfully!');
}

main()
  .catch((error) => {
    console.error('Error setting up database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });