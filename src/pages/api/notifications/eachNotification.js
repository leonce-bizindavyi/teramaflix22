import executeQuery from "@/Config/db4";

export default async function handler(req, res) {
  try {
    const feedback = await executeQuery('SELECT listenotif.id as id,pages.PageName as Prenom,pages.Photo as photo,listenotif.typenotif as typenotif, listenotif.postId as postid,posts.Video as video FROM listenotif INNER JOIN pages ON listenotif.reacteduser = pages.ID LEFT JOIN posts ON listenotif.postId = posts.ID WHERE listenotif.notOpen=1');
    res.json(feedback);
  } catch (error) {
    res.status(500).json(error);
  }
}