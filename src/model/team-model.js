import mongoose from "mongoose";

const teamModel = mongoose.Schema(
  {
    name: { type: String, minlength: 50, required: true },
    description: { type: String, minlength: 100, required: true },
    members: {
      type: Array,
      items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        min: 1,
        required: true,
      },
    },
    admins: {
      type: Array,
      items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        min: 1,
        required: true,
      },
    },
    skills: {
      type: Array,
      items: { type: String, min: 4, required: true },
    },
    messages: { type: Array, items: { type: String } },
    links: {
      type: Array,
      items: {
        name: { type: String, required: true },
        link: { type: String, required: true },
      },
      default: [{ name: "Github Link", link: "Add your project link" }],
    },
  },
  { timestamps: true }
);

const Team = mongoose.models.Team ?? mongoose.model("Team", teamModel);

export default Team;