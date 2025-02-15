import * as WavEncoder from 'wav-encoder'

export const convertToWav = async (webmBlob) => {
  const arrayBuffer = await webmBlob.arrayBuffer()
  const audioContext = new AudioContext()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  const wavBuffer = await WavEncoder.encode({
    sampleRate: audioBuffer.sampleRate,
    channelData: [
      audioBuffer.getChannelData(0), // Left channel
      audioBuffer.numberOfChannels > 1
        ? audioBuffer.getChannelData(1)
        : audioBuffer.getChannelData(0), // Right channel
    ],
  })

  return new Blob([wavBuffer], { type: 'audio/wav' })
}
