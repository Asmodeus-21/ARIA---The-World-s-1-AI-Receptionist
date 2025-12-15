/**
 * Utility functions for audio processing
 * Works with both base64-encoded PCM audio and Float32Array buffers
 * Refactored for ElevenLabs Conversational AI API
 */

/**
 * Convert Float32Array PCM audio to base64 string
 * @param data Float32Array of PCM audio samples
 * @returns Base64 encoded string
 */
export const pcmToBase64 = (data: Float32Array): string => {
  const l = data.length;
  const int16 = new Int16Array(l);
  
  // Convert float32 [-1, 1] to int16 [-32768, 32767]
  for (let i = 0; i < l; i++) {
    int16[i] = Math.max(-1, Math.min(1, data[i])) < 0 
      ? data[i] * 0x8000 
      : data[i] * 0x7FFF;
  }
  
  const bytes = new Uint8Array(int16.buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  return btoa(binary);
};

/**
 * Create a Blob-like object from Float32Array (for compatibility)
 * @param data Float32Array of PCM audio samples
 * @returns Object with base64 data and MIME type
 */
export const createBlob = (data: Float32Array): { data: string; mimeType: string } => {
  return {
    data: pcmToBase64(data),
    mimeType: 'audio/pcm;rate=16000',
  };
};

/**
 * Decode base64-encoded PCM audio to AudioBuffer
 * @param base64Data Base64 encoded PCM audio
 * @param ctx AudioContext for creating the buffer
 * @param sampleRate Sample rate of the audio (default: 24000 for ElevenLabs)
 * @returns AudioBuffer ready for playback
 */
export const decodeAudioData = async (
  base64Data: string,
  ctx: AudioContext,
  sampleRate: number = 24000
): Promise<AudioBuffer> => {
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Convert bytes to int16 samples
  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length;
  
  // Create mono AudioBuffer
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);
  
  // Convert int16 [-32768, 32767] to float32 [-1, 1]
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 0x8000;
  }
  
  return buffer;
};

/**
 * Resample audio from one sample rate to another
 * @param audioData Float32Array of audio samples
 * @param fromSampleRate Current sample rate
 * @param toSampleRate Target sample rate
 * @returns Resampled Float32Array
 */
export const resampleAudio = async (
  audioData: Float32Array,
  fromSampleRate: number,
  toSampleRate: number
): Promise<Float32Array> => {
  // If sample rates match, return as-is
  if (fromSampleRate === toSampleRate) {
    return audioData;
  }

  // Use OfflineAudioContext for resampling
  const offlineCtx = new OfflineAudioContext(
    1,
    Math.ceil(audioData.length * (toSampleRate / fromSampleRate)),
    toSampleRate
  );

  const buffer = offlineCtx.createBuffer(1, audioData.length, fromSampleRate);
  buffer.getChannelData(0).set(audioData);

  const source = offlineCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(offlineCtx.destination);
  source.start(0);

  const offlineBuffer = await offlineCtx.startRendering();
  return offlineBuffer.getChannelData(0);
};
