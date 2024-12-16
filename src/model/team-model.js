import mongoose from "mongoose";

const teamModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, maxlength: 100, required: true },
    email: { type: String, required: true },
    members: {
      type: Array,
      items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      required: true,
    },
    admins: {
      type: Array,
      items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      required: true,
    },
    skills: {
      type: Array,
      items: { type: String },
      required: true,
    },
    messages: { type: Array, items: { type: String } },
    links: {
      type: Array,
      items: {
        name: { type: String, required: true },
        link: { type: String, required: true },
      },
    },
  },
  { timestamps: true }
);

const Team = mongoose.models.Team ?? mongoose.model("Team", teamModel);

export default Team;
