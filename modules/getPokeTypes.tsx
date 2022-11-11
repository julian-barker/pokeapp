import { PokeType, DamageList, DamageMap } from './pokeApiTypes';

export default async function getPokeTypes() {
  const response = await fetch('https://pokeapi.co/api/v2/type')
    .then(response => response.json());
  
  const results = response.results;
  console.log("🚀 ~ file: getPokeTypes.tsx ~ line 9 ~ getPokeTypes ~ results", results);

  const types = results.map((t: PokeType) => t.name);

  const list = await Promise.all(
    results.map(async(v: PokeType) => {
      return await fetch(v.url)
        .then(response => response.json());
    })
  );

  const damages: DamageMap = {};

  list.forEach(v => {
    const damageList: DamageList = {};
    const rels = v.damage_relations;
    rels.double_damage_to.forEach((val: PokeType) => damageList[val.name] = 2);
    rels.half_damage_to.forEach((val: PokeType) => damageList[val.name] = 0.5);
    rels.no_damage_to.forEach((val: PokeType) => damageList[val.name] = 0);

    damages[v.name] = damageList;
  });

  // console.log(damages, types);

  return { 
    damages: damages, 
    types: types 
  };
}

