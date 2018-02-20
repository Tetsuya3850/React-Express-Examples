export function timeFormatter(seconds) {
  const hours =
    Math.floor(seconds / 3600) < 10
      ? "0" + Math.floor(seconds / 3600)
      : Math.floor(seconds / 3600);
  seconds = seconds - hours * 3600;

  const minutes =
    Math.floor(seconds / 60) < 10
      ? "0" + Math.floor(seconds / 60)
      : Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${hours} : ${minutes} : ${seconds}`;
}

export function toSeconds(h, m, s) {
  return h * 3600 + m * 60 + s * 1;
}
