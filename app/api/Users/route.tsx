// ts-ignore;
import User from '@/app/(models)/Users';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface UserData {
  email: string;
  password: string;
  username: string;
}

export async function POST(req: any) {
  try {
    const userData: UserData = await req.json();

    //Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 401 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: 'Duplicate Email' }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: 'User Created.' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
