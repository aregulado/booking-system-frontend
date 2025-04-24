import { useEffect, useState } from 'react';
import { RoomService, Room } from '../services/RoomService';

export const useRoomData = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

    useEffect(() => {
        RoomService.getRooms().then(setRooms);
    }, []);

    const loadUnavailableDates = (roomId: number) => {
        RoomService.getUnavailableDates(roomId).then(setUnavailableDates);
    };

    return { rooms, unavailableDates, loadUnavailableDates };
};