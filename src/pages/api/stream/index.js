import fs from 'fs';
import path from 'path';
import rangeParser from 'range-parser';

export default function handler(req, res) {
  const { videoId } = req.query;
  const videosFolderPath = path.join(process.env.NEXT_UPLOADS_FOLDERS, `/Videos`);
  const videoPath = path.join(videosFolderPath, `${videoId}`);
  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;

  const range = req.headers.range;
  if (range) {
    const ranges = rangeParser(fileSize, range);

    if (ranges) {
      const chunkStart = ranges[0].start;
      const chunkEnd = ranges[0].end;

      const chunkSize = chunkEnd - chunkStart + 1;
      const videoStream = fs.createReadStream(videoPath, { start: chunkStart, end: chunkEnd });

      res.writeHead(206, {
        'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });

      videoStream.pipe(res);
      return;
    }
  }

  res.writeHead(200, {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  });

  fs.createReadStream(videoPath).pipe(res);
}
