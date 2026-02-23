# Frontend Developer Assessment

This project is built as an assessment to become a Frontend Developer. It demonstrates an interactive region filtering interface (Provinsi, Kota/Kabupaten, Kecamatan) using modern frontend technologies.

## Technologies Used

The application is built using a modern React ecosystem:

- **[React 19](https://react.dev/)**: For building reusable UI components and managing application state.
- **[TypeScript](https://www.typescriptlang.org/)**: To provide static typing, catching potential errors early, and improving developer experience.
- **[Vite](https://vitejs.dev/)**: As a fast frontend build tool and development server.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: For rapid, utility-first styling and responsive design.
- **[React Router v7](https://reactrouter.com/)**: For handling routing and loading local region data dependencies.
- **[React Icons](https://react-icons.github.io/react-icons/)**: For incorporating scalable vector icons into the UI seamlessly.

## How to Run This Application

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine (v18 or higher is recommended).

### Installation & Running Locally

1. **Clone the repository** (if you haven't already) and navigate into the project directory:
   ```bash
   cd testFeKledo
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the application**:
   Open your browser and navigate to the local URL provided in your terminal (typically `http://localhost:5173`).

### Building for Production

To create an optimized production build, run:
```bash
npm run build
```
This will compile the TypeScript code and generate static files in the `dist` directory. You can preview the production build using:
```bash
npm run preview
```
