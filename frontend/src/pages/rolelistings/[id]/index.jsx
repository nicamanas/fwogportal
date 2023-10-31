import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoleListingAPI } from "../../../apis/rolelistingAPI";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import IndividualRoleListing from "../../../components/IndividualRoleListing";
import { UserStorage } from "../../../utils/userLocalStorageUtils";
import { LJPSSkillsAPI } from "../../../apis/ljpsSkillsAPI";
import { RoleApplicationAPI } from "../../../apis/roleapplicationAPI";
import ApplicantsTable from "../../../components/ApplicantsTable";

export default function RoleListing() {
  const { id } = useParams("/rolelistings/:id");
  const [roleListing, setRoleListing] = useState(null);
  const [userSkills, setUserSkills] = useState(null);
  const [skills, setSkills] = useState(null);
  const [roleListingApplications, setRoleListingApplications] = useState(null);
  const user = UserStorage.getUser();

  useEffect(() => {
    RoleListingAPI.get(id).then((rolelisting) => {
      console.log("Fetched role listing:", rolelisting);
      setRoleListing(rolelisting);
    });
    LJPSSkillsAPI.getUserSkills(user.id).then((skills) => {
      console.log("Fetched user skills:", skills);
      const skillNames = skills.map((skill) => skill.skill_name);
      setUserSkills(skillNames);
    });
    RoleApplicationAPI.getByRoleListingId(id).then((roleapplications) => {
      console.log("Fetched role applications:", roleapplications);
      setRoleListingApplications(roleapplications);
    });
    LJPSSkillsAPI.getAll().then((skills) => {
      setSkills(skills);
      console.log("Fetched skills:", skills);
    });
  }, []);

  return (
    <Box>
      {roleListing === null ||
      userSkills === null ||
      roleListingApplications === null ||
      skills === null ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <>
          <IndividualRoleListing
            roleListing={roleListing}
            userSkills={userSkills}
            user={user}
          />
          {user !== null && user.sys_role !== "staff" ? (
            <ApplicantsTable
              roleListing={roleListing}
              roleListingApplications={roleListingApplications}
              skills={skills}
            />
          ) : null}
        </>
      )}
    </Box>
  );
}
