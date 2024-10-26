
import ClientOnly from './ClientOnly';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getListings, { IListingsParams } from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from '@/app/actions/getCurrentUser';
import UpcomingClient from '@/app/upcoming/UpcomingClient'; // Assume this is where UpcomingClient is located
import getReservations from '@/app/actions/getReservations';
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 60;
import Link from 'next/link';
import Image from 'next/image';
import calandar from '@/public/images/calendar.png'
import Hero from '@/app/components/Hero';
interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  
  const reservations = await getReservations({ userId: currentUser?.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  
  return (
    <ClientOnly>
      <Container>
        <div className="flex flex-col md:flex-row gap-8 pt-20">
          
          {/* Upcoming Box - hidden on mobile */}
          <div className="hidden md:block bg-slate-100 text-emerald-600 p-4 md:w-1/4 rounded-lg shadow-md">
           <div className='flex justify-between gap-1 mb-3'>
           <Image className = 'w-10 h-10 object-cover' src={calandar} alt='calendar' />
            <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>

           </div>
            <Link href="/upcoming">
            <div   className="text-sm space-y-4">
              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <div key={reservation.id} className="border-b  
                  p-2 mb-2 bg-emerald-100 border rounded-lg">
                    <p className="font-semibold">{reservation.listing.title}</p>
                    <p className="text-gray-500 ">{reservation.listing.category}</p>

                    <div className='flex justify-between'>
                    <p className="text-gray-900">{new Date(reservation.startDate).toLocaleDateString()}</p>
                    <p className="text-gray-900">{reservation.listing.time}</p>
                    
                    </div>
                  </div>
                ))
              ) : (
                <p>No upcoming appointments yet.</p>
              )}
            </div>
            </Link>
          </div>
         
          {/* Right side: Listings Grid */}
          <div>
          <Hero/>
          <h1 className="text-2xl font-bold mb-4">Popular Business</h1>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {listings.map((listing) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;

