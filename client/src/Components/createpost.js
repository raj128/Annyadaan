import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/createpost.css'
function CreatePost() {
  const [title, setName] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [food_tags, setFoodType] = useState('');
  const [meal_size, setMealSize] = useState(0);
  const [expirey_date, setExpiryDate] = useState('');
  const [img_url, setImage] = useState(null);

  let webApiUrl = 'http://localhost:8800/posts/createpost';
  let dataStr = JSON.parse(window.localStorage.getItem('data'));
  let token = dataStr.token;

  async function postData(event) {
    event.preventDefault();
    let data = {
      title,
      venue,
      city,
      img_url,
      food_tags,
      meal_size,
      expirey_date,
      "postedBy":dataStr.user._id,
    };
    try {
      const response = await axios.post(webApiUrl, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      if (response.status === 200) {
        window.location.href = '/home';
      } else {
        // display error message to user
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={postData}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Venue:
        <input type="text" value={venue} onChange={e => setVenue(e.target.value)} required />
      </label>
      <br />
      <label>
        Image:
        <input type="text" value={img_url} onChange={e => setImage(e.target.value)} required />
      </label>
      <br />
      <label>
        City:
        <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
      </label>
      <br />
      <label>
        Food Type:
        <select value={food_tags} onChange={e => setFoodType(e.target.value)}>
          <option value="">--Please choose an option--</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
      </label>
      <br />
      <label>
      Meal Size:
        <input type="number" value={meal_size} onChange={e => setMealSize(e.target.value)} min="1" required />
      </label>
      <br />
      <label>
        Date of Expiry:
        <input type="date" value={expirey_date} onChange={e => setExpiryDate(e.target.value)} required />
      </label>
      <br />
      {/* <label>
        Image:
        <input type="file" onChange={e => setImage(e.target.files[0])} required />
      </label> */}
      <br /><button><input type="submit" value="Submit" onSubmit={() => {toast.success('This is Toast Notification for Success');}}/></button>
      
    </form>
  );
}

export default CreatePost;