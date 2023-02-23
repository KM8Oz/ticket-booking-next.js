import axios from 'axios';

// Check the status of a payment
export default async (req: { query: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  try {
    const { id } = req.query;
    const token = process.env.PAYPAL_TOKEN;

    const response = await axios.get(`https://paypalych.com/api/v1/bill/status?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking payment status' });
  }
};
