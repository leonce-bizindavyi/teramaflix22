import executeQuery from '@/Config/db4';
export default async function  handler(req, res) {
  const [uniid]= req.query.uniidDelete
    try {
    const rows = await executeQuery( 'DELETE FROM posts WHERE uniid = ?',[uniid])
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } 
}