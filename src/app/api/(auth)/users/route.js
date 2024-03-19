import { connect } from "@/app/lib/db";
import User from "@/app/lib/model/user";
import { NextResponse } from "next/server";
//wrapping (auth) means we don't want it as structure of api url and the url remains same /api/users

// export async function GET(req, res) {
//   return NextResponse.json(
//     {
//       message: "Hello WOrld",
//     },
//     {
//       status: 500,
//     }
//   );
// }

export const GET = async (req, res) => {
  try {
    const resp = await connect();
    console.log("resp", resp);
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Error in fetching users : ", error, {
      status: 500,
    });
  }
};

export const POST = async (req, res) => {
  try {
    const body = await req.json();
    await connect();
    const users = new User(body);
    const finalResp = await users.save();
    return new NextResponse(
      JSON.stringify(
        { message: "User is Created", user: users },
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Error in fetching users : ", error, {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    console.log("params", params);  //IT WILL ONLY WORK IN [USER]
    const body = await req.json(); //we cann't send id in params in PATCH
    await connect();
    const resp = await User.findOneAndUpdate({ _id: body._id }, body);
    console.log("respon", resp);
    return new NextResponse(
      JSON.stringify(
        { message: "User is Updated", user: resp },
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Error in fetching users : ", error, {
      status: 500,
    });
  }
};

export const DELETE = async (req, res) => {
  try {
    console.log(req.query);
    const { searchParams } = new URL(req.url);
    console.log("searchParams", searchParams);
    const userId = searchParams.get("id");
    console.log("userId", userId);
    const resp = await User.findOneAndDelete({ _id: userId });
    console.log("resp", resp);
    return new NextResponse(
      JSON.stringify(
        { message: "User is DELETED SUCCESSFULLY", user: resp },
        {
          status: 201,
        }
      )
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Error in deleting user : ", error, {
      status: 500,
    });
  }
};