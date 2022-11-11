import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { getPokeTypes, getRandomTeam } from '../modules';
import { Pokemon, DamageMap } from '../modules/pokeApiTypes';
import Image from 'next/image';

interface Props {
  damages?: DamageMap;
  types?: string[];
};

export default function PokemonComponent( props: Props ) {
    // const [damages, setDamages] = useState({});
    const [team, setTeam] = useState<Pokemon[]>();

    // useEffect(() => {
    //   getPokeTypes()
    //     .then(data => setDamages(data));
    // }, []);

    // useEffect(() => {
    //   getRandomTeam()
    //     .then(setTeam);
    // }, []);

    console.log(props.damages);

  return (
    <div className="flex flex-col items-center">
      {/* <p>I am here</p>
      {Object.keys(damages).map(t => 
        <div key={t}>
          <p>Type: {t}</p>
        </div>
      )} */}
      <div className="grid grid-cols-3 gap-8 mb-4">
        {team ? team.map(pokemon => 
          <div key={pokemon.id}>
            <h3 className="text-center font-bold text-lg">
              {pokemon.name}
              </h3> 
            <img 
              src={pokemon.sprites.front} 
              width='200' height='200' 
              alt={pokemon.name} 
              style={{imageRendering: 'pixelated'}} 
              className='border-2 p-4 border-zinc-200 bg-gray-900'
            />
          </div>
        ) : null}
      </div>
      <button className="text-lg border-1 rounded-md w-48 bg-gray-300 text-gray-900" onClick={() => {
        getRandomTeam()
          .then(setTeam);
      }} >
        RE-ROLL TEAM
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await getPokeTypes();
  console.log(res);

  return {props: {damages: res.damages, types: res.types}}
}
