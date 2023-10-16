import { createPool } from 'mysql2/promise';

const CONNECTION_TIMEOUT =7 * 60 * 60 * 1000; // Délai d'expiration de la connexion en millisecondes

// Créez un pool de connexions avec une limite de connexions maximale
const pool = createPool({
  host: 'www.db4free.net',
  user: 'terama_20819u',
  password: 'Promotion@11',
  database: 'terama_20819u',
  connectionLimit: 50, // Nombre maximal de connexions
});
// Fonction pour réinitialiser le délai d'expiration d'une connexion
const resetConnectionTimeout = (connection) => {
  if (connection.timeoutId) {
    clearTimeout(connection.timeoutId);
  }
  connection.timeoutId = setTimeout(() => {
    connection.release(); // Libérer la connexion après le délai d'expiration
  }, CONNECTION_TIMEOUT);
};

// Vérifiez si la connexion est ouverte avant d'exécuter une requête
const executeQuery = async (query, params) => {
  let connection;
  try {
    connection = await pool.getConnection();
    resetConnectionTimeout(connection); // Réinitialiser le délai d'expiration de la connexion
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'exécution de la requête :', error);
    
  } finally {
    if (connection) {
      resetConnectionTimeout(connection); // Réinitialiser le délai d'expiration de la connexion
      connection.release(); // Libérer la connexion après l'exécution de la requête
    }
  }
};

export default executeQuery;