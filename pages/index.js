import { useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Home() {
  const [ageDay, setAgeday] = useState('- -');
  const [ageMonth, setAgemonth] = useState('- -');
  const [ageYear, setAgeyear] = useState('- -');

  const ageDaySpring = useSpring({ number: ageDay || 0, from:{number: 0} });
  const ageMonthSpring = useSpring({ number: ageMonth || 0, from:{number: 0}  });
  const ageYearSpring = useSpring({ number: ageYear || 0, from:{number: 0} });

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')


  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();



  const [errors, setErrors] = useState({
    emptyFields: false,
    invalidDay: false,
    invalidMonth: false,
    invalidYear: false,
    invalidDate: false,
  });


  function validadeInputs() {
    const newErrors = {
      emptyFields: day === '' || month === '' || year === '',
      invalidDay: day !== '' && (day < 1 || day > 31),
      invalidMonth: month !== '' && (month < 1 || month > 12),
      invalidYear: year !== '' && (year > currentYear),
      invalidDate: (month === 2 && day > 28) || ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30),
    };
    return newErrors;
  }

  function calculateAge() {
    const newErrors = validadeInputs();
    setErrors(newErrors);
    if (!Object.values(newErrors).some((error) => error)) {
      let ageYears = currentYear - year;
      let ageMonths = Math.abs(currentMonth - month);
      let ageDays = Math.abs(day - currentDay);



      if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        ageYears--;
      }


      setAgeyear(ageYears);
      setAgemonth(ageMonths);
      setAgeday(ageDays);
    } else {
      setAgeyear('- -');
      setAgemonth('- -');
      setAgeday('- -');
    }

  }




  return (
    <div className="flex justify-center">
      <div className="bg-n-white rounded-xl rounded-br-br-full w-150 h-150 mt-40 flex flex-col">
        <div className="flex mt-10 ml-12 font-bold">
          <div className="flex flex-col  w-32 mr-5 relative">
            <h1 className="text-gray-500 text-xs mb-2 tracking-widest ">DAY</h1>
            <div className="relative">
              <input className="w-full h-14 text-3xl border-2 rounded-md p-2" type="text" placeholder="DD" onChange={(event) => setDay(parseInt(event.target.value))} />
              {errors.invalidDay && !errors.emptyFields && <p className="text-error-red font-thin italic mt-1 text-xs absolute">Must be a valid day</p>}
              {errors.invalidDate && <p className="text-error-red font-thin italic  mt-1 text-xs absolute">Must be a valid date</p>}
              {errors.emptyFields && (day === '' || year === NaN) && <p className="text-error-red  font-thin italic mt-1 text-xs absolute">This field is required</p>}
            </div>
          </div>
          <div className="flex flex-col  w-32 mr-5 relative">
            <h1 className="text-gray-500 text-xs mb-2 tracking-widest ">MONTH</h1>
            <div className="relative">
              <input className="w-full h-14 text-3xl border-2 rounded-md p-2" type="text" placeholder="MM" onChange={(event) => setMonth(parseInt(event.target.value))} />
              {errors.invalidMonth && !errors.emptyFields && <p className="text-error-red font-thin italic mt-1 text-xs absolute">Must be a valid month</p>}
              {errors.emptyFields && (month === '' || month === NaN) && <p className="text-error-red font-thin italic mt-1 text-xs  absolute whitespace-nowrap">This field is required</p>}
            </div>
          </div>
          <div className="flex flex-col  w-32 relative">
            <h1 className="text-gray-500 text-xs mb-2 tracking-widest ">YEAR</h1>
            <div className="relative">
              <input className="w-full h-14 text-3xl border-2 rounded-md p-2" type="text" placeholder="YYYY" onChange={(event) => setYear(parseInt(event.target.value))} />
              {errors.invalidYear && !errors.emptyFields && <p className="text-error-red font-thin italic mt-1 text-xs absolute">Must be in the past</p>}
              {errors.emptyFields && (year === '' || year === NaN) && <p className="text-error-red font-thin italic mt-1 text-xs absolute">This field is required</p>}
            </div>
          </div>
        </div>

        <div className="ml-7">
          <div className="flex items-center mr-4 mt-5">
            <div className="h-px bg-gray-300 w-2/3 ml-6 " />
            <button className="rounded-full bg-purple text-off-white w-16 h-16 flex justify-center items-center hover:bg-off-black " onClick={() => { calculateAge() }}>
              <img className="w-8 h-8" src="/images/icon-arrow.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="mt-8 ml-8 font-bold italic">
          <div className="flex flex-row">
            <animated.h1 className="text-purple text-8xl mr-4">
              {ageYearSpring.number.interpolate((val) =>
                typeof val === 'number' ? Math.floor(val) : '- -'
              )}
            </animated.h1>
            <h1 className="text-8xl">years</h1>
          </div>
          <div className="flex flex-row font-bold">
            <animated.h1 className="text-purple text-8xl mr-4">
              {ageMonthSpring.number.interpolate((val) =>
                typeof val === 'number' ? Math.floor(val) : '- -'
              )}
            </animated.h1>
            <h1 className="text-8xl">months</h1>
          </div>
          <div className="flex flex-row">
            <animated.h1 className="text-purple text-8xl mr-4">
              {ageDaySpring.number.interpolate((val) =>
                typeof val === 'number' ? Math.floor(val) : '- -'
              )}
            </animated.h1>
            <h1 className="text-8xl">days</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
