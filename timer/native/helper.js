export const timeFormatter = s => {
  const h = Math.floor(s / 3600);
  s = s - h * 3600;

  const m = Math.floor(s / 60);
  s = s - m * 60;

  return { h, m, s };
};

export const timeDisplay = timestamp => {
  let { h, m, s } = timeFormatter(timestamp);
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }

  return `${h} : ${m} : ${s}`;
};

export const toSeconds = (h, m, s) => {
  return h * 3600 + m * 60 + s * 1;
};
