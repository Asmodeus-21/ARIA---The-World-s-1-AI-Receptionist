# 🎤 ARIA Audio Diagnostics Guide

## Critical Issues Fixed

### Issue #1: Audio is All Zeros (Peak: 0.00000000) 🔴
**Status**: ✅ **DIAGNOSTICS ADDED**

**Problem**: Microphone has permission but captures zero audio.

**Diagnosis Implementation**:
1. **Peak Level Detection** - Every 2 seconds, logs:
   - Current frame peak level
   - Maximum peak seen since connection
   - Percentage of frames with no signal
   - All-zeros detection with critical alert

2. **Device Enumeration** - On startup logs:
   - List of all available microphones
   - Which device is actually selected
   - Device ID and settings

3. **Gain Visualization** - Every 2 seconds shows:
   - Audio level BEFORE 8x gain amplification
   - Audio level AFTER gain amplification  
   - Whether gain is actually having an effect

### Issue #2: Audio Queue Never Flushes 🔴
**Status**: ✅ **DIAGNOSTICS ADDED**

**Problem**: Queued audio is sent but it's all zeros, so ARIA hears nothing.

**Diagnosis Implementation**:
1. **Queue Flush Analysis** - When WebSocket connects:
   - Checks each queued audio chunk
   - Reports if audio is zero or valid
   - Shows ratio of valid vs zero chunks
   - Critical alert if ALL queued audio is zero

### Issue #3: No Feedback on What's Happening 🔴
**Status**: ✅ **UI & DIAGNOSTICS ADDED**

**Diagnosis Implementation**:
1. **Test Speaker Button** 🔊
   - Independent test of speaker output
   - Doesn't depend on microphone or WebSocket
   - Plays 440 Hz test tone for 1 second
   - Verifies entire audio playback path

2. **Real-time Logs** - Every 2 seconds shows:
   ```
   📊 ===== AUDIO DIAGNOSTICS =====
      Peak level THIS frame: 0.00234567
      Max peak seen so far: 0.01234567
      Frames with NO signal: 5 / 100 (5%)
      Min value: 0.00000000 Avg: 0.00023456
      ❌ ALL ZEROS DETECTED? NO - Audio captured OK
      WebSocket state: OPEN ✅
      ==============================
   ```

## 🎯 Step-by-Step Troubleshooting

### Step 1: Check Microphone Permission
1. Open DevTools (F12)
2. Go to Console tab
3. You should see:
   ```
   🎤 Available microphones: X
   [0] Microphone Name (ID: abc12345...)
   ✓ Microphone granted
   ✓ Using device: Microphone Name
   ```
4. **If you see "Microphone denied"**: 
   - Check browser settings → Privacy → Microphone → Allow this site
   - Reload page and try again

### Step 2: Verify Microphone Input
1. Look at DevTools console every 2 seconds
2. Check for this log pattern:
   ```
   🔊 GAIN DIAGNOSTICS: Before=XX/YY, After=ZZ/WW, Effect=8.Nx
   ```
3. **If "Before" values are VERY LOW (< 5)**:
   - ❌ Microphone not capturing audio
   - Check system volume mixer - is browser muted?
   - Check browser microphone settings
   - Try a different microphone

4. **If "Before" values are HIGH (> 50)**:
   - ✅ Microphone is working
   - Check "After" should be ~8x higher

### Step 3: Check for All-Zeros Audio
1. After 5+ seconds of operation, you'll see:
   ```
   📊 ===== AUDIO DIAGNOSTICS =====
      ...
      Frames with NO signal: X / Y (Z%)
      ❌ ALL ZEROS DETECTED? YES - CRITICAL!
   ```
2. **If YES, ALL ZEROS DETECTED**:
   - **Browser microphone muted**: Check browser settings
   - **System microphone muted**: Check Windows Sound Settings
   - **Microphone hardware issue**: Check volume mixer
   - **Wrong device selected**: Close and reopen, try different mic

### Step 4: Test Speaker Output
1. Click the "🔊 Test Speaker" button
2. Listen for a short 440 Hz beep
3. Check console for:
   ```
   🔊 Playing test tone to verify speakers...
   ✅ Test tone playing (440 Hz for 1 second)
   ```
4. **If you DON'T hear the beep**:
   - Speaker output is broken
   - Check volume settings
   - Check audio routing

### Step 5: Verify WebSocket Connection
1. Look for these logs when connecting:
   ```
   🔗 Connecting WebSocket to: wss://api.elevenlabs.io/...
   ✅ CONNECTED to ElevenLabs! WebSocket readyState: 1
   📤 Flushing X queued audio chunks
   ✅ Queued audio flushed (X/X sent), ready for live capture
   ```
2. **If WebSocket doesn't connect**:
   - Check Agent ID in environment variables
   - Check API Key is correct
   - Check internet connection
   - Check browser allows WebSocket connections

## 📊 Understanding the Diagnostics Output

### Peak Level Values
- **0.00000000**: No audio at all ❌
- **0.00001 - 0.0001**: Very quiet (microphone may be muted) ⚠️
- **0.0001 - 0.001**: Quiet but acceptable ℹ️
- **0.001 - 0.1**: Normal voice input ✅
- **0.1+**: Loud input (may cause clipping) ⚠️

### Audio Context Sample Rates
The code handles:
- **Input context**: Any sample rate (handled internally)
- **Microphone input**: 16000 Hz (PCM format)
- **Output context**: Any sample rate (ElevenLabs uses 24000 Hz by default)
- **Resampling**: Automatic if rates don't match

### Gain Amplification
- Input is amplified by **8x**
- This means a 0.001 peak becomes 0.008 peak
- If you see `Effect=8.0x` or higher, gain is working
- If gain is NOT working, check:
  - Browser microphone permissions
  - Audio hardware
  - System audio settings

## 🔧 Configuration Values (Can be tuned)

In `LiveAgentModal.tsx`:
```typescript
inputGainNode.gain.value = 8;  // Amplification factor
```

Adjust if audio is too quiet or too loud after this point.

### AudioWorklet Processor
- Located: `/public/audioWorklet.js`
- Captures audio in 4096 sample chunks
- Sends to main thread for encoding
- Can be adjusted for different buffer sizes

## 🐛 Common Issues & Fixes

### Issue: "Audio queue empty, playback finished" but no audio
- ✅ Microphone is working (audio captured)
- ❌ But speaker output isn't playing
- **Fix**: Click "🔊 Test Speaker" to verify speaker path

### Issue: "VERY QUIET AUDIO DETECTED"
- ✅ Permission granted, audio flowing
- ⚠️ Input level too low
- **Fix**: 
  - Check system microphone volume
  - Check browser microphone volume
  - Move microphone closer to your mouth

### Issue: Logs show GAIN DIAGNOSTICS very low
- ❌ Microphone not capturing anything
- **Fix**:
  - Check microphone is not muted
  - Check browser permissions
  - Try different microphone device

### Issue: WebSocket connects but ARIA doesn't respond
- ✅ Connection works
- ⚠️ Audio not reaching ARIA (likely all zeros)
- **Fix**: Go to Step 2-3 above, verify audio is actually captured

## 📈 Expected Log Sequence

When everything works correctly:

1. **Startup**:
   ```
   🎤 Available microphones: 1
   [0] Built-in Microphone (ID: abcd1234...)
   ✓ Microphone granted
   ✓ Using device: Built-in Microphone
   ```

2. **Audio Setup**:
   ```
   🔊 Input gain set to 8x amplification
   🔊 GAIN DIAGNOSTICS: Before=75/150, After=200/255, Effect=8.1x
   ✓ Audio input ready
   ```

3. **Connection**:
   ```
   🔗 Connecting WebSocket to: wss://api.elevenlabs.io/...
   ✅ CONNECTED to ElevenLabs! WebSocket readyState: 1
   ✅ Queued audio flushed, ready for live capture
   ```

4. **Capture Loop** (every 2 seconds):
   ```
   📊 ===== AUDIO DIAGNOSTICS =====
      Peak level THIS frame: 0.03456789
      Max peak seen so far: 0.04567890
      Frames with NO signal: 0 / 100 (0%)
      ❌ ALL ZEROS DETECTED? NO - Audio captured OK
      WebSocket state: OPEN ✅
   ```

## 🚀 Advanced Debugging

### Enable Full Browser DevTools Audio Tab
```javascript
// In DevTools console:
console.log('Input Context state:', inputContextRef.current?.state);
console.log('Output Context state:', outputContextRef.current?.state);
console.log('WebSocket readyState:', wsRef.current?.readyState);
```

### Check for Permission Persistence
```javascript
// Check if permissions are remembered
navigator.permissions.query({ name: 'microphone' })
  .then(result => console.log('Permission status:', result.state));
```

### Monitor Memory Usage
```javascript
// Check if audio buffers are being released
console.log('Audio sources in flight:', audioSourcesRef.current.length);
console.log('Output queue size:', audioQueueRef.current.length);
console.log('Input queue size:', inputAudioQueueRef.current.length);
```

## 📞 Support Checklist

Before reporting an issue, verify:
- [ ] Microphone permission is ALLOWED (not blocked)
- [ ] System microphone volume is > 50%
- [ ] Microphone is not muted in OS sound settings
- [ ] Microphone is not muted in browser
- [ ] Speaker volume is on (Test Speaker button works)
- [ ] Internet connection is stable
- [ ] API Key and Agent ID are correct
- [ ] Console shows "ALL ZEROS DETECTED? NO"
- [ ] WebSocket state shows OPEN ✅

If all above are OK and audio still doesn't work:
1. Restart browser
2. Refresh the page
3. Try a different microphone if available
4. Check browser console for error messages
5. Share the console logs with support
