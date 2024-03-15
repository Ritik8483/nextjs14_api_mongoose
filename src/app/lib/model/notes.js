import { Schema, model, models } from "mongoose";

const NotesTableSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", //model name
    },
  },
  { timestamps: true }
);

export const Note = models.Note || model("Note", NotesTableSchema);
