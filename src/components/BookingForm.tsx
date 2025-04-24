import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '../validation/bookingSchema';
import { useRoomData } from '../hooks/useRoomData';
import { BookingService } from '../services/BookingService';
import { useBookingContext } from '../context/BookingContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormValues {
    guestName: string;
    roomId: number;
    checkInDate: Date;
    checkOutDate: Date;
    promoCode?: string;
}

const BookingForm: React.FC = () => {
    const { rooms, unavailableDates, loadUnavailableDates } = useRoomData();
    const { setBookingData } = useBookingContext();
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(bookingSchema) as any,
    });

    const checkInDate = watch('checkInDate');

    const onSubmit = async (data: FormValues) => {
        try {
            const result = await BookingService.createBooking(data);
            setBookingData(result);
            alert('Booking created');
        } catch (error) {
            alert('Room unavailable or error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl mb-4">Book a Room</h2>

            <div className="mb-4">
                <label className="block">Guest Name</label>
                <input {...register('guestName')} className="w-full p-2 border rounded" />
                {errors.guestName && <span className="text-red-500">{errors.guestName.message}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Room</label>
                <select
                    {...register('roomId')}
                    onChange={(e) => loadUnavailableDates(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                </select>
                {errors.roomId && <span className="text-red-500">{errors.roomId.message}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Check-in Date</label>
                <Controller
                    control={control}
                    name="checkInDate"
                    render={({ field }) => (
                        <DatePicker
                            selectsMultiple={true}
                            {...field}
                            selected={field.value}
                            onChange={field.onChange}
                            className="w-full p-2 border rounded"
                            minDate={new Date()}
                            excludeDates={unavailableDates}
                        />
                    )}
                />
                {errors.checkInDate && <span className="text-red-500">{errors.checkInDate.message}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Check-out Date</label>
                <Controller
                    control={control}
                    name="checkOutDate"
                    render={({ field }) => (
                        <DatePicker
                            selectsMultiple={true}
                            {...field}
                            selected={field.value}
                            onChange={field.onChange}
                            className="w-full p-2 border rounded"
                            minDate={checkInDate || new Date()}
                            excludeDates={unavailableDates}
                        />
                    )}
                />
                {errors.checkOutDate && <span className="text-red-500">{errors.checkOutDate.message}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Promo Code (optional)</label>
                <input {...register('promoCode')} className="w-full p-2 border rounded" />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default BookingForm;
