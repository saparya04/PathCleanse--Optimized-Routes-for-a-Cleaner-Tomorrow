import axios from 'axios';
import Parent from '../models/Parent.js';  // Your Parent model

// Normalize the address to improve geocoding results
function normalizeAddress(rawAddress) {
  if (!rawAddress) return '';

  return rawAddress
    .replace(/\s*-\s*/g, ' ')                    // Remove hyphens like Mumbai-400080 → Mumbai 400080
    .replace(/[^a-zA-Z0-9, ]/g, '')              // Remove special characters except commas
    .replace(/\s{2,}/g, ' ')                     // Replace multiple spaces with single
    .replace(/,+/g, ',')                         // Collapse multiple commas
    .replace(/,\s*,/g, ',')                      // Remove empty segments
    .replace(/^,|,$/g, '')                       // Remove leading/trailing commas
    .trim();                                     // Final trim

}

export const getCoordinates = async (req, res) => {
  const studentId = req.params.id; // Using studentId from URL

  try {
    // Find the parent by studentId (not _id)
    const parent = await Parent.findOne({ studentId });

    if (!parent || !parent.address) {
      return res.status(404).json({ error: 'Parent or address not found' });
    }

    console.log("Fetched address:", parent.address);

    const cleanedAddress = normalizeAddress(parent.address);
    console.log("Cleaned address:",cleanedAddress);
    const encodedAddress = encodeURIComponent(cleanedAddress);
    console.log("Encoded address:", encodedAddress);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;
    console.log("Encoded geocode URL:", url);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'MyLocalApp/1.0 (clavenocoutinho2704@gmail.com)'
      }
    });

    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Address not found by geocoder' });
    }

    const { lat, lon } = response.data[0];

    return res.json({ lat: parseFloat(lat), lng: parseFloat(lon) });

  } catch (error) {
    console.error('Geocoding error:', error);
    return res.status(500).json({ error: 'Failed to geocode address' });
  }
};
