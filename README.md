# 🌤️ Weather App

A responsive weather application built with React and TypeScript that provides current weather conditions, hourly forecasts, and a 7-day forecast using real weather data.

🔗 **Live Demo:** https://weather-app-rho-ten-14.vercel.app/

---

## ✨ Features

- 🌤️ View current weather conditions
- 📅 7-day weather forecast
- 🕐 Hourly weather forecast
- 🔎 Search for weather by city
- 📍 Automatic location detection
- 🌡️ Support for different temperature units
- 💨 Wind and precipitation information
- 📱 Responsive design
- ⚡ Loading and error states

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **React Router**
- **Open-Meteo API**

---

## 📸 Preview

![Weather App](./public/preview.jpg)

---

## 🧠 What I Learned

This project gave me more experience working with external APIs and handling real-world data in a React application.

Some of the main things I practiced:

- Fetching and displaying data from an external API
- Handling asynchronous operations
- Managing loading and error states
- Working with hourly and daily forecast data
- Converting and displaying different units
- Using geolocation to provide weather based on the user's location
- Breaking the UI into reusable components
- Building a responsive interface

---

## 📁 Project Structure

```text
src/
├── assets/
├── components/
│   ├── CurrentWeather/
│   ├── DailyForecast/
│   ├── HourlyForecast/
│   ├── Header/
│   └── Navbar/
│
├── lib/
├── pages/
├── App.tsx
└── main.tsx
