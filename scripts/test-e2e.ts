import { prisma } from '../src/lib/db/client';
import { createPersonalityProfile, getAllPersonalityProfiles } from '../src/lib/services/personality';
import { generateReflection } from '../src/lib/services/agent';
import { getThoughtHistoryForPrompt } from '../src/lib/services/thoughts';

async function testE2E() {
  console.log('🧪 Starting end-to-end tests...');

  try {
    // 1. Test Database Connection
    console.log('\n📁 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // 2. Test Personality Profile Creation
    console.log('\n👤 Testing personality profile creation...');
    const testProfile = await createPersonalityProfile(
      'Test Profile',
      60, // joy
      40, // sadness
      30, // anger
      50, // fear
      20, // disgust
      true // set as active
    );
    console.log('✅ Created test personality profile:', testProfile.name);

    // 3. Verify Profile Retrieval
    console.log('\n🔍 Testing profile retrieval...');
    const profiles = await getAllPersonalityProfiles();
    console.log(`✅ Retrieved ${profiles.length} personality profiles`);

    // 4. Test Reflection Generation
    console.log('\n🤔 Testing reflection generation...');
    const testPrompt = 'What are the implications of artificial intelligence on human creativity?';
    console.log('Generating reflection for prompt:', testPrompt);
    
    const reflection = await generateReflection(testPrompt);
    console.log('✅ Generated reflection with prompt ID:', reflection.promptId);

    // 5. Test Thought History Retrieval
    console.log('\n📚 Testing thought history retrieval...');
    const thoughts = await getThoughtHistoryForPrompt(reflection.promptId);
    console.log(`✅ Retrieved ${thoughts.length} thoughts for the prompt`);

    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    await prisma.personalitySettings.delete({
      where: { id: testProfile.id }
    });
    console.log('✅ Test data cleaned up');

    console.log('\n✨ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testE2E()
  .catch((error) => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });