let stream: any;

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  return stream;
};

const get = () => stream;

const remove = () => {
  if (!stream) return;

  stream.getVideoTracks().forEach((track: any) => {
    track.stop();
    stream.removeTrack(track);
  });
};

const audioOption = {
  on: () => {
    stream.getAudioTracks().forEach((track: any) => (track.enabled = true));
  },
  off: () => {
    stream.getAudioTracks().forEach((track: any) => (track.enabled = false));
  },
};

const videoOption = {
  on: () => {
    stream.getVideoTracks().forEach((track: any) => (track.enabled = true));
  },
  off: () => {
    stream.getVideoTracks().forEach((track: any) => (track.enabled = false));
  },
};

export { init, get, remove, audioOption, videoOption };
