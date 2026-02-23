import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = "https://cdn.trendybeatz.com/audio/Moses-Bliss-Ft-Nathaniel-Bassey-Doing-Of-The-Lord-(TrendyBeatz.com).mp3";
const dest = path.join(__dirname, 'public', 'background-audio.mp3');

const file = fs.createWriteStream(dest);

https.get(url, function (response) {
    if (response.statusCode === 301 || response.statusCode === 302) {
        console.log(`Redirecting to ${response.headers.location}...`);
        https.get(response.headers.location, function (redirectResponse) {
            redirectResponse.pipe(file);
            file.on('finish', () => { file.close(); console.log("Download completed successfully."); });
        });
        return;
    }

    if (response.statusCode !== 200) {
        console.error(`Failed to download: HTTP Status ${response.statusCode}`);
        fs.unlink(dest, () => process.exit(1));
        return;
    }

    response.pipe(file);

    file.on('finish', function () {
        file.close();
        console.log("Download completed successfully.");
    });
}).on('error', function (err) {
    fs.unlink(dest, () => { });
    console.error("Error downloading file:", err.message);
    process.exit(1);
});
