const express = require('express');
const OTPAuth = require('otpauth');

const app = express();
const port = 3001;

// GET API to generate TOTP token
app.get('/api/generate_otp', (req, res) => {
 const{secret} = req.query;
  //Validate the required fields
  if (!secret) {
    return res.status(400).json({ error: 'Secret key is not valid' });
  }

  try {
    // Create a TOTP object
    const totp = new OTPAuth.TOTP({
      secret
    });

    // Generate the TOTP token
    const token = totp.generate();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate TOTP token' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`TOTP API server is running on http://localhost:${port}`);
});