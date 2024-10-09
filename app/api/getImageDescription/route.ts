import { NextResponse } from 'next/server';
import vision from '@google-cloud/vision';

// Google Cloud Vision API için istemci oluştur
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'app/keys/river-nectar-423405-s2-2d287c2e3e83.json', // API anahtarını buraya eklemelisin
});


export async function POST(request: Request) {
    try {
        const { src } = await request.json();

        // Google Cloud Vision API'yi çağırarak görüntüyü analiz et
        const [result] = await client.annotateImage({
            image: { source: { imageUri: src } }, // Resim URL'si Google Vision API'ye gönderilir
            features: [{ type: 'LABEL_DETECTION' }],
        });

        const labels = result.labelAnnotations?.map((label) => label.description) || [];
        const description = labels.length
            ? `Bu resimde şunlar görünüyor: ${labels.join(', ')}.`
            : 'Resimden bir nesne algılanamadı.';

        return NextResponse.json({ description });
    } catch (error) {
        console.error('Hata:', error);
        return NextResponse.json({ description: 'Betimleme yapılırken bir hata oluştu.' });
    }
}
