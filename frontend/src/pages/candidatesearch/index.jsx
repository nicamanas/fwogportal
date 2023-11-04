import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FilterCandidates from "../../components/FilterCandidates";
import { LJPSSkillsAPI } from "../../apis/ljpsSkillsAPI";
import { StaffProfileAPI } from "../../apis/staffProfileAPI";
import CandidateCard from "../../components/CandidateCard";

export default function CandidateSearch() {
    const [skillListings, setSkillListings] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [staff, setStaff] = useState([]); 
    const [filteredStaff, setFilteredStaff] = useState([]);
    const [staffSkills, setStaffSkills] = useState([]);

    useEffect(() => {
        LJPSSkillsAPI.getAll().then((skillListings) => {
          setSkillListings(skillListings);
        });
        StaffProfileAPI.getAll().then((allStaff) => {
          setStaff(allStaff)
          setFilteredStaff(allStaff);
        });
        LJPSSkillsAPI.getAllStaffSkills().then((staffSkills) => {
            setStaffSkills(staffSkills)
        });
    }, []);

    function filterBySkills(selectedSkills, staff, staffSkills) {
        for (const selectedSkill of selectedSkills) {
            staff = staff.filter((staffMember) => {
                return staffSkills.find((staffSkill) => {
                    return (staffSkill.skill_id == selectedSkill.skill_id && staffSkill.staff_id == staffMember.staff_id)
                })
            })
        }
        return staff
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedSkills.length == 0) {
          setFilteredStaff(staff);
          return;
        }

        // filter out the staff that possess the selected skills
        setFilteredStaff(filterBySkills(selectedSkills, staff, staffSkills));
      };
    
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
            <Box sx={{ maxWidth: '1200px', width: '100%' }}>    
                <FilterCandidates 
                skillListings={skillListings}
                setSelectedSkills={setSelectedSkills}
                handleSubmit={handleSubmit}
                staff={staff}
                setFilteredStaff={setFilteredStaff}
                />
            </Box>
            <Box sx={{ maxWidth: '1800px', width: '100%' }}>
                <Grid container spacing={6} justifyContent="center">
                {filteredStaff.length > 0 &&
                    filteredStaff.map((candidate, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                        <CandidateCard candidate={candidate} selectedSkills={selectedSkills} skillListings={skillListings} staffSkills={staffSkills}/>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}