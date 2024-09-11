# Contact Management App with Maps and Charts

## Getting Started

### Prerequisites

Ensure you have `Node.js` and `npm` installed on your system. You can download and install them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Navigate to the Project Directory:**

    ```bash
    cd contact-management
    ```

2. **Install the Necessary Dependencies:**

    ```bash
    npm install
    ```

### Running the App

1. **Start the Development Server:**

    ```bash
    npm start
    ```

2. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the app.**

## Deployment

To deploy the app, you can use platforms such as Vercel, GitHub Pages, or Heroku. For deployment on Vercel:

1. Sign up or log in to [Vercel](https://vercel.com/).
2. Connect your GitHub repository to Vercel.
3. Follow the instructions provided by Vercel to deploy your application.

## Code Structure

- **`src/components`**: Contains React components for the application.
- **`src/styles`**: Contains TailwindCSS and other styling files.
- **`src/utils`**: Utility functions for data processing and handling.
- **`src/api`**: Functions for interacting with APIs.

## Usage

- **Map Component**: Displays contact locations on an interactive map with markers.
- **Chart Component**: Provides data visualization through charts.
- **Contact Management**: Interface for managing contact details with options to add, view, edit, and delete.

## Comments and Documentation

The codebase includes detailed comments and documentation to explain the functionality and logic of the application. Each function and component is annotated to assist with understanding and maintenance.

## API Endpoint

The app fetches data from the following API endpoint:

- **[COVID-19 Data API](https://disease.sh/v3/covid-19/countries)**: Provides COVID-19 data for countries, including the number of cases, deaths, and recovered cases.

## Contact

For any questions or issues, please open an issue on the [GitHub repository](https://github.com/Lokesh777/contact-management).
