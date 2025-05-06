import { getPersonCastCredits, getPerson } from '../../lib/service';
import { CastCredit, Person } from '../../types';
import ShowCard from '../../components/ShowCard';
import Image from 'next/image';

interface ActorPageProps {
    params: Promise<{ id: string }>;
}

const placeholderImage = 'https://via.placeholder.com/210x295?text=No+Image';

const ActorPage = async ({ params }: ActorPageProps) => {
    const { id } = await params;
    let person: Person;
    let castCredits: CastCredit[];

    try {
        person = await getPerson(id);
        castCredits = await getPersonCastCredits(id);
    } catch {
        return <p>Erreur lors du chargement des données.</p>;
    }

    return (
        <main className="actor-detail">
            <h1>{person.name}</h1>
            {person.image && (
                <Image
                    src={person.image.original || placeholderImage}
                    alt={person.name}
                    width={300}
                    height={450}
                />
            )}
            <p><strong>Date de naissance :</strong> {person.birthday || 'Inconnue'}</p>
            <p><strong>Genre :</strong> {person.gender || 'Inconnu'}</p>
            {person.country && <p><strong>Pays :</strong> {person.country.name}</p>}

            <section>
                <h2>Séries principales</h2>
                <div className="results-grid">
                    {castCredits.map((credit) => (
                        <ShowCard
                            key={credit._embedded.show.id}
                            show={credit._embedded.show}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ActorPage;