import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegStatic);

const inputPath = path.join(__dirname, 'public', 'background-audio.mp3');
const tempPath = path.join(__dirname, 'public', 'temp-audio.mp3');

console.log('Trimming the first 6 seconds to remove the intro...');

ffmpeg(inputPath)
    .setStartTime(6.5)
    .output(tempPath)
    .on('end', () => {
        console.log('Finished trimming.');

        // Replace original file with the trimmed version
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        console.log('Original file replaced with the trimmed version.');
        process.exit(0);
    })
    .on('error', (err) => {
        console.error('Error trimming audio:', err);
        process.exit(1);
    })
    .run();
