export function msToMinutesAndSeconds(ms?: number): string | null {
  if (!ms) return "out";
  const totalSeconds = Math.floor(ms / 1000);

  const remainingMilliseconds = ms % 1000;

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  const formattedMilliseconds = String(remainingMilliseconds).padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds.slice(
    0,
    2
  )}`;
}

export const getResultIsMs = (result: string) => {
  const [minutes, sAndMs] = result.split(":");
  const [seconds, milliseconds] = sAndMs.split(".");

  return (
    Number(minutes) * 60 * 1000 + Number(seconds) * 1000 + Number(milliseconds)
  );
};
