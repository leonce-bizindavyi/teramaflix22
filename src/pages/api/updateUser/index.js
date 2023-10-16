import executeQuery from '@/Config/db4';

export default async function  handler(req, res) {
  const { id, nom, mail, password } = req.body;
    try {
    const rows = await executeQuery( "CALL updateUser(?, ?, ?, ?)",
    [id, nom, mail, password])
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } 
}