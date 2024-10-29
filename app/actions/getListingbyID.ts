// import prisma from '@/app/libs/prismadb';

// interface IParams {
//   listingId?: string;
// }

// export default async function getListingbyID(params: IParams) {
//   try {
//     const { listingId } = params;
//     const listing = await prisma.listing.findUnique({
//       where: { id: listingId },
//       include: { user: true },
//     });

//     if (!listing) {
//       return null;
//     }
//     return {
//       ...listing,
//       createdAt: listing.createdAt.toISOString(),
//       user: {
//         ...listing.user,
//         createdAt: listing.user.createdAt.toISOString(),
//         updatedAt: listing.user.updatedAt.toISOString(),
//         emailVerified: listing.user.emailVerified?.toISOString() || null,
//       },
//     };
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }


import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export default async function getListingbyID(params: IParams) {
  try {
    const { listingId } = params;

    // Add validation for listingId
    if (!listingId) {
      throw new Error('Listing ID is required');
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    // Improve error handling
    console.error('[GET_LISTING_BY_ID]', error);
    
    if (error.message === 'Listing ID is required') {
      throw new Error('Listing ID is required');
    }

    // Handle Prisma errors
    if (error.code) {
      throw new Error(`Database error: ${error.message}`);
    }

    throw new Error('Failed to get listing');
  }
}