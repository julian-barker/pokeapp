
import { PokeType , Pokemon, BattlePokemon, CompactMove, PokeMove, PokeStat } from './pokeApiTypes';


export default async function getRandomTeam() {
  const ids: number[] = [];
  Array(6).fill(0).forEach(v => {
    let id = Math.ceil(Math.random() * 151);
    while (ids.includes(id)) {
      id = Math.ceil(Math.random() * 151);
    }
    ids.push(id);
  });
  console.log(ids);
  
  const team = Promise.all(ids.map(async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json());

    const moves = await getMoves(response.moves);
    const types = response.types.map((t: {slot: number, type: PokeType}) => t.type.name);
    const stats = response.stats.reduce((acc: {[key: string]: any}, stat: PokeStat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {});
      
    const poke: Pokemon = {
      id: response.id,
      name: response.name,
      sprites: {
        front: response.sprites.front_default,
        back: response.sprites.back_default, 
      },
      types: types,
      stats: stats,
      moves: moves,
    };

    return poke;
  }));

  return team;
}

async function getMoves(moves: PokeMove[]) {
  const moveIdxs: number[] = [];
  Array(4).fill(0).forEach(v => {
    let id = Math.floor(Math.random() * moves.length);
    while (moveIdxs.includes(id)) {
      id = Math.floor(Math.random() * moves.length);
    }
    moveIdxs.push(id);
  });

  const moveset = Promise.all(moveIdxs.map(async (idx) => {
    const response = await fetch(moves[idx].move.url)
      .then(res => res.json());
      
    const move = {
      id: response.id,
      name: response.name,
      meta: response.meta,
      accuracy: response.accuracy,
      power: response.power,
      damageClass: response.damageClass || null,
      pp: response.pp,
      type: response.type.name
    }

    return move;
  }));

  return moveset;
}