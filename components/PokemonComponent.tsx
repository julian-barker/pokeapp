// import { getPokeTypes } from '../modules';
import { DamageMap } from '../modules/pokeApiTypes';

interface Props {
  types: string[];
  damages: DamageMap;
};

const multColor = (mult: number): string => {
  if (mult < 1) return 'text-red-400 font-light';
  if (mult > 1) return 'text-green-400 font-bold';
  return 'font-medium';
};

function capitalize(str: string): string {
  const transformed = str[0].toUpperCase() + str.slice(1);
  return transformed;
}

export default function PokemonComponent( props: Props ) {
  const { types, damages } = props;

  const cell = 'border-2 border-gray-200 border-collapse p-1 w-24';
  
  return (
    <div className="mt-12 flex flex-col items-center">
      <h2 className='my-6 font-bold text-3xl text-yellow-400' > Type Advantage Chart </h2>
      <div className="w-5/6 overflow-x-scroll">
        <table className='mx-auto text-center text-gray-200 overflow-x-scroll'>
          <thead>
            <tr>
              <th className={cell}> Attack \\ Defend </th>
              { types.map(type => <th key={type} className={`${cell} bg-gray-900 text-lg`} > {capitalize(type)} </th>) }
            </tr>
          </thead>
          <tbody>
            { types.map((t, idx1) => 
              <tr key={idx1}>
                <td className={`${cell} text-lg bg-gray-900`} > {capitalize(t)} </td>
                {types.map((type, idx2) => {
                  const mult = damages[t][type] || 1;
                  return (<td key={idx2} className={`${cell} bg-slate-700 ${multColor(mult)}`}> x{mult} </td>)
                })}
              </tr>) 
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


