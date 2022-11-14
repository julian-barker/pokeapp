import { PokeType, Pokemon, PokeMove, PokeStat } from './pokeApiTypes';

const fetcher = (url: string) => fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return data.result
  });

export default async function getRandomTeam() {
  const logHeaderStyle = 'color: red; font-size: 24px; font-style: bold';
  console.log('%c-------------\nGenerating a new Team.....\n-------------', logHeaderStyle);

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
    const response = await fetcher(`/api/getPokeInfo/pokemon/${id}`);

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
    const moveLink = moves[idx].move.url;
    const re = /(?<=\/)(\d+)(?=\/$)/; // matches just a series of numbers number from the end of a link
    const moveID = parseInt(moveLink.match(re)![0]); 

    const response = await fetcher(`/api/getPokeInfo/move/${moveID}`);

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