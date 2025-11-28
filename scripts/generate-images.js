#!/usr/bin/env node
/**
 * Image generation script for PlanoDerm using OpenRouter API with Gemini 2.5 Flash Image
 * Aesthetic: CARBO-inspired premium corporate medical design
 */

const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../public/images/generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagePrompts = [
  // Team/Doctor Images
  {
    name: 'doctor-professional-1',
    prompt: `Professional medical portrait environment - empty modern medical office with white coat hanging.
    Clean, bright consultation room with soft natural light through large windows.
    Navy blue and teal accents. Premium leather chair, clean desk, medical diplomas on wall (blurred).
    Style: High-end corporate photography, soft shadows, editorial quality.
    Color palette: Navy blue (#1a2f4a), teal (#2d9cca), warm cream, soft whites.
    No people. Focus on the professional medical environment.`
  },
  {
    name: 'surgery-room-modern',
    prompt: `Modern, state-of-the-art dermatology surgery suite. Clean, bright, reassuring atmosphere.
    Surgical lighting (off/soft), modern medical equipment, pristine white surfaces.
    Large windows with natural light, plants for warmth.
    Color palette: Crisp whites, soft teal accents, stainless steel, warm wood tones.
    Style: Architectural photography, premium medical facility, reassuring and professional.
    No people. No graphic medical content. Focus on cleanliness and technology.`
  },
  {
    name: 'patient-waiting-area',
    prompt: `Luxurious medical waiting room for high-end dermatology practice.
    Modern furniture with navy and teal upholstery, large windows, natural light.
    Indoor plants, contemporary art on walls, clean lines.
    Coffee table with magazines, subtle ambient lighting.
    Color palette: Navy blue, teal, cream, natural wood, white walls.
    Style: Interior design photography, boutique medical, hospitality feel.
    No people. Warm, welcoming, premium atmosphere.`
  },

  // Service/Procedure Abstracts
  {
    name: 'mohs-process-abstract',
    prompt: `Abstract medical illustration representing precision skin cancer treatment.
    Geometric shapes suggesting layers and precision - clean circles, precise lines.
    Gradient from navy blue to teal to soft cream.
    Modern, minimalist infographic style with subtle depth.
    Style: Premium medical illustration, tech company aesthetic.
    No realistic medical imagery. Abstract, reassuring, professional.`
  },
  {
    name: 'skin-layers-illustration',
    prompt: `Elegant abstract illustration of healthy skin layers.
    Soft, flowing horizontal bands in gradient colors.
    Cream to soft pink to teal, representing healthy tissue.
    Clean, modern medical illustration style with subtle shadows.
    Style: Scientific illustration meets modern design.
    No realistic skin texture. Clean, abstract, premium feel.`
  },
  {
    name: 'reconstruction-abstract',
    prompt: `Abstract illustration representing healing and restoration.
    Organic flowing shapes coming together, suggesting renewal.
    Soft gradients: cream, soft gold, teal, hints of warm coral.
    Modern, optimistic, professional medical aesthetic.
    Style: Premium medical illustration, hopeful and reassuring.
    No medical imagery. Pure abstract shapes suggesting positive outcomes.`
  },

  // Hero/Background Images
  {
    name: 'hero-gradient-mesh',
    prompt: `Premium abstract gradient mesh background.
    Soft flowing gradients: navy blue (#1a2f4a) to teal (#2d9cca) to cream.
    Subtle organic shapes, very soft and diffused.
    Modern tech company aesthetic, suitable for hero section backdrop.
    Style: Abstract digital art, premium SaaS landing page quality.
    No text, no icons. Pure gradient artwork.`
  },
  {
    name: 'diagonal-pattern-bg',
    prompt: `Subtle geometric background pattern with diagonal lines.
    Very soft teal diagonal stripes on cream background.
    Minimal, barely visible pattern at 5-10% opacity feel.
    Style: Premium corporate background, understated elegance.
    No text. Ultra-minimal, sophisticated.`
  },

  // Team/Culture
  {
    name: 'medical-team-environment',
    prompt: `Modern medical office collaboration space. Empty conference room or team area.
    Large table, comfortable chairs, medical reference materials.
    Whiteboard or large screen, natural light, plants.
    Color palette: Navy, teal, warm wood, white, cream.
    Style: Corporate culture photography, tech startup meets medical.
    No people. Professional, collaborative atmosphere.`
  },
  {
    name: 'reception-desk-modern',
    prompt: `Elegant medical reception desk area for dermatology practice.
    Clean modern desk with subtle navy or teal accent panel.
    Fresh flowers, minimal decor, soft ambient lighting.
    Large windows, comfortable patient seating visible behind.
    Color palette: White, navy, teal accents, warm wood.
    Style: Luxury hospitality meets medical, boutique clinic.
    No people. Welcoming, premium, professional.`
  },

  // Texture/Detail Shots
  {
    name: 'texture-medical-precision',
    prompt: `Abstract close-up of precision medical instruments on clean surface.
    Stainless steel tools arranged artfully, soft shadows.
    Very shallow depth of field, soft focus background.
    Color palette: Silver, white, hints of teal reflection.
    Style: Product photography, premium medical equipment.
    No graphic content. Clean, professional, reassuring.`
  },
  {
    name: 'texture-healing-nature',
    prompt: `Close-up macro of healthy green plant leaves with water droplets.
    Soft natural lighting, shallow depth of field.
    Represents healing, nature, and care.
    Color palette: Soft greens, cream highlights, natural.
    Style: Nature photography, spa/wellness aesthetic.
    No people. Fresh, calming, premium.`
  }
];

function extractBase64FromDataUrl(dataUrl) {
  if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
    // Remove the data URL prefix to get just the base64 data
    const base64Start = dataUrl.indexOf('base64,');
    if (base64Start !== -1) {
      return dataUrl.substring(base64Start + 7);
    }
  }
  return dataUrl;
}

function saveBase64Image(base64Data, outputPath) {
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(outputPath, buffer);
  return outputPath;
}

async function generateImage(prompt, name) {
  console.log(`\nGenerating: ${name}...`);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://planoderm.com',
        'X-Title': 'PlanoDerm Image Generation'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        modalities: ['text', 'image'],
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    console.log('  Response received, parsing...');

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const message = data.choices[0].message;

      // Check for images array - this is the format OpenRouter uses
      if (message.images && Array.isArray(message.images) && message.images.length > 0) {
        const imgObj = message.images[0];

        // Handle the nested structure: { type: "image_url", image_url: { url: "data:..." } }
        if (imgObj && imgObj.type === 'image_url' && imgObj.image_url && imgObj.image_url.url) {
          const dataUrl = imgObj.image_url.url;
          const base64Data = extractBase64FromDataUrl(dataUrl);
          const outputPath = path.join(OUTPUT_DIR, `${name}.png`);
          saveBase64Image(base64Data, outputPath);
          console.log(`  ✓ Saved: ${outputPath}`);
          return outputPath;
        }

        // Also try direct string format
        if (typeof imgObj === 'string') {
          const base64Data = extractBase64FromDataUrl(imgObj);
          const outputPath = path.join(OUTPUT_DIR, `${name}.png`);
          saveBase64Image(base64Data, outputPath);
          console.log(`  ✓ Saved: ${outputPath}`);
          return outputPath;
        }
      }

      // Fallback: check content array
      if (Array.isArray(message.content)) {
        for (const part of message.content) {
          if (part.type === 'image_url' && part.image_url && part.image_url.url) {
            const base64Data = extractBase64FromDataUrl(part.image_url.url);
            const outputPath = path.join(OUTPUT_DIR, `${name}.png`);
            saveBase64Image(base64Data, outputPath);
            console.log(`  ✓ Saved: ${outputPath}`);
            return outputPath;
          }
        }
      }

      console.log('  Response keys:', Object.keys(message));
      if (message.images) {
        console.log('  Images array length:', message.images.length);
        console.log('  First image structure:', JSON.stringify(message.images[0]).slice(0, 200));
      }
      throw new Error('Could not extract image from response');
    }

    throw new Error('Unexpected response format');
  } catch (error) {
    console.error(`  ✗ Error generating ${name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('PlanoDerm Image Generation - CARBO-Inspired Aesthetic');
  console.log('Using OpenRouter API with Gemini 2.5 Flash Image');
  console.log('='.repeat(60));

  if (!OPENROUTER_API_KEY) {
    console.error('\nError: OPENROUTER_API_KEY environment variable not set');
    console.log('Usage: OPENROUTER_API_KEY=your_key node scripts/generate-images.js');
    process.exit(1);
  }

  console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  console.log(`Generating ${imagePrompts.length} images...\n`);

  const results = [];

  for (const { name, prompt } of imagePrompts) {
    const result = await generateImage(prompt, name);
    results.push({ name, success: !!result, path: result });

    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success).length;
  console.log(`\nSuccessful: ${successful}/${results.length}`);

  if (successful > 0) {
    console.log('\nGenerated images:');
    results.filter(r => r.success).forEach(r => {
      console.log(`  - ${r.path}`);
    });
  }

  if (results.filter(r => !r.success).length > 0) {
    console.log('\nFailed:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.name}`);
    });
  }
}

main().catch(console.error);
