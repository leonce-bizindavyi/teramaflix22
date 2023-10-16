import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const search = req.query.search
  try {
    const rows = await executeQuery('CALL searches(?,?,?)',search);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  }
}