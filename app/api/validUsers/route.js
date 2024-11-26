export async function GET(req, res) {
    const validUsers = {
      jhon1234: 'jhon1234',
      // Otros usuarios y contraseñas...
    };
  
    return new Response(JSON.stringify(validUsers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  