// import { NextResponse } from 'next/server';

// import getCurrentUser from '@/app/actions/getCurrentUser';
// import prisma from '@/app/libs/prismadb';

// interface IParams {
//   listingId?: string;
// }

// export async function POST(request: Request, { params }: { params: IParams }) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { listingId } = params;

//   if (!listingId || typeof listingId !== 'string') {
//     throw new Error('Invalid ID');
//   }

//   let favoriteIds = [...(currentUser.favoriteIds || [])];

//   favoriteIds.push(listingId);

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id,
//     },
//     data: {
//       favoriteIds,
//     },
//   });

//   return NextResponse.json(user);
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: IParams }
// ) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { listingId } = params;

//   if (!listingId || typeof listingId !== 'string') {
//     throw new Error('Invalid ID');
//   }

//   let favoriteIds = [...(currentUser.favoriteIds || [])];

//   favoriteIds = favoriteIds.filter((id) => id !== listingId);

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id,
//     },
//     data: {
//       favoriteIds,
//     },
//   });

//   return NextResponse.json(user);
// }


import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid listing ID' },
        { status: 400 }
      );
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // Check if already favorited
    if (favoriteIds.includes(listingId)) {
      return NextResponse.json(
        { error: 'Already favorited' },
        { status: 400 }
      );
    }

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[FAVORITES_POST]', error);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid listing ID' },
        { status: 400 }
      );
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // Check if not in favorites
    if (!favoriteIds.includes(listingId)) {
      return NextResponse.json(
        { error: 'Not in favorites' },
        { status: 400 }
      );
    }

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[FAVORITES_DELETE]', error);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}