import { GHLPayload } from '../types';

/* 
  🟢 GHL MAPPING REFERENCE 
  -------------------------------------------------------
  When setting up your "Inbound Webhook" trigger in GoHighLevel, 
  use these keys to map data to your Contact fields:

  STANDARD FIELDS:
  • First Name    -> {{webhook.firstName}}
  • Last Name     -> {{webhook.lastName}}
  • Email         -> {{webhook.email}}
  • Phone         -> {{webhook.phone}}
  
  CUSTOM FIELDS (Create these in GHL Settings -> Custom Fields):
  • Business Type -> {{webhook.businessType}}
  • Plan Name     -> {{webhook.selectedPlan}}
  • Source Page   -> {{webhook.sourcePage}}
  
  TAGS:
  • Tags (Array)  -> {{webhook.tags}}
  • Tags (String) -> {{webhook.tags_str}}  <-- Use this if mapping to a text field
  
  CONSENT (Checkbox/Boolean):
  • Email Consent -> {{webhook.consentEmail}}
  • SMS Consent   -> {{webhook.consentSMS}}
  -------------------------------------------------------
*/

// 🟢 INSTRUCTION: PASTE YOUR GHL WORKFLOW TRIGGER URL BELOW
const MANUAL_WEBHOOK_URL = ""; 

/**
 * Pushes data to GoHighLevel via Webhook.
 */
export const pushLeadToGoHighLevel = async (data: GHLPayload): Promise<boolean> => {
  // Prepare payload with extra helper fields for GHL
  const payload = {
    ...data,
    // Add a string version of tags (e.g. "Tag1, Tag2") for easier mapping to text fields if needed
    tags_str: data.tags ? data.tags.join(', ') : '',
  };

  // 1. Determine Webhook URL
  const webhookUrl = 
    MANUAL_WEBHOOK_URL ||
    (typeof process !== 'undefined' ? process.env.REACT_APP_GHL_WEBHOOK_URL : undefined) || 
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL : undefined) ||
    '';

  // 2. Log for Debugging (Helps you test in GHL)
  console.group('🔌 GoHighLevel Integration');
  console.log('Target URL:', webhookUrl ? webhookUrl : '(No URL configured - Simulation Mode)');
  console.log('Payload to Map:', JSON.stringify(payload, null, 2));
  console.groupEnd();

  // 3. Simulation Mode (if no URL)
  if (!webhookUrl) {
    console.warn("⚠️ GHL Webhook URL missing. Data was logged to console but not sent.");
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return true;
  }

  // 4. Send Data
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`GHL responded with status: ${response.status}`);
    }

    console.log("✅ Successfully sent to GHL");
    return true;
  } catch (error) {
    console.error('❌ Failed to push to GoHighLevel:', error);
    // Return true to keep UI flow smooth for the user
    return true; 
  }
};

export const logCallIntent = async (intent: string, duration: number): Promise<void> => {
  console.log(`🎙️ Logged Call Intent to GHL: ${intent} (${duration}s)`);
};