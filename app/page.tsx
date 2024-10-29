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
import calandar from '@/public/images/calendar.gif'
import yourBusiness from '@/public/images/yourBusiness.png';
import favorite from '@/public/images/wishlist.png';
import Hero from '@/app/components/Hero';
import noAppointment from '@/public/images/plan.png';
import getFavoriteListings from './actions/getFavourites';
import getListing from './actions/getListingbyID';
interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const fav = await getFavoriteListings();
 
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
          
        <div>
 
                {/* Appointments Section */}
                <div className="bg-slate-100 text-emerald-500 p-4 h-72 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between gap-1 mb-3">
                    <Image className="w-10 h-10 object-cover" src={calandar} alt="calendar" />
                    <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
                  </div>
                  <Link href="/upcoming">
                    <div className="text-sm space-y-4 overflow-y-auto max-h-52 no-scrollbar">
                      {reservations.length > 0 && currentUser ? (
                        reservations.map((reservation) => (
                          <div key={reservation.id} className="border-b p-2 mb-2 bg-emerald-100 border rounded-lg hover:border-emerald-600">
                            <p className="font-semibold">{reservation.listing.title}</p>
                            <p className="text-gray-500">{reservation.listing.category}</p>
                            <div className="flex justify-between">
                              <p className="text-gray-900">
                                {new Date(reservation.startDate).toLocaleDateString()}
                              </p>
                              <p className="text-gray-900">{reservation.listing.time}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>
                          <p>No upcoming appointments yet.</p>
                          <Image className="pt-10 h-40 w-40 ml-6" src={noAppointment} alt="no appointments" />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Favorites Section */}
                <div className="bg-slate-100 text-emerald-500 p-4 h-64 rounded-lg shadow-md mb-6">
                <div className="flex gap-1 mb-3">
                    <Image className="w-10 h-10 object-cover" src={favorite} alt="calendar" />
                    <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
                  </div>
                  
                  <div className="text-sm space-y-4 overflow-y-auto max-h-52 no-scrollbar">
                    {fav.length > 0 && currentUser ? (
                      fav.map((favorite) => (
                        <div key={favorite.id} className="border-b p-2 mb-2 bg-emerald-100 border rounded-lg hover:border-emerald-600">
                          <p className="font-semibold">{favorite.title}</p>
                          <p className="text-gray-500">{favorite.category}</p>
                        </div>
                      ))
                    ) : (
                      <div>
                        <p>No favorites added yet.</p>
                      </div>
                    )}
                  </div>
                </div>

            {/* Recent Listings Section */}
            <div className="bg-slate-100 text-emerald-500 p-4 h-72 rounded-lg shadow-md">
            <div className="flex gap-1 mb-3">
                    <Image className="w-10 h-10 object-cover" src={yourBusiness} alt="yourBusiness" />
                    <h1 className="text-2xl font-bold mb-4">Your Buisness</h1>
                  </div>
              
              <div className="text-sm space-y-4 overflow-y-auto max-h-52 no-scrollbar">
              {fav.length > 0 && currentUser ? (
                      fav.map((favorite) => (
                        <div key={favorite.id} className="border-b p-2 mb-2 bg-emerald-100 border rounded-lg hover:border-emerald-600">
                          <p className="font-semibold">{favorite.title}</p>
                          <p className="text-gray-500">{favorite.category}</p>
                        </div>
                      ))
                    ) : (
                      <div>
                        <p>No favorites added yet.</p>
                      </div>
                    )}
              </div>
            </div>

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
