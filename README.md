# MapUp - Electric Vehicle Analytics Dashboard

A modern, interactive analytics dashboard for Electric Vehicle population data built with React, Tailwind CSS, and Recharts.

## 🚀 Live Dashboard

**Dashboard URL**: [Your deployed URL here]

## ✨ Features

- **Interactive Dashboard**: Modern, responsive design with real-time data visualization
- **Advanced Filtering**: Filter by make, model year, EV type, and electric range
- **Rich Visualizations**:
  - Bar charts showing vehicle distribution by make
  - Pie charts displaying EV type distribution
  - Trend charts showing electric range evolution over years
- **Data Tables**: Sortable tables with top EV models and key metrics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Metrics**: Key performance indicators with trend indicators
- **CSV Integration**: Automatically loads and parses CSV data files

## 🛠️ Tech Stack

- **Frontend**: React 19 with modern hooks and functional components
- **Styling**: Tailwind CSS v4 with custom design system
- **Charts**: Recharts for interactive data visualization
- **Data Parsing**: PapaParse for CSV file handling
- **Icons**: Lucide React for modern iconography
- **Build Tool**: Vite for fast development and optimized builds

## 📊 Data Structure

The dashboard expects CSV data with the following columns:

- `Make`: Vehicle manufacturer
- `Model`: Vehicle model name
- `Model Year`: Year of manufacture
- `Electric Vehicle Type`: Type of electric vehicle
- `Electric Range`: Range in miles
- `Base MSRP`: Base price in USD

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd MapUp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your CSV data**

   - Place your `ev_population_data.csv` file in `src/assets/`
   - The dashboard will automatically detect and load it
   - If no CSV is found, it will use sample data for demonstration

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in your project directory
3. Follow the prompts to deploy

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Option 3: GitHub Pages

1. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/MapUp",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Deploy: `npm run deploy`

## 📁 Project Structure

```
MapUp/
├── src/
│   ├── components/
│   │   ├── charts/          # Chart components (Bar, Pie, Trend)
│   │   ├── dashboard/       # Dashboard components
│   │   ├── layout/          # Header and layout components
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── assets/              # Static assets and CSV data
│   └── App.jsx              # Main application component
├── public/                  # Public assets
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Use Tailwind utility classes throughout components

### Charts

- Customize chart colors in individual chart components
- Modify chart dimensions and styling in chart components
- Add new chart types by creating new components

### Data

- Update the `useEVData` hook for different data sources
- Modify data transformation logic in chart components
- Add new metrics and calculations as needed

## 🔧 Configuration

### Environment Variables

Create a `.env` file for any environment-specific configurations:

```env
VITE_API_URL=your_api_url_here
VITE_CSV_PATH=path_to_your_csv
```

### CSV Path Configuration

Update the CSV path in `src/hooks/useEVData.js` if your file is located elsewhere:

```javascript
const response = await fetch("/path/to/your/ev_population_data.csv");
```

## 📱 Responsive Design

The dashboard is fully responsive and includes:

- Mobile-first design approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized chart rendering for different screen sizes

## 🚀 Performance Features

- **Lazy Loading**: Components load only when needed
- **Memoization**: Optimized data processing with useMemo
- **Efficient Filtering**: Real-time filtering without performance impact
- **Optimized Charts**: Responsive charts with smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is part of the MapUp assessment. All rights reserved.

## 📞 Support

For questions or support, please contact:

- vedantp@mapup.ai
- ajayap@mapup.ai
- atharvd@mapup.ai

---

**Built with ❤️ for MapUp Assessment**
