import React from 'react'
import Booking from './Bookings';

const BookingsContainer = () => {
    const [Bookings, SetBookings] = useState([]);
  
    let webApiUrl = 'http://localhost:8800/posts/allpost';
    var dataStr = JSON.parse(window.localStorage.getItem('data'));
  
    useEffect(() => {
      async function fetchBookings() {
        try {
          const response = await axios.get(webApiUrl, { headers: { Authorization: `Bearer ${dataStr.token}` } });
          SetBookings(response.data.list);
        } catch (error) {
          console.error(error);
        }
      }
      fetchBookings();
    }, []);
  


  return (
    <div>
        {Bookings.map(booking => (
            <Booking key={booking._id} booking={booking}/>
        ))}
    </div>
  )
}

export default BookingsContainer