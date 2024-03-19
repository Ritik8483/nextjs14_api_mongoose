import { connect } from "@/app/lib/db";
import { Note } from "@/app/lib/model/notes";
import User from "@/app/lib/model/user";
// import notes from "@/app/lib/model/notes";
// import User from "@/app/lib/model/user";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const resp = await connect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const user = await User.findById(userId);
    console.log("user", user);
    if (!user) {
      return new NextResponse(
        JSON.stringify(
          { message: "User not found" },
          {
            status: 404,
          }
        )
      );
    }

    const notesResp = await Note.find({ user: userId });
    console.log("notesResp", notesResp);
    return new NextResponse(JSON.stringify(notesResp), {
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
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const body = await req.json();
    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(
        JSON.stringify(
          { message: "User not found" },
          {
            status: 404,
          }
        )
      );
    }
    const resp = new Note({ ...body, user: userId });
    const newNote = await resp.save();
    console.log("newNote", newNote);

    return new NextResponse(
      JSON.stringify(
        { message: "Note is Created successfully!", note: newNote },
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

export const PATCH = async (req, res) => {
  try {
    console.log("req", req);
    const body = await req.json(); //we cann't send id in params in PATCH
    await connect();
    const resp = await Note.findOneAndUpdate({ _id: body._id }, body);
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
    const resp = await Note.findOneAndDelete({ _id: userId });
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