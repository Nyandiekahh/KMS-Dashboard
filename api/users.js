export default function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch user data (This is just sample data. You would usually fetch from a database)
    const users = [
      { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
    ];
    
    // Return the user data as a JSON response
    res.status(200).json(users);
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
