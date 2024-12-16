"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import CustomAvatar from "./CustomAvatar";
import SkillsCloud from "./SkillsCloud";


export default function Team({
  name,
  desc,
  skills,
  members,
  githubLink,
  email,
  index,
}) {
  return (
    <div
      key={index}
      className="team-card max-[800px]:h-[26rem] min-[800.1px]:h-[28rem] w-[19rem] backdrop-blur-md m-auto"
    >
      <div className="team-card-inner py-7 px-4 flex flex-col gap-4 justify-center items-center border-[1px] border-textSecondary rounded-2xl">
        <div className="team-card-front flex flex-col gap-4 justify-center items-center">
          <CustomAvatar name={name} />
          <p className="text-textBgPrimaryHv font-semibold text-lg">{name}</p>
          <p className="text-textPrimary text-sm">{desc}</p>
          <p className="text-textPrimary text-center text-xs">
            <FontAwesomeIcon
              icon={faPeopleGroup}
              className={"text-textPrimary text-lg"}
            />
            &nbsp; Team Members : &nbsp;{members.length}
          </p>
          <SkillsCloud skilsArr={skills} />
        </div>
        <div className="team-card-back ">
          <div className="flex flex-col justify-center items-center gap-7 text-textPrimary">
            <Link
              href={`${githubLink}`}
              target="_blank"
              className="flex gap-2 justify-center items-center"
            >
              <button className=" px-1 py-2 w-[10rem] rounded-md dashing">
                <FontAwesomeIcon className="text-2xl" icon={faGithub} />
                &nbsp;&nbsp; Github
              </button>
            </Link>
            <Link
              href={`mailTo:${email}?subject=Hackathon%20Team%20Joining%20Request&body=Hello`}
              target="_blank"
              className="flex gap-2 justify-center items-center"
            >
              <button
                title="Request to Join"
                className="flex gap-2 justify-center items-center px-1 py-2 w-[10rem] rounded-md dashing"
              >
                <FontAwesomeIcon className="text-2xl" icon={faEnvelope} />
                &nbsp;&nbsp; Join Team
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
