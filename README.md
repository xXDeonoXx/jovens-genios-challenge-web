# BEES - Frontend Challenge - Brewery Website

## How to run

First, install the dependencies:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

- Authentication using cookies, JWT Tokens and all of this managed using the Context API.
- WebSocket connection with the api for real time Topics creation
- Role Based routing based on the user Role (Teacher or Student)
- Creation of custom Input components with proper integrations with Formik
- Creation of withAuth helpers to serverSide authentication when making requests (didn't use)
- Styled using TailwindCSS

## Tech

This project uses a number of open source projects to work properly:

- [ReactJS](https://reactjs.org) - A JavaScript library for building user interfaces
- [NextJS](https://nextjs.org) - I picked NextJS because today there is no reason to use react without it, it gives you a lot of tools to work with things like SSR, performance and SEO.
- [TailwindCSS](https://tailwindcss.com/) - I love to style front-end using Tailwind CSS, it's easy to use and it alrays fit my needs.
- [Formik](https://formik.org/) - Formik is my pick and use Form tool for every project i work, it is easy to use, easy to configure validation with external tools like Yup or zod and it is easy to create custom components to use his internal hooks for things like error messages, blur, submit, prevent submit and a lot more.

## Final thoughts

I'm a bit sad that i didn't had the proper time to finish the project and the challenge but i had fun implementing and messing around with Sockets. I also had the chance during development to again create and configure a NextJS project so in the end it was good for mastering the first steps of a project.
