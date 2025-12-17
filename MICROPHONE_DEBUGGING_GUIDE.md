# Microphone Audio Capture Debugging Guide

## Problem Statement
User reports: "BOT IS STILL not picking up my audio"  
Console shows: `⚠️ Audio may be completely silent - verify microphone is working`

This happens **EVEN THOUGH** the handleAudioData function IS being called (audio IS flowing through the system).

## Root Cause Analysis

The issue appears to be **one of these**:

### 1. **Gain Still Too Low** (Most Likely)
- **Current Setting**: `inputGainNode.gain.value = 20`
- **Microphone Output**: Typically -30dB to -20dB (very quiet)
- **Status**: JUST INCREASED from 8x to 20x (20 measures increase may not be enough)
- **Next Action**: May need to increase to 50x or 100x
- **Code Location**: [LiveAgentModal.tsx#L275](LiveAgentModal.tsx#L275)

### 2. **AudioContext Suspended**
- **Issue**: Browser may suspend AudioContext until user interaction
- **Status**: NOW CHECKING - code added to resume if suspended
- **Code Location**: [LiveAgentModal.tsx#L256](LiveAgentModal.tsx#L256)

### 3. **AudioWorklet Not Being Called**
- **Issue**: process() method might not be invoked if worklet not properly connected
- **Status**: NOW LOGGING - frame counter will show if worklet is processing
- **Code Location**: [audioWorklet.js#L26](audioWorklet.js#L26)

### 4. **MediaStream Track Disabled**
- **Issue**: Microphone track might be captured but immediately disabled
- **Status**: NOW CHECKING - logging track.enabled property
- **Code Location**: [LiveAgentModal.tsx#L241](LiveAgentModal.tsx#L241)

### 5. **Analyser Not Detecting Signal**
- **Issue**: The frequency analysers might show zero signal
- **Status**: NOW CHECKING - more detailed diagnostics added
- **Code Location**: [LiveAgentModal.tsx#L300](LiveAgentModal.tsx#L300)

### 6. **AudioGraph Not Connected Properly**
- **Issue**: microphone → gain → worklet chain broken
- **Status**: VERIFIED - connections look correct, but may need to test
- **Code Location**: [LiveAgentModal.tsx#L428-430](LiveAgentModal.tsx#L428-430)

## Console Logs to Check

When you run the code, open DevTools console and look for:

### ✅ **Good Signs** (Audio IS flowing)
```
✓ Microphone granted
✓ Using device: [your microphone name]
✓ AudioWorkletNode created
📡 AudioWorklet message #1 - peak: 0.0234
📦 handleAudioData call #1 with 2048 samples
```

### 🔴 **Bad Signs** (Audio NOT flowing)
```
🔴 CRITICAL: No audio tracks in stream!
🔴 TRACK DISABLED! Microphone captured but track is disabled!
🔴 CRITICAL: Analyser detects ZERO signal at both stages
⚠️ Input AudioContext is SUSPENDED!
```

### ⚠️ **Warning Signs** (Audio too quiet)
```
⚠️ Microphone input is VERY QUIET (avg: 2.3/255)
⚠️ VERY QUIET AUDIO DETECTED (peak: 0.00000234)
🔊 GAIN DIAGNOSTICS: Before=5.2, After=4.8 - GAIN REDUCING SIGNAL!
```

## Diagnostic Output Format

### Frequency Analyser Diagnostics (every 2 seconds)
```
🔊 GAIN DIAGNOSTICS: Before=15.2/185, After=210.5/255, Effect=13.8x, Sum: 2940 → 40601
```

- **Before**: Signal level BEFORE gain amplification
- **After**: Signal level AFTER 20x gain
- **Effect**: Measured gain ratio
- **Sum**: Total energy in frequency spectrum

### Audio Worklet Diagnostics (every 30 messages)
```
📡 AudioWorklet message #30 - peak: 0.2345 samples: 2048
[AudioWorklet] Processing frame #100, muted=false, hasInput=true, hasChannel=true
```

- **peak**: Current frame's highest sample value
- **samples**: Number of samples in this frame
- **hasInput/hasChannel**: Whether input was received

## Troubleshooting Checklist

1. **System Microphone**
   - [ ] Check system volume/mute status
   - [ ] Check browser microphone permissions
   - [ ] Check if other apps can use microphone (test with video call app)
   - [ ] Try a different microphone if available

2. **Browser Settings**
   - [ ] Check browser privacy settings (allow microphone)
   - [ ] Check if browser muted microphone access
   - [ ] Try incognito/private mode
   - [ ] Try different browser

3. **Website Code**
   - [ ] Check console for error messages
   - [ ] Verify `inputGainNode.gain.value` is high enough (20x may not be enough)
   - [ ] Check if AudioContext is suspended/running
   - [ ] Check if AudioWorklet is processing frames

4. **Audio Graph**
   - [ ] Verify frequency analyser shows non-zero values
   - [ ] Check gain is actually amplifying (After > Before)
   - [ ] Verify worklet messages arriving at main thread
   - [ ] Check WebSocket connection status

## Key Code Sections

### Gain Amplification
**File**: [LiveAgentModal.tsx#L275](LiveAgentModal.tsx#L275)
```typescript
inputGainNode.gain.value = 20; // Increased to 20x
```
**IF STILL QUIET**: Try 50-100x

### AudioContext Suspension Check
**File**: [LiveAgentModal.tsx#L256](LiveAgentModal.tsx#L256)
```typescript
if (inputContextRef.current.state === 'suspended') {
  await inputContextRef.current.resume();
}
```

### AudioWorklet Connection
**File**: [LiveAgentModal.tsx#L427-430](LiveAgentModal.tsx#L427-430)
```typescript
inputGainNode.connect(workletNode);
workletNode.connect(inputContextRef.current.destination);
```

### Silence Detection
**File**: [LiveAgentModal.tsx#L387](LiveAgentModal.tsx#L387)
```typescript
if (max < 0.0001) {
  console.warn('⚠️ VERY QUIET AUDIO DETECTED');
}
```

## Expected Values for Working System

- **Peak level per frame**: > 0.001 (ideally 0.01-0.1)
- **Frequency analyser average**: > 10/255 (ideally 30-100/255)
- **Analyser max**: > 50/255 (ideally 150-255/255)
- **Gain effect**: Measured at ~20x (or whatever value set)
- **Worklet frame count**: Should increase every millisecond

## Next Steps

1. ✅ **Increase Gain Further**
   - Current: 20x
   - Test: 50x, then 100x if needed
   - Monitor console for peak level changes

2. ✅ **Enable Aggressive Audio Processing**
   - May need noise reduction AFTER gain (not before)
   - May need compression/normalization

3. ✅ **Test Hardware Separately**
   - Use browser's native voice testing
   - Test with Google Meet or Zoom
   - Test with browser's voice input

4. ✅ **Consider Server-Side Normalization**
   - ElevenLabs API may have volume normalization
   - May not be an issue on receiving end

## Recent Changes Made

- ✅ Increased gain from 8x → 20x
- ✅ Added AudioContext suspension detection and recovery
- ✅ Added detailed frequency analyser diagnostics
- ✅ Added microphone track state checking
- ✅ Added AudioWorklet frame processing logs
- ✅ Added sample rate and channel count requests
- ✅ Improved error logging throughout

## Files Modified

1. **components/LiveAgentModal.tsx**
   - Lines 275: Gain increased to 20x
   - Lines 241-253: Track settings logging
   - Lines 256-263: AudioContext suspension check
   - Lines 300-315: Analyser diagnostics improved
   - Lines 449-461: Worklet logging improved

2. **public/audioWorklet.js**
   - Lines 21-26: First-frame detection
   - Lines 27-30: Enhanced frame counting logs

---

**Last Updated**: [timestamp]  
**Status**: 🟡 AWAITING USER TESTING  
**Next Milestone**: Test with gain=20x, report peak level values from console
