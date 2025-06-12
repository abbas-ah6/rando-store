import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

type Product = {
    id: number;
    name: string;
    quantity: number;
    price: string;
};

type RequestBody = {
    fullName: string;
    email: string;
    address: string;
    phone: string;
    cart: Product[];
    totalPrice: number;
};

const adminEmail = process.env.ADMIN_EMAIL;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

function generateOrderDetailsHTML(cart: Product[], totalPrice: number) {
    const rows = cart
        .map(
            (item) =>
                `<tr>
          <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${(Number(item.price) * item.quantity).toFixed(2)}</td>
        </tr>`
        )
        .join('');

    return `
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Product</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:center;">Quantity</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr>
          <td colspan="2" style="padding:8px;border:1px solid #ddd; text-align:right; font-weight:bold;">Total</td>
          <td style="padding:8px;border:1px solid #ddd; text-align:right; font-weight:bold;">$${totalPrice.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  `;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("BODY: ", body);

        const { fullName, email, address, phone, cart, totalPrice }: RequestBody = body;

        if (!fullName || !email || !address || !phone || !cart || !cart.length) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const orderDetailsHTML = generateOrderDetailsHTML(cart, totalPrice);

        const userMailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Order Confirmation',
            html: `
                <p>Hi ${fullName},</p>
                <p>Thank you for your order! Here are your order details:</p>
                ${orderDetailsHTML}
                <p>Shipping Address: ${address}</p>
                <p>Phone: ${phone}</p>
                <p>We will notify you when your order is shipped.</p>
                <p>Best regards,<br/>RandoStore</p>
            `,
        };

        const adminMailOptions = {
            from: process.env.GMAIL_USER,
            to: adminEmail,
            subject: `New Order from ${fullName}`,
            html: `
                <p>You have received a new order:</p>
                <p><strong>Customer Info:</strong></p>
                <ul>
                    <li>Name: ${fullName}</li>
                    <li>Email: ${email}</li>
                    <li>Address: ${address}</li>
                    <li>Phone: ${phone}</li>
                </ul>
                <p><strong>Order Details:</strong></p>
                ${orderDetailsHTML}
            `,
        };

        await Promise.all([
            transporter.sendMail(userMailOptions),
            transporter.sendMail(adminMailOptions),
        ]);

        return NextResponse.json({ message: 'Order placed and emails sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
