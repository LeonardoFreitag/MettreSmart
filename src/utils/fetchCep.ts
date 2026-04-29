import { NeighModel } from '../models/NeighModel';

export interface CepData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export async function fetchCep(cep: string): Promise<CepData | null> {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.erro) return null;
    return data as CepData;
  } catch {
    return null;
  }
}

export function matchNeighborhood(
  bairro: string,
  list: NeighModel[],
): NeighModel | null {
  if (!bairro || list.length === 0) return null;
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  const t = norm(bairro);
  return (
    list.find(n => norm(n.name) === t) ||
    list.find(
      n => norm(n.name).includes(t) || t.includes(norm(n.name)),
    ) ||
    null
  );
}
