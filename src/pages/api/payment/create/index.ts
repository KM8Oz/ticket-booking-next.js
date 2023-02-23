import axios from 'axios';

// Create a payment link
export default async (req: { body: { amount: any; description: any; order_id: any; type: any; custom: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
      const { amount, description, order_id, type, custom } = req.body;
      const token = process.env.PAYPAL_TOKEN;
      const shop_id = process.env.SHOP_ID;
  
      const response = await axios.post('https://paypalych.com/api/v1/bill/create', {
        amount,
        description,
        order_id,
        type,
        shop_id,
        custom,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating payment link' });
    }
  };
  