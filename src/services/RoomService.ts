import apiClient from '../lib/axios';

export interface Room {
    id: number;
    name: string;
    type: string;
    price: number;
    description: string;
}

export class RoomService {
    static async getRooms() {
        const res = await apiClient.get('/rooms');
        return res.data;
    }

    static async getUnavailableDates(roomId: number) {
        const res = await apiClient.get(`/rooms/${roomId}/unavailable-dates`);
        return res.data.map((date: string) => new Date(date));
    }
}