export interface PokeType {
  name: string;
  url: string;
};

export type DamageList = {
  [name:string]: number;
};

export type DamageMap = {
  [name: string]: DamageList;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front: string;
    back: string;
  }
  types: string[];
  stats: {
    [stat: string]: number;
  };
  moves: CompactMove[];
};

export interface BattlePokemon extends Pokemon {
  health: number;
};

export interface PokeMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: any;
};

export type CompactMove = {
  id: number,
  name: string,
  meta: any,
  accuracy: number,
  power: number,
  damageClass?: string,
  pp: number,
  type: string,
}

export type PokeStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}