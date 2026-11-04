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
  const [country, setCountry] = useState('Egypt');
  const [cityAr, setCityAr] = useState('القاهرة');
  const [countryAr, setCountryAr] = useState('مصر');

  const countries = [
    {
      couName: 'مصر', value: 'Egypt', cities: [
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
      ]
    },
    {
      couName: 'المانيا', value: 'Germany', cities: [
        { name: 'برلين', value: 'Berlin' },
        { name: 'ميونخ', value: 'Munich' },
        { name: 'هامبورغ', value: 'Hamburg' },
        { name: 'فرانكفورت', value: 'Frankfurt' },
        { name: 'كولونيا', value: 'Cologne' },
        { name: 'شتوتغارت', value: 'Stuttgart' },
        { name: 'دوسلدورف', value: 'Dusseldorf' },
        { name: 'دورتموند', value: 'Dortmund' },
        { name: 'إيسن', value: 'Essen' },
        { name: 'لايبزيغ', value: 'Leipzig' },
        { name: 'بريمن', value: 'Bremen' },
        { name: 'هانوفر', value: 'Hanover' },
      ]
    },
    {
      couName: 'تركيا', value: 'Turkey', cities: [
        { name: 'إسطنبول', value: 'Istanbul' },
        { name: 'أنقرة', value: 'Ankara' },
        { name: 'إزمير', value: 'Izmir' },
        { name: 'أنطاليا', value: 'Antalya' },
        { name: 'بورصة', value: 'Bursa' },
        { name: 'غازي عنتاب', value: 'Gaziantep' },
        { name: 'قونية', value: 'Konya' },
        { name: 'أضنة', value: 'Adana' },
        { name: 'مرسين', value: 'Mersin' },
        { name: 'طرابزون', value: 'Trabzon' },
        { name: 'إسكي شهر', value: 'Eskisehir' },
        { name: 'صكاريا', value: 'Sakarya' },
        { name: 'ديار بكر', value: 'Diyarbakir' }
      ]
    },
    {
      couName: 'السعودية', value: 'Saudi Arabia', cities: [
        { name: 'الرياض', value: 'Riyadh' },
        { name: 'جدة', value: 'Jeddah' },
        { name: 'مكة المكرمة', value: 'Mecca' },
        { name: 'المدينة المنورة', value: 'Medina' },
        { name: 'الدمام', value: 'Dammam' },
        { name: 'الخبر', value: 'Khobar' },
        { name: 'تبوك', value: 'Tabuk' },
        { name: 'أبها', value: 'Abha' }
      ]
    },
    {
      couName: 'الإمارات', value: 'United Arab Emirates', cities: [
        { name: 'دبي', value: 'Dubai' },
        { name: 'أبو ظبي', value: 'Abu Dhabi' },
        { name: 'الشارقة', value: 'Sharjah' },
        { name: 'عجمان', value: 'Ajman' },
        { name: 'رأس الخيمة', value: 'Ras Al Khaimah' }
      ]
    },
    {
      couName: 'فرنسا', value: 'France', cities: [
        { name: 'باريس', value: 'Paris' },
        { name: 'مارسيليا', value: 'Marseille' },
        { name: 'ليون', value: 'Lyon' },
        { name: 'تولوز', value: 'Toulouse' },
        { name: 'نيس', value: 'Nice' }
      ]
    },
    {
      couName: 'بريطانيا', value: 'United Kingdom', cities: [
        { name: 'لندن', value: 'London' },
        { name: 'مانشستر', value: 'Manchester' },
        { name: 'برمنغهام', value: 'Birmingham' },
        { name: 'ليفربول', value: 'Liverpool' },
        { name: 'إدنبرة', value: 'Edinburgh' }
      ]
    },
    {
      couName: 'إيطاليا', value: 'Italy', cities: [
        { name: 'روما', value: 'Rome' },
        { name: 'ميلانو', value: 'Milan' },
        { name: 'نابولي', value: 'Naples' },
        { name: 'تورينو', value: 'Turin' },
        { name: 'فلورنسا', value: 'Florence' }
      ]
    },
    {
      couName: 'إسبانيا', value: 'Spain', cities: [
        { name: 'مدريد', value: 'Madrid' },
        { name: 'برشلونة', value: 'Barcelona' },
        { name: 'فالنسيا', value: 'Valencia' },
        { name: 'إشبيلية', value: 'Seville' },
        { name: 'مالقة', value: 'Malaga' }
      ]
    },
    {
      couName: 'المغرب', value: 'Morocco', cities: [
        { name: 'الدار البيضاء', value: 'Casablanca' },
        { name: 'الرباط', value: 'Rabat' },
        { name: 'مراكش', value: 'Marrakesh' },
        { name: 'فاس', value: 'Fez' },
        { name: 'طنجة', value: 'Tangier' }
      ]
    },
    {
      couName: 'الولايات المتحدة', value: 'United States', cities: [
        { name: 'نيويورك', value: 'New York' },
        { name: 'لوس أنجلوس', value: 'Los Angeles' },
        { name: 'شيكاغو', value: 'Chicago' },
        { name: 'هيوستن', value: 'Houston' },
        { name: 'واشنطن العاصمة', value: 'Washington' }
      ]
    },
    {
      couName: 'كندا', value: 'Canada', cities: [
        { name: 'تورونتو', value: 'Toronto' },
        { name: 'فانكوفر', value: 'Vancouver' },
        { name: 'مونتريال', value: 'Montreal' },
        { name: 'أوتاوا', value: 'Ottawa' }
      ]
    },
    {
      couName: 'الكويت', value: 'Kuwait', cities: [
        { name: 'مدينة الكويت', value: 'Kuwait City' },
        { name: 'حولي', value: 'Hawalli' },
        { name: 'الفروانية', value: 'Farwaniya' },
        { name: 'الجهراء', value: 'Jahra' }
      ]
    },
    {
      couName: 'قطر', value: 'Qatar', cities: [
        { name: 'الدوحة', value: 'Doha' },
        { name: 'الريان', value: 'Al Rayyan' },
        { name: 'الوكرة', value: 'Al Wakrah' },
        { name: 'الخور', value: 'Al Khor' }
      ]
    },
    {
      couName: 'الأردن', value: 'Jordan', cities: [
        { name: 'عمان', value: 'Amman' },
        { name: 'إربد', value: 'Irbid' },
        { name: 'الزرقاء', value: 'Zarqa' },
        { name: 'العقبة', value: 'Aqaba' }
      ]
    },
    {
      couName: 'البحرين', value: 'Bahrain', cities: [
        { name: 'المنامة', value: 'Manama' },
        { name: 'المحرق', value: 'Muharraq' },
        { name: 'الرفاع', value: 'Riffa' }
      ]
    },
    {
      couName: 'عمان', value: 'Oman', cities: [
        { name: 'مسقط', value: 'Muscat' },
        { name: 'صلالة', value: 'Salalah' },
        { name: 'صحار', value: 'Sohar' },
        { name: 'نزوى', value: 'Nizwa' }
      ]
    },
    {
      couName: 'تونس', value: 'Tunisia', cities: [
        { name: 'تونس العاصمة', value: 'Tunis' },
        { name: 'صفاقس', value: 'Sfax' },
        { name: 'سوسة', value: 'Sousse' },
        { name: 'بنزرت', value: 'Bizerte' }
      ]
    },
    {
      couName: 'الجزائر', value: 'Algeria', cities: [
        { name: 'الجزائر العاصمة', value: 'Algiers' },
        { name: 'وهران', value: 'Oran' },
        { name: 'قسنطينة', value: 'Constantine' },
        { name: 'عنابة', value: 'Annaba' }
      ]
    },
    {
      couName: 'العراق', value: 'Iraq', cities: [
        { name: 'بغداد', value: 'Baghdad' },
        { name: 'البصرة', value: 'Basra' },
        { name: 'أربيل', value: 'Erbil' },
        { name: 'الموصل', value: 'Mosul' }
      ]
    }
  ];

  const [chosenCountry, setChosenCountry] = useState(countries[0].cities);

  useEffect(() => {
    const GetTimes = async () => {
      try {
        const res = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=5`)
        setTimes(res.data.data.timings)
        setDate(res.data.data.date.gregorian.date)
      } catch (err) {
        console.log(err);
      }
    }
    GetTimes();
  }, [city, country])
console.log(times);

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
        <div className="prayer_section my-2">
          <div className="top_section">
            <div className='d-flex justify-content-center'>
              <h2>مواقيت الصلاه</h2>
            </div>
            <div className="date_city my-3 d-flex align-items-center justify-content-between">
              <div className="city d-flex flex-column align-items-center">
                <div className='w-100'>
                  <h3>الدولة</h3>
                  <div className="dropdown">
                    <button
                      className="btn btn-primary d-flex align-items-center justify-content-between"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <p className='mb-0'>اختر دولة</p>
                      <span>( {countryAr} )</span>
                      <MdArrowDropDown className='fs-3' />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {countries.map(coun => (
                        <li
                          onClick={() => {
                            setCountry(coun.value);
                            setCountryAr(coun.couName);
                            setChosenCountry(coun.cities);
                            setCity(coun.cities[0].value);
                            setCityAr(coun.cities[0].name);
                          }}
                          key={coun.value}
                          className="dropdown-item">
                          {coun.couName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='w-100 mt-3'>
                  <h3>المدينة</h3>
                  <div className="dropdown">
                    <button className="btn btn-secondary d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <p className='mb-0'>اختر مدينة</p>
                      <span>( {cityAr} )</span>
                      <MdArrowDropDown className='fs-3' />
                    </button>
                    <ul className="dropdown-menu">
                      {chosenCountry.map(c => (
                        <li onClick={() => { setCity(c.value); setCityAr(c.name) }} key={c.value} className="dropdown-item"> {c.name} </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="date">
                <h3>التاريخ</h3>
                <p className='mb-0 fs-3'>{date}</p>
              </div>
            </div>
          </div>
          <hr className='my-3' />
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

export default App;