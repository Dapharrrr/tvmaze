// app/components/PersonCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Person } from '../types';

type PersonCardProps = {
  person: Person;
  character?: string;
};

export default function PersonCard({ person, character }: PersonCardProps) {
  const placeholderImage = 'https://via.placeholder.com/210x295?text=No+Image';
  
  console.log('PersonCard id:', person.id, person);
  
  return (
    <Link href={`/people/${person.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition transform hover:scale-105">
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={person.image?.medium || placeholderImage}
            alt={person.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-3">
          <h3 className="text-white font-medium truncate">{person.name}</h3>
          {character && (
            <p className="text-gray-400 text-sm">Rôle: {character}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
