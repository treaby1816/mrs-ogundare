import Jimp from 'jimp';

async function removeBg() {
    try {
        const image = await Jimp.read('public/ondo-logo.jpg');
        console.log('Image loaded, scanning pixels...');

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            var red = this.bitmap.data[idx + 0];
            var green = this.bitmap.data[idx + 1];
            var blue = this.bitmap.data[idx + 2];

            // If the pixel is very light (white background)
            if (red > 240 && green > 240 && blue > 240) {
                // Set alpha to 0 (transparent)
                this.bitmap.data[idx + 3] = 0;
            }
        });

        await image.writeAsync('public/ondo-logo.png');
        console.log('Successfully saved to public/ondo-logo.png');
    } catch (err) {
        console.error('Failed to process image:', err.message);
    }
}

removeBg();
