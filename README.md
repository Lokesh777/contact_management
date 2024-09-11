# Contact Management App with Maps and Charts

This project is a contact management app built with **ReactJS**, **TypeScript**, **TailwindCSS**, **React Router v6**, **ECharts**, **Redux Persist**, and **React Query (TanstackQuery)**. It includes features for managing contacts, visualizing data through charts, and displaying information on maps.

## Features

- **Contact Management:**
  - Add new contacts via a form.
  - View a list of all added contacts.
  - View details of each contact.
  - Edit and delete contacts.
  - Store contact data using **Redux Persist**.

- **Dashboard:**
  - A line graph showing **COVID-19 case fluctuations**.
  - An interactive map with markers indicating **country-specific COVID-19 data** (active cases, recovered cases, and deaths) with popups.

## Technologies Used

- **ReactJS & TypeScript**: For building the user interface and ensuring type safety.
- **TailwindCSS**: For responsive and modern UI styling.
- **React Router v6**: For client-side routing.
- **ECharts**: For dynamic and interactive chart visualizations.
- **Redux Persist**: For persisting and rehydrating Redux state.
- **React Query (TanstackQuery)**: For efficient data fetching and caching.

## Installation

1. Navigate to the project directory:

   ```bash
   cd contact-management
   ```
2. Install the necessary dependencies:

 ```
npm install

```
3 Start the development server:
```
npm start
```
4.Open your browser and navigate to http://localhost:3000 to access the app.

**Code Structure**
- src/components: Contains reusable components like ContactForm, ContactList, ContactDetails, Map, Chart, and Modal.
- src/pages: Separate pages for Contacts, Dashboard, MapPage, and NoPageFound.
- src/store: Redux setup for managing global state.
- src/features: API fetching logic using React Query (contactSlice and contactApi).
- src/routes: React Router setup for sidebar and navbar layouts.
- src/styles: TailwindCSS and other styling files.

**Usage**
- Map Component: Displays contact locations on an interactive map with markers.
- Chart Component: Provides data visualization through charts.
- Contact Management: Interface for managing contact details with options to add, view, edit, and delete.
