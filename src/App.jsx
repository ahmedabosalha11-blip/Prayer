import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Prayer from './components/Prayer';
import axios from 'axios';
import { MdArrowDropDown } from "react-icons/md";

function App() {
  const [date, setDate] = useState('');
  const [times, setTimes] = useState({});
  const [city, setCity] = useState('Cairo');
  const cities = [
    { name: 'القاهرة', value: 'Cairo' },
    { name: 'الجيزة', value: 'Giza' },
    { name: 'الإسكندرية', value: 'Alexandria' },
    { name: 'الدقهلية', value: 'Mansoura' },
    { name: 'الشرقية', value: 'Zagazig' },
    { name: 'المنوفية', value: 'Shibin El Kom' },
    { name: 'القليوبية', value: 'Banha' },
    { name: 'البحيرة', value: 'Damanhur' },
    { name: 'طنطا', value: 'Tanta' },
    { name: 'كفر الشيخ', value: 'Kafr El Sheikh' },
    { name: 'دمياط', value: 'Damietta' },
    { name: 'بورسعيد', value: 'Port Said' },
    { name: 'الإسماعيلية', value: 'Ismailia' },
    { name: 'السويس', value: 'Suez' },
    { name: 'مطروح', value: 'Marsa Matruh' },
    { name: 'شمال سيناء', value: 'Arish' },
    { name: 'جنوب سيناء', value: 'El Tor' },
    { name: 'الفيوم', value: 'Fayoum' },
    { name: 'بني سويف', value: 'Beni Suef' },
    { name: 'المنيا', value: 'Minya' },
    { name: 'أسيوط', value: 'Assiut' },
    { name: 'سوهاج', value: 'Sohag' },
    { name: 'قنا', value: 'Qena' },
    { name: 'الأقصر', value: 'Luxor' },
    { name: 'أسوان', value: 'Aswan' },
    { name: 'البحر الأحمر', value: 'Hurghada' },
    { name: 'الوادي الجديد', value: 'Kharga' }
  ];


  useEffect(() => {
    const GetTimes = async () => {
      try {
        const res = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`)
        setTimes(res.data.data.timings)
        setDate(res.data.data.date.gregorian.date)
      } catch (err) {
        console.log(err);

      }
    }
    GetTimes();
  }, [city])

  const formatTimeCairo = (time24) => {
    if (!time24) return "";
    let [hours, minutes] = time24.split(":");
    let parsedHours = parseInt(hours, 10);
    let period = parsedHours >= 12 ? "PM" : "AM";
    parsedHours = parsedHours % 12;
    parsedHours = parsedHours ? parsedHours : 12;
    let formattedHours = String(parsedHours).padStart(2, '0');
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="main">
      <div className="container">
        <div className="prayer_section my-3">
          <div className="top_section">
            <div className='d-flex justify-content-center'>
              <h2>مواقيت الصلاه</h2>
            </div>
            <div className="date_city my-3 d-flex align-items-center justify-content-between">
              <div className="city">
                <h3>المدينه</h3>
                <div className="dropdown ">
                  <button className="btn btn-secondary d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <p className='mb-0 '>اختر مدينه</p>
                    <MdArrowDropDown className='fs-3' />
                  </button>
                  <ul className="dropdown-menu ">

                    {cities.map(city => {
                      return <li onClick={() => setCity(city.value)} key={city.value} className="dropdown-item"> {city.name} </li>
                    })}
                  </ul>
                </div>
              </div>
              <div className="date">
                <h3>التاريخ</h3>
                <p className='mb-0 fs-3'>{date}</p>
              </div>
            </div>
          </div>
          <hr className='my-3'/>
          <Prayer name={'الفجر :'} time={formatTimeCairo(times.Fajr)} />
        <Prayer name={'الظهر :'} time={formatTimeCairo(times.Dhuhr)} />
        <Prayer name={'العصر :'} time={formatTimeCairo(times.Asr)} />
        <Prayer name={'المغرب :'} time={formatTimeCairo(times.Maghrib)} />
        <Prayer name={'العشاء :'} time={formatTimeCairo(times.Isha)} />
        </div>
      </div>
    </div>
  )
}

export default App
