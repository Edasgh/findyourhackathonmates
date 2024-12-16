import React from 'react'

import CustomAvatar from './CustomAvatar'
import SkillsCloud from './SkillsCloud'

const TeamMate = ({name,bio,skills,githubID,email,index}) => {
  return (
    <div
      key={index}
      className=" max-[800px]:h-[26rem] min-[800.1px]:h-[28rem] max-[800px]:w-[19rem] min-[800.1px]:w-[22rem] p-7 flex flex-col gap-4 justify-center items-center border-[1px] border-textSecondary rounded-2xl"
    >
      <SkillsCloud skilsArr={skills} />
    </div>
  );
}

export default TeamMate