import apiClient from '../lib/axios';

export class BookingService {
    static async createBooking(data: any) {
        const res = await apiClient.post('/bookings', data);
        return res.data;
    }
}