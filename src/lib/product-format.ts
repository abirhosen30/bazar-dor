const UNIT_LABELS: Record<string, string> = {
  kg: "কেজি",
  dozen: "ডজন",
  l: "লিটার",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  pieces: "পিস",
  pcs: "পিস",
};

export const getUnitLabel = (unit?: string) => {
  const normalizedUnit = unit?.trim().toLowerCase();
  return normalizedUnit ? (UNIT_LABELS[normalizedUnit] ?? unit) : "কেজি";
};

export const formatChangePercent = (percent: number) =>
  Math.abs(percent).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

export const formatCount = (count: number) => count.toLocaleString("bn-BD");
