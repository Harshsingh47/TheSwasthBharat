/**
 * Uploads a base64 file string securely to Catbox.moe (Free anonymous CDN)
 * Supports images, documents, PDFs, etc.
 * @param {string} base64Data - The base64 file string (e.g. data:image/png;base64,...)
 * @returns {Promise<string>} - The permanent CDN URL
 */
exports.uploadFileToCDN = async (base64Data) => {
  if (!base64Data) return null;
  
  // If it's already a URL, return it directly
  if (base64Data.startsWith('http://') || base64Data.startsWith('https://')) {
    return base64Data;
  }

  try {
    // 1. Parse base64 string
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If it doesn't match base64 but is a custom string, return as-is
      return base64Data;
    }

    const mimeType = matches[1];
    const base64Buffer = Buffer.from(matches[2], 'base64');

    // Determine extension from mime type
    let extension = 'bin';
    if (mimeType.includes('png')) extension = 'png';
    else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = 'jpg';
    else if (mimeType.includes('gif')) extension = 'gif';
    else if (mimeType.includes('pdf')) extension = 'pdf';
    else if (mimeType.includes('svg')) extension = 'svg';

    const filename = `upload-${Date.now()}.${extension}`;

    // Create a Blob from the Buffer (supported natively in Node 18+)
    const blob = new Blob([base64Buffer], { type: mimeType });

    // 2. Build Native Multi-part Form (supported natively in Node 18+)
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', blob, filename);

    // 3. Post to Catbox API using native fetch
    console.log(`\n📤 Uploading base64 asset to permanent CDN (Catbox)... [${mimeType}]`);
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: form
    });

    if (!response.ok) {
      throw new Error(`CDN returned status ${response.status}`);
    }

    const fileUrl = (await response.text()).trim();
    if (!fileUrl.startsWith('https://')) {
      throw new Error(`Failed uploading to CDN: ${fileUrl}`);
    }

    console.log(`✅ Upload complete! URL: ${fileUrl}\n`);
    return fileUrl;
  } catch (error) {
    console.error("🔥 CDN Upload Error, falling back to local/original data:", error.message);
    // If it fails, fallback gracefully to the original data so it doesn't break updates
    return base64Data;
  }
};
