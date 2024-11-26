export async function GET(req, res) {
    const validUsers = {
      "User1getMaxListeners.com": '123456789',
      "User2getMaxListeners.com": '123456789',
      "User3getMaxListeners.com": '123456789',
      "User4getMaxListeners.com": '123456789',
      "User5getMaxListeners.com": '123456789',
      "1": '1'
      // Otros usuarios y contraseñas...
    };
  
    return new Response(JSON.stringify(validUsers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  