'use client';

import Image from 'next/image';
import { CiLocationOn } from 'react-icons/ci';
import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { AiFillStar } from 'react-icons/ai';
interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = '',
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data?.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const startTime = new Date(reservation.startTime);
    const date = new Date(reservation.startDate);
    if (startTime) {
      return `${format(startTime, 'PPpp')}`;
    } else return `${format(date, 'PPpp')}`;
  }, [reservation]);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full  relative overflow-hidden rounded-xl aspect-square">
          <Image
            src={data.imageSrc}
            alt="image"
            className="h-full w-full object-cover group-hover:scale-110 transition"
            fill
          />
          <div className="absolute bottom-1 left-1">
            <div className="px-2 flex items-center gap-1 text-sm font-semibold border rounded-full bg-white">
              
              <span className=" font-semibold text-sm">
                {/* {data.rating.toFixed(1)} */}
               { Math.floor(Math.random() * (5 - 3 + 1)) + 3}  
              </span>
              <AiFillStar size={15} color='green' />
            |  {Math.floor(Math.random() * (500 - 50 + 1)) + 50}
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className=" font-semibold text-lg">
          {reservationDate || data.category}
        </div>
        <div className="font-semibold text-neutral-500">
          {data.title}
        </div>
        <div className=" text-sm flex gap-2">
          <CiLocationOn size={15} /> {data.featureTwo}, {location?.label}
        </div>
        <div className="flex  flex-row items-center gap-1">
          <div className="font-bold text-lg border rounded-full px-2 bg-green-200"> ₹{price}</div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
