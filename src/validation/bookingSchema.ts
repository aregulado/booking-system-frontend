import * as Yup from 'yup';

export const bookingSchema = Yup.object().shape({
    guestName: Yup.string().required('Guest name is required'),
    roomId: Yup.number().required('Room is required'),
    checkInDate: Yup.date().required('Check-in is required'),
    checkOutDate: Yup.date()
        .min(Yup.ref('checkInDate'), 'Check-out must be after check-in')
        .required('Check-out is required'),
    promoCode: Yup.string().optional(),
});