import { connect } from "@/app/lib/db";
import { Note } from "@/app/lib/model/notes";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  //it does not takes a query parms it takes dynamic url
  try {
    const params = context.params.note;
    const resp = await connect();
    const notesResp = await Note.findById(params);
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