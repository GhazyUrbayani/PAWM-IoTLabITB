import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Get contact email from database
    const supabase = await createClient();
    const { data: pageContent, error: dbError } = await supabase
      .from('page_content')
      .select('value')
      .eq('key', 'contact_email')
      .single();

    if (dbError || !pageContent?.value) {
      console.error('Failed to fetch contact email:', dbError);
      return NextResponse.json(
        { error: 'Gagal mendapatkan email tujuan' },
        { status: 500 }
      );
    }

    const toEmail = pageContent.value;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'IoT Lab <noreply@iotlab.itb.ac.id>', // Change to verified domain
      to: [toEmail],
      replyTo: email,
      subject: `[Kontak Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Pesan Baru dari Form Kontak</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nama:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Subjek:</strong> ${subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Pesan:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">
            Email ini dikirim dari form kontak website IoT Lab.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Gagal mengirim email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email berhasil dikirim', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
