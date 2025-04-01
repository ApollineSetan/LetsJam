// server.js
import express from 'express';
import cors from 'cors';
import demoRoutes from './routes/demoRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import sequelize from './config/database.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

// Routes
app.use('/api/demos', demoRoutes);
app.use('/api/sections', sectionRoutes);

// Synchroniser la base de données et démarrer le serveur
sequelize.sync().then(() => {
  console.log('Base de données synchronisée!');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error syncing database:', error);
});
