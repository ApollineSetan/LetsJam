export function isValidAudioFile(file) {
  if (!file || !file.name) return false;

  const validExtensions = ["mp3", "flac", "wav", "aac", "ogg", "aiff", "m4a", "wma"];
  const extension = file.name.split(".").pop().toLowerCase();

  const isValidExtension = validExtensions.includes(extension);
  const isValidSize = file.size <= 10 * 1024 * 1024; // max 10 Mo

  return isValidExtension && isValidSize;
}

export function isValidImageFile(file) {
  return file && file.size <= 5 * 1024 * 1024; // max 5 Mo
}
