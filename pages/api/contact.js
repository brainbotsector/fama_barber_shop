export default function handler(req, res) {
  if (req.method === 'POST') {
    // For demo submission
    console.log('Form submission received:', req.body);
    setTimeout(() => {
      res.status(200).json({ message: 'Message received successfully!' });
    }, 1000);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}