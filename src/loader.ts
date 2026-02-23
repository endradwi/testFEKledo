export async function listRegionsLoader() {
  const res = await fetch('/data/indonesia_regions.json');
  if (!res.ok) throw new Error("Failed to load regions");
  return res.json();
}

export type Province = { id: number; name: string };
export type Regency = { id: number; name: string; province_id: number };
export type District = { id: number; name: string; regency_id: number };
export type RegionsData = { provinces: Province[]; regencies: Regency[]; districts: District[] };
