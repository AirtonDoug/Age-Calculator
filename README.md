# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](./Screenshot.png)

### Links


- Live Site URL: [Age calculator Vercel](https://age-calculator-chi-lilac.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwindcss](https://tailwindcss.com) - Css framework 


### What I learned
-How to use animation with useSpring hook and animated h1
-Validate Input function with a hook for errors
-Use the _document.js for global font and to add a background for the document body
-Create a message error in the html with ternary operator

some code snippets of what i learned

```adding a error message on invalid inputs on html
 <input className="w-full h-14 text-3xl border-2 rounded-md p-2" type="text" placeholder="DD" onChange={(event) => setDay(parseInt(event.target.value))} />
              {errors.invalidDay && !errors.emptyFields && <p className="text-error-red font-thin italic mt-1 text-xs absolute">Must be a valid day</p>}
              {errors.invalidDate && <p className="text-error-red font-thin italic  mt-1 text-xs absolute">Must be a valid date</p>}
              {errors.emptyFields && (day === '' || year === NaN) && <p className="text-error-red  font-thin italic mt-1 text-xs absolute">This field is required</p>}
            </div>
```
```validating input to use the ternary operator
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
```
```animation with useSpring and animated
  const ageDaySpring = useSpring({ number: ageDay || 0, from:{number: 0} });
  const ageMonthSpring = useSpring({ number: ageMonth || 0, from:{number: 0}  });
  const ageYearSpring = useSpring({ number: ageYear || 0, from:{number: 0} });

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
```

### Continued development

I want to understand more about animation and how to use the hooks properly.




## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/AirtonDoug)



